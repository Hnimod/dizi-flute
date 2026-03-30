import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotationPreferenceState {
  showStaff: boolean;
  toggleStaff: () => void;
}

export const useNotationPreference = create<NotationPreferenceState>()(
  persist(
    (set) => ({
      showStaff: false,
      toggleStaff: () => set((s) => ({ showStaff: !s.showStaff })),
    }),
    { name: "notation-preference" },
  ),
);
