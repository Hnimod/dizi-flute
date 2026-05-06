import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tongyin } from "@/shared/types";
import { TONGYIN_TO_DIGIT } from "@/shared/types";

interface TongyinPreferenceState {
  /** User's preferred tongyin (筒音作 X). The scale degree the all-holes-covered note represents. */
  tongyin: Tongyin;
  setTongyin: (t: Tongyin) => void;
}

const DIGIT_TO_TONGYIN: Record<number, Tongyin> = Object.fromEntries(
  Object.entries(TONGYIN_TO_DIGIT).map(([name, digit]) => [digit, name as Tongyin]),
);

const VALID: Set<Tongyin> = new Set(Object.keys(TONGYIN_TO_DIGIT) as Tongyin[]);

function coerce(raw: unknown): Tongyin {
  if (typeof raw === "string" && VALID.has(raw as Tongyin)) return raw as Tongyin;
  if (typeof raw === "number" && DIGIT_TO_TONGYIN[raw]) return DIGIT_TO_TONGYIN[raw]!;
  return "Sol";
}

export const useTongyinPreference = create<TongyinPreferenceState>()(
  persist(
    (set) => ({
      tongyin: "Sol",
      setTongyin: (t) => set({ tongyin: coerce(t) }),
    }),
    {
      name: "tongyin-preference",
      version: 2,
      migrate: (persisted) => ({
        tongyin: coerce((persisted as { tongyin?: unknown })?.tongyin),
      }),
      merge: (persisted, current) => ({
        ...current,
        tongyin: coerce((persisted as { tongyin?: unknown })?.tongyin),
      }),
    },
  ),
);

export const TONGYIN_OPTIONS: { value: Tongyin; label: string }[] = [
  { value: "Re", label: "2 Re" },
  { value: "Sol", label: "5 Sol" },
  { value: "La", label: "6 La" },
];
