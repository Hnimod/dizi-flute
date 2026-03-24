import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginAdmin,
  identify as identifyApi,
  checkAuth as checkAuthApi,
  fetchProgress,
  fetchSessions,
  fetchUserSongs,
  fetchVideoLinks,
} from "@/data/api";
import { useProgressStore } from "@/features/progress-tracking";
import { usePracticeStore } from "@/features/practice-timer";
import { useSongLibraryStore } from "@/features/song-library";
import { useVideoLinksStore } from "@/features/lesson-viewer";

interface AuthState {
  token: string | null;
  email: string | null;
  role: "admin" | "user" | null;
  dismissed: boolean; // User dismissed the identify prompt
  isAdmin: boolean;
  isAuthenticated: boolean;
  identify: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  dismiss: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      role: null,
      dismissed: false,
      isAdmin: false,
      isAuthenticated: false,

      identify: async (email: string) => {
        const result = await identifyApi(email);
        set({
          token: result.token,
          email: result.email,
          role: "user",
          isAdmin: false,
          isAuthenticated: true,
          dismissed: false,
        });
        // Sync data from server after identifying
        await syncFromServer();
      },

      login: async (email: string, password: string) => {
        const result = await loginAdmin(email, password);
        set({
          token: result.token,
          email: email.toLowerCase(),
          role: "admin",
          isAdmin: true,
          isAuthenticated: true,
          dismissed: false,
        });
        await syncFromServer();
      },

      logout: () => {
        set({
          token: null,
          email: null,
          role: null,
          isAdmin: false,
          isAuthenticated: false,
          dismissed: false,
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;
        const result = await checkAuthApi();
        if (result) {
          set({
            email: result.email,
            role: result.role,
            isAdmin: result.role === "admin",
            isAuthenticated: true,
          });
        } else {
          // Token expired
          set({
            token: null,
            email: null,
            role: null,
            isAdmin: false,
            isAuthenticated: false,
          });
        }
      },

      dismiss: () => set({ dismissed: true }),
    }),
    {
      name: "dizi-auth",
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        role: state.role,
        dismissed: state.dismissed,
        isAdmin: state.isAdmin,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

/** Pull user data from server and merge into local stores */
async function syncFromServer() {
  try {
    // Sync progress
    const progress = await fetchProgress();
    if (progress) {
      const store = useProgressStore.getState();
      // Merge: server wins on conflicts
      const merged = { ...store.completedItems, ...progress.completedItems };
      useProgressStore.setState({
        completedItems: merged,
        currentLevel: progress.currentLevel,
        lastVisited: progress.lastVisited,
      });
    }

    // Sync practice sessions
    const sessions = await fetchSessions();
    if (sessions.length > 0) {
      const store = usePracticeStore.getState();
      const existingIds = new Set(store.sessions.map((s) => s.id));
      const newSessions = sessions.filter((s) => !existingIds.has(s.id));
      if (newSessions.length > 0) {
        usePracticeStore.setState({
          sessions: [...store.sessions, ...newSessions],
        });
      }
    }

    // Sync user songs
    const userSongs = await fetchUserSongs();
    if (userSongs.length > 0) {
      const store = useSongLibraryStore.getState();
      const existingIds = new Set(store.userSongs.map((s) => s.id));
      const newSongs = userSongs.filter((s) => !existingIds.has(s.id));
      if (newSongs.length > 0) {
        useSongLibraryStore.setState({
          userSongs: [...store.userSongs, ...newSongs],
        });
      }
    }

    // Sync video links
    const videoLinks = await fetchVideoLinks();
    if (Object.keys(videoLinks).length > 0) {
      const store = useVideoLinksStore.getState();
      // Merge: server wins
      useVideoLinksStore.setState({
        videoLinks: { ...store.videoLinks, ...videoLinks },
      });
    }
  } catch {
    // Silently fail — local data is still available
  }
}
