import { CHROMATIC, ENHARMONIC_FLAT, KEY_TO_NORM, MAJOR_INTERVALS } from "./scale-utils";

const NOTE_RE = /^(tr)?(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>T])?$/;
const GRACE_RE = /^(tr)?\(([1-7][',]*)\)(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>T])?$/;
const DOUBLE_GRACE_RE = /^(tr)?\(([1-7][',]*)\)\(([1-7][',]*)\)(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>T])?$/;

const NORM_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(KEY_TO_NORM).map(([k, v]) => [v, k]),
);

function modPositive(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function shiftPosition(digit: number, octave: number, shift: number): { digit: number; octave: number } {
  const pos = digit + 7 * octave + shift;
  return {
    digit: modPositive(pos - 1, 7) + 1,
    octave: Math.floor((pos - 1) / 7),
  };
}

function octaveMarkers(octave: number): string {
  if (octave > 0) return "'".repeat(octave);
  if (octave < 0) return ",".repeat(-octave);
  return "";
}

function shiftDigitWithMarkers(s: string, shift: number): string {
  const digit = parseInt(s[0]!, 10);
  let octave = 0;
  for (const c of s.slice(1)) {
    if (c === "'") octave++;
    else if (c === ",") octave--;
  }
  const r = shiftPosition(digit, octave, shift);
  return `${r.digit}${octaveMarkers(r.octave)}`;
}

function shiftToken(raw: string, shift: number): string {
  const m = raw.match(NOTE_RE);
  if (m) {
    const [, tr = "", acc = "", digit, octaves = "", dots = "", under = "", art = ""] = m;
    return `${tr}${acc}${shiftDigitWithMarkers(digit + octaves, shift)}${dots}${under}${art}`;
  }
  const dg = raw.match(DOUBLE_GRACE_RE);
  if (dg) {
    const [, tr = "", g1, g2, acc = "", digit, octaves = "", dots = "", under = "", art = ""] = dg;
    return `${tr}(${shiftDigitWithMarkers(g1!, shift)})(${shiftDigitWithMarkers(g2!, shift)})${acc}${shiftDigitWithMarkers(digit + octaves, shift)}${dots}${under}${art}`;
  }
  const g = raw.match(GRACE_RE);
  if (g) {
    const [, tr = "", grace, acc = "", digit, octaves = "", dots = "", under = "", art = ""] = g;
    return `${tr}(${shiftDigitWithMarkers(grace!, shift)})${acc}${shiftDigitWithMarkers(digit + octaves, shift)}${dots}${under}${art}`;
  }
  return raw;
}

/**
 * Transpose all jianpu digits by `shift` scale degrees (with octave wrapping).
 * Used to relabel a song from one tongyin (筒音作 X) convention to another while
 * keeping the same physical fingerings on the dizi. Pitches change in lockstep —
 * same fingerings produce a different sounding key when relabeled.
 *
 * Non-note tokens (bars, ties, slurs, voltas, ornaments, cue markers) pass through unchanged.
 */
export function transposeJianpu(content: string, shift: number): string {
  if (shift === 0) return content;
  return content
    .split("\n")
    .map((line) =>
      line
        .split(/(\s+)/)
        .map((tok) => (/\s/.test(tok) || tok === "" ? tok : shiftToken(tok, shift)))
        .join(""),
    )
    .join("\n");
}

function semitoneOfKey(key: string): number {
  const norm = KEY_TO_NORM[key] ?? key;
  const letter = norm.replace(/[#b]/, "");
  let s = CHROMATIC.indexOf(letter);
  if (norm.includes("#")) s = (s + 1) % 12;
  if (norm.includes("b")) s = (s + 11) % 12;
  return s;
}

function semitoneToKey(semi: number, useFlat: boolean): string {
  const sharp = CHROMATIC[modPositive(semi, 12)]!;
  const norm = useFlat && ENHARMONIC_FLAT[sharp] ? ENHARMONIC_FLAT[sharp]! : sharp;
  return NORM_TO_KEY[norm] ?? norm;
}

/**
 * Compute the new key signature when shifting tongyin (筒音作) from `source` to `target`.
 * The displayed key changes because the same fingerings now imply a different tonic.
 */
export function transposeKey(key: string, sourceTongyin: number, targetTongyin: number): string {
  if (sourceTongyin === targetTongyin) return key;
  const sourceSemi = semitoneOfKey(key);
  const sourceInterval = MAJOR_INTERVALS[sourceTongyin - 1] ?? 0;
  const targetInterval = MAJOR_INTERVALS[targetTongyin - 1] ?? 0;
  const newSemi = sourceSemi + sourceInterval - targetInterval;
  const norm = KEY_TO_NORM[key] ?? key;
  const useFlat = norm.includes("b") || ["F", "Bb", "Eb", "Ab", "Db", "Gb"].includes(norm);
  return semitoneToKey(newSemi, useFlat);
}

/** Scale-degree shift for changing tongyin: digit X in source becomes X + (target - source) (with octave wrap). */
export function tongyinShift(sourceTongyin: number, targetTongyin: number): number {
  return targetTongyin - sourceTongyin;
}
