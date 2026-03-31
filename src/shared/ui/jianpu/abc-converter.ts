import type { Token } from "./types";
import { parseToken, normalizeBeamDurations } from "./parser";
import { buildScaleInfo, KEY_TO_NORM, CHROMATIC } from "./scale-utils";

/**
 * Maps jianpu key strings to ABC key notation.
 */
const KEY_TO_ABC: Record<string, string> = {
  C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B",
  "bD": "Db", "bE": "Eb", "bB": "Bb", "bA": "Ab", "bG": "Gb",
  "#C": "C#", "#F": "F#",
};

/**
 * Build scale map for ABC conversion (noteName + semitones).
 * Uses shared buildScaleInfo and adds semitones field.
 */
function buildScaleMap(key: string): { noteName: string; semitones: number }[] {
  const scaleInfo = buildScaleInfo(key);
  const normKey = KEY_TO_NORM[key] || key;
  let baseNote = normKey.replace(/[#b]/, "");
  let baseSemitone = CHROMATIC.indexOf(baseNote);
  if (normKey.includes("#")) baseSemitone = (baseSemitone + 1) % 12;
  if (normKey.includes("b")) baseSemitone = (baseSemitone + 11) % 12;

  const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
  return MAJOR_INTERVALS.map((interval, i) => ({
    noteName: scaleInfo[i]!.noteName,
    semitones: (baseSemitone + interval) % 12,
  }));
}

/**
 * Convert a note letter + octave to ABC notation.
 * ABC convention: C = C4, c = C5, c' = C6, C, = C3
 * The `abcAccidental` param is an explicit ABC accidental prefix (e.g., "^", "_", "=")
 * that should only be set for jianpu # or b markings — scale degree sharps/flats
 * are handled by the ABC key signature automatically.
 */
function noteToAbc(letter: string, octave: number, abcAccidental = ""): string {
  // octave 0 in jianpu (no dots) = octave 4 for dizi (middle register)
  // For dizi 筒音作5: the unmarked 5 is typically A4, so 1 (D) is D4
  const absOctave = 4 + octave;

  if (absOctave >= 5) {
    const ticks = "'".repeat(absOctave - 5);
    return `${abcAccidental}${letter.toLowerCase()}${ticks}`;
  } else {
    const commas = ",".repeat(4 - absOctave);
    return `${abcAccidental}${letter}${commas}`;
  }
}

/**
 * Get ABC duration suffix for a token duration.
 * With L:1/4 (quarter note as unit):
 * - quarter = "" (default)
 * - eighth = "/2"
 * - sixteenth = "/4"
 * - dotted quarter = "3/2"
 */
function durationSuffix(
  duration?: "eighth" | "sixteenth",
  dotted?: boolean,
  holdCount?: number,
): string {
  let base = 1;
  if (duration === "eighth") base = 0.5;
  if (duration === "sixteenth") base = 0.25;

  if (holdCount && holdCount > 0) {
    base += holdCount; // each hold adds 1 quarter note
  }

  if (dotted) {
    base *= 1.5;
  }

  // Convert to ABC fraction
  if (base === 1) return "";
  if (base === 0.5) return "/2";
  if (base === 0.25) return "/4";
  if (base === 0.75) return "3/4";
  if (base === 1.5) return "3/2";
  if (base === 2) return "2";
  if (base === 3) return "3";
  if (base === 4) return "4";
  if (base === 0.375) return "3/8";

  // General case
  // Multiply by 4 to get sixteenths, express as fraction of quarter
  const sixteenths = Math.round(base * 4);
  if (sixteenths % 4 === 0) return `${sixteenths / 4}`;
  if (sixteenths % 2 === 0) return `${sixteenths / 2}/2`;
  return `${sixteenths}/4`;
}

/**
 * Extract the main note digit and grace notes from a note value string.
 * Handles: "3", "(2)3", "(2)(3)4"
 */
function parseNoteValue(value: string): { mainDigit: string; graces: string[] } {
  const graceMatch = value.match(/^\(([1-7][',]*)\)(?:\(([1-7][',]*)\))?([1-7])/);
  if (graceMatch) {
    const graces = [graceMatch[1]!];
    if (graceMatch[2]) graces.push(graceMatch[2]);
    return { mainDigit: graceMatch[3]!, graces };
  }
  // Simple note - just the digit
  return { mainDigit: value[0] || value, graces: [] };
}

/**
 * Parse a grace note string like "2" or "2'" into digit and octave offset.
 */
function parseGraceOctave(grace: string): { digit: string; octave: number } {
  const digit = grace[0]!;
  let octave = 0;
  for (let i = 1; i < grace.length; i++) {
    if (grace[i] === "'") octave++;
    if (grace[i] === ",") octave--;
  }
  return { digit, octave };
}

interface ConvertOptions {
  key: string;
  timeSignature: string;
  tempo?: number;
}

/**
 * Convert a single line of jianpu tokens to ABC notation fragment (no header).
 */
function convertTokensToAbcLine(
  tokens: Token[],
  scaleMap: ReturnType<typeof buildScaleMap>,
): string {
  const parts: string[] = [];

  // First pass: merge holds into preceding notes
  const merged: { token: Token; holdCount: number }[] = [];
  for (const token of tokens) {
    if (
      token.type === "hold" &&
      merged.length > 0 &&
      merged[merged.length - 1]!.token.type === "note"
    ) {
      merged[merged.length - 1]!.holdCount++;
    } else {
      merged.push({ token, holdCount: 0 });
    }
  }

  for (const { token, holdCount } of merged) {
    switch (token.type) {
      case "note": {
        const { mainDigit, graces } = parseNoteValue(token.value);
        const degreeIdx = parseInt(mainDigit) - 1;
        if (degreeIdx < 0 || degreeIdx > 6) break;

        const scale = scaleMap[degreeIdx]!;
        // Scale degree note letter (without accidental — key sig handles it)
        const baseLetter = scale.noteName[0]!;

        // Only add explicit ABC accidental for jianpu # or b markings
        let abcAccidental = "";
        if (token.accidental === "#") {
          // Raise by a semitone — use ^ (sharp) in ABC
          const raised = (scale.semitones + 1) % 12;
          const raisedName = CHROMATIC[raised]!;
          // If raising produces a note already in the scale, use natural
          // Otherwise use sharp
          abcAccidental = raisedName.includes("#") ? "^" : "^";
        } else if (token.accidental === "b") {
          abcAccidental = "_";
        }

        const abcNote = noteToAbc(baseLetter, token.octave, abcAccidental);
        const dur = durationSuffix(token.duration, token.dotted, holdCount);

        // Grace notes
        if (graces.length > 0) {
          const graceNotes = graces
            .map((g) => {
              const { digit, octave } = parseGraceOctave(g);
              const gIdx = parseInt(digit) - 1;
              if (gIdx < 0 || gIdx > 6) return "";
              return noteToAbc(scaleMap[gIdx]!.noteName[0]!, octave);
            })
            .join("");
          parts.push(`{${graceNotes}}`);
        }

        let noteStr = `${abcNote}${dur}`;
        // Staccato
        if (token.staccato) noteStr = `.${noteStr}`;
        // Accent
        if (token.accent) noteStr = `!accent!${noteStr}`;
        // Fermata
        if (token.fermata) noteStr = `!fermata!${noteStr}`;
        // Trill
        if (token.trill) noteStr = `!trill!${noteStr}`;

        parts.push(noteStr);
        break;
      }

      case "rest": {
        const dur = durationSuffix(token.duration, false, holdCount);
        parts.push(`z${dur}`);
        break;
      }

      case "hold": {
        // Standalone hold not merged (e.g., at start of line or after barline)
        // Treat as rest
        parts.push("z");
        break;
      }

      case "bar":
        parts.push(token.value);
        break;

      case "tie":
      case "tie-start":
        // Mark that the next note should be tied
        if (parts.length > 0) {
          parts[parts.length - 1] += "-";
        }
        break;

      case "tie-end":
        // Nothing to do — the tie was started on the previous note
        break;

      case "slur-start":
        parts.push("(");
        break;

      case "slur-end":
        parts.push(")");
        break;

      case "breath":
        // Breath mark in ABC: use a comma or just skip
        break;

      case "beam-start":
      case "beam-end":
        // ABC handles beaming automatically
        break;

      case "tonguing":
      case "ornament":
      case "tempo":
      case "volta":
      case "text":
        // Skip dizi-specific annotations in staff notation
        break;
    }
  }

  return parts.join(" ");
}

/**
 * Convert full jianpu content string to ABC notation.
 * Returns one ABC string per jianpu line (for line-matched rendering).
 */
export function jianpuToAbcLines(
  content: string,
  options: ConvertOptions,
): string[] {
  const { key } = options;
  const scaleMap = buildScaleMap(key);

  const lines = content.split("\n");
  return lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed === "") return "";

    const rawTokens = normalizeBeamDurations(trimmed.split(/\s+/).map(parseToken));
    return convertTokensToAbcLine(rawTokens, scaleMap);
  });
}

