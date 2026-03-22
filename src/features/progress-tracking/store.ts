import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
  toggleItem: (id: string) => void;
  setCurrentLevel: (level: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
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
    }),
    { name: "dizi-progress" },
  ),
);

export function selectIsCompleted(id: string) {
  return (s: ProgressState) => !!s.completedItems[id];
}

export function selectCompletedCount(levelId: number) {
  return (s: ProgressState) =>
    Object.entries(s.completedItems).filter(
      ([key, done]) => done && key.startsWith(`level-${levelId}-`),
    ).length;
}
