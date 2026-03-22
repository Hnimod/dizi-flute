import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
  toggleItem: (id: string) => void;
  setCurrentLevel: (level: number) => void;
  getCompletedCount: (levelId: number) => number;
  isCompleted: (id: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedItems: {},
      currentLevel: 1,
      lastVisited: new Date().toISOString(),
      toggleItem: (id: string) =>
        set((state) => ({
          completedItems: {
            ...state.completedItems,
            [id]: !state.completedItems[id],
          },
          lastVisited: new Date().toISOString(),
        })),
      setCurrentLevel: (level: number) => set({ currentLevel: level }),
      getCompletedCount: (levelId: number) => {
        const { completedItems } = get();
        return Object.entries(completedItems).filter(
          ([key, completed]) => completed && key.startsWith(`level-${levelId}-`),
        ).length;
      },
      isCompleted: (id: string) => !!get().completedItems[id],
    }),
    { name: "dizi-progress" },
  ),
);