/**
 * Convert full jianpu content to a complete ABC string (all lines).
 * Used when rendering the full score at once.
 */
export function jianpuToAbc(content: string, options: ConvertOptions): string {
  const { key, timeSignature, tempo } = options;
  const abcKey = KEY_TO_ABC[key] || key;
  const scaleMap = buildScaleMap(key);

  const abcLines = content.split("\n").map((line) => {
    const trimmed = line.trim();
    if (trimmed === "") return "";
    const rawTokens = normalizeBeamDurations(trimmed.split(/\s+/).map(parseToken));
    return convertTokensToAbcLine(rawTokens, scaleMap);
  });

  const header = [
    "X:1",
    `M:${timeSignature}`,
    "L:1/4",
    `K:${abcKey}`,
  ];

  if (tempo) {
    header.push(`Q:1/4=${tempo}`);
  }

  return [...header, abcLines.filter(Boolean).join("\n")].join("\n");
}

/**
 * Parse a manual ABC string into per-line ABC fragments.
 * Splits on newlines, skipping header lines (X:, M:, L:, K:, Q:).
 */
export function splitAbcIntoLines(abc: string): { header: string; lines: string[] } {
  const allLines = abc.split("\n");
  const headerLines: string[] = [];
  const bodyLines: string[] = [];

  for (const line of allLines) {
    if (/^[A-Z]:.+/.test(line.trim()) && bodyLines.length === 0) {
      headerLines.push(line);
    } else {
      bodyLines.push(line);
    }
  }

  return {
    header: headerLines.join("\n"),
    lines: bodyLines,
  };
}
