import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TongyinPreferenceState {
  /** User's preferred tongyin (筒音作 X). The scale degree the all-holes-covered note represents. */
  tongyin: number;
  setTongyin: (n: number) => void;
}

export const useTongyinPreference = create<TongyinPreferenceState>()(
  persist(
    (set) => ({
      tongyin: 5,
      setTongyin: (n) => set({ tongyin: n }),
    }),
    { name: "tongyin-preference" },
  ),
);

export const TONGYIN_OPTIONS: { value: number; label: string }[] = [
  { value: 2, label: "2 Re" },
  { value: 5, label: "5 Sol" },
  { value: 6, label: "6 La" },
];
