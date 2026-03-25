import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Song } from "@/shared/types";

interface UserSongInput {
  titleEnglish: string;
  titleChinese?: string;
  titleVietnamese?: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  origin?: string;
}

interface SongLibraryState {
  userSongs: Song[];
  addSong: (input: UserSongInput) => void;
  updateSong: (id: string, updates: Partial<UserSongInput>) => void;
  removeSong: (id: string) => void;
}

export const useSongLibraryStore = create<SongLibraryState>()(
  persist(
    (set) => ({
      userSongs: [],
      addSong: (input) =>
        set((state) => ({
          userSongs: [
            ...state.userSongs,
            {
              ...input,
              id: `user-song-${Date.now()}`,
              type: "song" as const,
              levelId: 0,
            },
          ],
        })),
      updateSong: (id, updates) =>
        set((state) => ({
          userSongs: state.userSongs.map((s) =>
            s.id === id ? { ...s, ...updates } : s,
          ),
        })),
      removeSong: (id) =>
        set((state) => ({
          userSongs: state.userSongs.filter((s) => s.id !== id),
        })),
    }),
    {
      name: "dizi-user-songs",
    },
  ),
);
