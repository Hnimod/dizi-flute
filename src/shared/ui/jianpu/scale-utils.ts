/**
 * Shared scale/pitch mapping utilities for jianpu-to-staff conversion.
 * Implements the standard movable-do system used in Chinese numbered notation.
 *
 * Key rules (from the official mapping):
 * - "1=X" sets the tonic. Digits 1-7 = diatonic scale degrees (Do-Ti).
 * - Major scale intervals: [0, 2, 4, 5, 7, 9, 11] semitones from tonic.
 * - Octave: no dots = octave 4, each dot above = +1, below = -1.
 * - Accidentals (#/b) are relative to scale degree, not absolute pitch.
 */

export const NOTE_ORDER = ["C", "D", "E", "F", "G", "A", "B"];
export const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
export const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const ENHARMONIC_FLAT: Record<string, string> = {
  "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb",
};

/** Maps app key format (e.g., "bE") to normalized key name (e.g., "Eb") */
export const KEY_TO_NORM: Record<string, string> = {
  C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B",
  "bD": "Db", "bE": "Eb", "bB": "Bb", "bA": "Ab", "bG": "Gb",
  "#C": "C#", "#F": "F#",
};

export interface ScaleEntry {
  /** Full note name including accidental, e.g., "F#", "Bb", "C" */
  noteName: string;
  /** Letter only, e.g., "F", "B", "C" */
  letter: string;
  /** Diatonic index: C=0, D=1, E=2, F=3, G=4, A=5, B=6 */
  diatonicBase: number;
}

/**
 * Build scale info for a given key.
 * Maps jianpu digits 1-7 to their note names and diatonic positions.
 *
 * @example
 * buildScaleInfo("D") → [
 *   { noteName: "D", letter: "D", diatonicBase: 1 },  // 1 = D
 *   { noteName: "E", letter: "E", diatonicBase: 2 },  // 2 = E
 *   { noteName: "F#", letter: "F", diatonicBase: 3 }, // 3 = F#
 *   { noteName: "G", letter: "G", diatonicBase: 4 },  // 4 = G
 *   { noteName: "A", letter: "A", diatonicBase: 5 },  // 5 = A
 *   { noteName: "B", letter: "B", diatonicBase: 6 },  // 6 = B
 *   { noteName: "C#", letter: "C", diatonicBase: 0 }, // 7 = C#
 * ]
 */
export function buildScaleInfo(key: string): ScaleEntry[] {
  const normKey = KEY_TO_NORM[key] || key;
  let baseNote = normKey.replace(/[#b]/, "");
  let baseSemitone = CHROMATIC.indexOf(baseNote);
  if (normKey.includes("#")) baseSemitone = (baseSemitone + 1) % 12;
  if (normKey.includes("b")) baseSemitone = (baseSemitone + 11) % 12;
  const useFlats = normKey.includes("b") || ["F", "Bb", "Eb", "Ab", "Db", "Gb"].includes(normKey);

  return MAJOR_INTERVALS.map((interval) => {
    const semitones = (baseSemitone + interval) % 12;
    let noteName = CHROMATIC[semitones]!;
    if (useFlats && ENHARMONIC_FLAT[noteName]) {
      noteName = ENHARMONIC_FLAT[noteName]!;
    }
    const letter = noteName[0]!;
    const diatonicBase = NOTE_ORDER.indexOf(letter);
    return { noteName, letter, diatonicBase };
  });
}
