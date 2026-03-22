import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PracticeSession {
  id: string;
  date: string;
  duration: number;
  notes: string;
}

interface PracticeTimerState {
  isRunning: boolean;
  elapsed: number;
  sessions: PracticeSession[];
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  saveSession: (notes: string) => void;
  getSessions: () => PracticeSession[];
}

export const usePracticeStore = create<PracticeTimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      elapsed: 0,
      sessions: [],
      start: () => set({ isRunning: true }),
      pause: () => set({ isRunning: false }),
      reset: () => set({ isRunning: false, elapsed: 0 }),
      tick: () => set((state) => ({ elapsed: state.elapsed + 1 })),
      saveSession: (notes: string) => {
        const { elapsed, sessions } = get();
        if (elapsed === 0) return;
        const session: PracticeSession = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          duration: elapsed,
          notes,
        };
        set({
          sessions: [...sessions, session],
          isRunning: false,
          elapsed: 0,
        });
      },
      getSessions: () => get().sessions,
    }),
    {
      name: "dizi-practice",
      partialize: (state) => ({
        sessions: state.sessions,
      }),
    },
  ),
);
