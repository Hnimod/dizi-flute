import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedItems: Record<string, boolean>;
  favoritedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
  toggleItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setCurrentLevel: (level: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
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
      },

      toggleFavorite: (id: string) => {
        const newValue = !get().favoritedItems[id];
        set((state) => ({
          favoritedItems: {
            ...state.favoritedItems,
            [id]: newValue,
          },
        }));
      },

      setCurrentLevel: (level: number) => {
        set({ currentLevel: level });
      },
    }),
    {
      name: "dizi-progress",
    },
  ),
);

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
