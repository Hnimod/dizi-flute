import { create } from "zustand";
import { fetchProgress, syncProgress } from "@/data/api";
import { useAuthStore } from "@/features/auth";

interface ProgressState {
  completedItems: Record<string, boolean>;
  favoritedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
  toggleItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setCurrentLevel: (level: number) => void;
  loadFromApi: () => Promise<void>;
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  completedItems: {},
  favoritedItems: {},
  currentLevel: 1,
  lastVisited: new Date().toISOString(),

  toggleItem: (id: string) => {
    const newValue = !get().completedItems[id];
    set((state) => ({
      completedItems: {
        ...state.completedItems,
        [id]: newValue,
      },
      lastVisited: new Date().toISOString(),
    }));
    if (useAuthStore.getState().isAuthenticated) {
      syncProgress({ completedItems: { [id]: newValue } });
    }
  },

  toggleFavorite: (id: string) => {
    const newValue = !get().favoritedItems[id];
    set((state) => ({
      favoritedItems: {
        ...state.favoritedItems,
        [id]: newValue,
      },
    }));
    if (useAuthStore.getState().isAuthenticated) {
      syncProgress({ favoritedItems: { [id]: newValue } });
    }
  },

  setCurrentLevel: (level: number) => {
    set({ currentLevel: level });
    if (useAuthStore.getState().isAuthenticated) {
      syncProgress({ currentLevel: level });
    }
  },

  loadFromApi: async () => {
    const progress = await fetchProgress();
    if (progress) {
      set({
        completedItems: progress.completedItems,
        favoritedItems: progress.favoritedItems ?? {},
        currentLevel: progress.currentLevel,
        lastVisited: progress.lastVisited,
      });
    }
  },
}));

export function selectIsCompleted(id: string) {
  return (s: ProgressState) => !!s.completedItems[id];
}

export function selectIsFavorited(id: string) {
  return (s: ProgressState) => !!s.favoritedItems[id];
}

export function selectCompletedCount(itemIds: string[]) {
  return (s: ProgressState) =>
    itemIds.filter((id) => s.completedItems[id]).length;
}
