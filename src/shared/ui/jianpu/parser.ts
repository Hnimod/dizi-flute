import type { Token } from "./types";

// Extended note regex:
// optional tr prefix, optional # or b, digit 1-7, optional octave ',
// optional dot, optional articulation ^;>T. Duration comes from `[ ... ]` nesting depth.
const EXT_NOTE_RE =
  /^(tr)?(#|b)?([1-7])([',]*)(\.*)?([;^>T])?$/;

// Grace note: (x)... same extensions — octave markers and `#`/`b` accidentals
// allowed inside parens.
const EXT_GRACE_RE =
  /^(tr)?\(((?:#|b)?[1-7][',]*)\)(#|b)?([1-7])([',]*)(\.*)?([;^>T])?$/;

// Double grace note: (x)(y)... two grace notes before main note
const EXT_DOUBLE_GRACE_RE =
  /^(tr)?\(((?:#|b)?[1-7][',]*)\)\(((?:#|b)?[1-7][',]*)\)(#|b)?([1-7])([',]*)(\.*)?([;^>T])?$/;

export function isNotationLine(line: string): boolean {
  return /[1-7]/.test(line) && /[|\-]/.test(line);
}

export function isBeat(token: Token): boolean {
  return token.type === "note" || token.type === "rest" || token.type === "hold";
}

function beatDuration(token: Token): number {
  if (token.type === "note" || token.type === "rest") {
    const dur = (token as { duration?: string }).duration;
    if (dur === "eighth") return 0.5;
    if (dur === "sixteenth") return 0.25;
  }
  return 1.0;
}

/** Auto-assign duration to notes/rests inside beam groups based on nesting depth */
export function normalizeBeamDurations(tokens: Token[]): Token[] {
  let depth = 0;
  for (const token of tokens) {
    if (token.type === "beam-start") { depth++; continue; }
    if (token.type === "beam-end") { depth--; continue; }
    if (depth > 0 && (token.type === "note" || token.type === "rest")) {
      if (!(token as { duration?: string }).duration) {
        (token as { duration?: string }).duration = depth >= 2 ? "sixteenth" : "eighth";
      }
    }
  }
  return tokens;
}

/** Returns duration multiplier per beat index: 1.0=quarter, 0.5=eighth, 0.25=sixteenth */
export function buildBeatSchedule(content: string): number[] {
  const schedule: number[] = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "") continue;

    const tokens = normalizeBeamDurations(trimmed.split(/\s+/).map(parseToken));
    let cueDepth = 0;
    for (const t of tokens) {
      if (t.type === "cue-start") { cueDepth++; continue; }
      if (t.type === "cue-end") { cueDepth = Math.max(0, cueDepth - 1); continue; }
      if (cueDepth > 0) continue;
      if (isBeat(t)) {
        schedule.push(beatDuration(t));
      }
    }
  }
  return schedule;
}

export function parseToken(raw: string): Token {
  // Bar lines
  if (/^:?\|{1,2}:?$/.test(raw)) {
    return { type: "bar", value: raw };
  }

  // Tie
  if (raw === "~") {
    return { type: "tie" };
  }

  // Breath mark
  if (raw === "V") return { type: "breath" };

  // Tie markers
  if (raw === "~(") return { type: "tie-start" };
  if (raw === "~)") return { type: "tie-end" };

  // Cue markers (notes the dizi player doesn't play — accompaniment for context)
  if (raw === "cue(") return { type: "cue-start" };
  if (raw === ")cue") return { type: "cue-end" };

  // Slur markers
  if (raw === "(") return { type: "slur-start" };
  if (raw === ")") return { type: "slur-end" };

  // Volta brackets: [1. [2. etc.
  if (/^\[\d+\.$/.test(raw)) {
    return { type: "volta", ending: parseInt(raw[1]!) };
  }

  // Beam markers
  if (raw === "[") return { type: "beam-start" };
  if (raw === "]") return { type: "beam-end" };

  // Tonguing annotation: T:single, T:double, T:triple + shorthand T, TK, TTK
  if (raw === "T") return { type: "tonguing", technique: "single" };
  if (raw === "TK") return { type: "tonguing", technique: "double" };
  if (raw === "TTK") return { type: "tonguing", technique: "triple" };
  if (raw.startsWith("T:")) {
    return { type: "tonguing", technique: raw.slice(2) };
  }

  // Tempo markings: rit, accel, atempo
  const TEMPO_MARKS: Record<string, string> = {
    "rit": "rit.", "accel": "accel.", "atempo": "a tempo",
  };
  const tempoMark = TEMPO_MARKS[raw];
  if (tempoMark) return { type: "tempo", text: tempoMark };

  // Navigation marks: segno, coda, D.S., D.C., Fine, to-coda, and combos.
  // Tokens are split on whitespace, so multi-word labels use camelCase aliases.
  const NAV_TOKENS: Record<string, { kind: "segno" | "coda" | "ds" | "dc" | "fine" | "to-coda" | "ds-al-fine" | "ds-al-coda" | "dc-al-fine" | "dc-al-coda"; text: string }> = {
    "segno": { kind: "segno", text: "𝄋" },
    "𝄋": { kind: "segno", text: "𝄋" },
    "coda": { kind: "coda", text: "𝄌" },
    "𝄌": { kind: "coda", text: "𝄌" },
    "D.S.": { kind: "ds", text: "D.S." },
    "DS": { kind: "ds", text: "D.S." },
    "D.C.": { kind: "dc", text: "D.C." },
    "DC": { kind: "dc", text: "D.C." },
    "Fine": { kind: "fine", text: "Fine" },
    "fine": { kind: "fine", text: "Fine" },
    "toCoda": { kind: "to-coda", text: "To Coda" },
    "to-coda": { kind: "to-coda", text: "To Coda" },
    "D.S.alFine": { kind: "ds-al-fine", text: "D.S. al Fine" },
    "D.S.alCoda": { kind: "ds-al-coda", text: "D.S. al Coda" },
    "D.C.alFine": { kind: "dc-al-fine", text: "D.C. al Fine" },
    "D.C.alCoda": { kind: "dc-al-coda", text: "D.C. al Coda" },
  };
  const navMark = NAV_TOKENS[raw];
  if (navMark) return { type: "nav", kind: navMark.kind, text: navMark.text };

  // Ornament shorthand: Chinese characters or short English names
  const ORNAMENT_SHORTHAND: Record<string, string> = {
    "\u53C8": "die", "\u53E0": "die", "\u2E98": "da", "\u6253": "da",
    "\u8D60": "zeng", "\u6CE2": "bo", "\u82B1": "flutter",
    "\u98DE": "fly", "\u56DE": "return-slide",
    "die": "die", "da": "da", "zeng": "zeng", "bo": "bo", "lower-bo": "lower-bo",
    "vib": "vibrato", "flutter": "flutter", "su": "slide-up", "sd": "slide-down",
    "fly": "fly", "fei": "fly",
    "return-slide": "return-slide", "rs": "return-slide",
    "glide-up": "glide-up", "gu": "glide-up",
    "glide-down": "glide-down", "gd": "glide-down",
  };
  const ornShort = ORNAMENT_SHORTHAND[raw];
  if (ornShort) return { type: "ornament", name: ornShort };

  // Ornament annotation: orn:slide-up, orn:vibrato, etc.
  if (raw.startsWith("orn:")) {
    return { type: "ornament", name: raw.slice(4) };
  }

  // Rest. Duration comes from `[ ... ]` nesting depth via normalizeBeamDurations.
  if (raw === "0") return { type: "rest" };

  // Hold
  if (raw === "-") return { type: "hold" };

  // Extended note
  const m = raw.match(EXT_NOTE_RE);
  if (m) {
    const trill = !!m[1];
    const accidental = m[2] as "#" | "b" | undefined;
    const digit = m[3]!;
    const octaveChars = m[4] || "";
    const dots = m[5] || "";
    const articulation = m[6] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    return {
      type: "note",
      value: digit,
      octave,
      dotted: dots.length > 0,
      accidental,
      fermata: articulation === "^",
      staccato: articulation === ";",
      accent: articulation === ">",
      trill,
      tonguing: articulation === "T",
    };
  }

  // Double grace note: (x)(y)z
  const dg = raw.match(EXT_DOUBLE_GRACE_RE);
  if (dg) {
    const trill = !!dg[1];
    const grace1 = dg[2]!;
    const grace2 = dg[3]!;
    const accidental = dg[4] as "#" | "b" | undefined;
    const mainNote = dg[5]!;
    const octaveChars = dg[6] || "";
    const dots = dg[7] || "";
    const articulation = dg[8] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    return {
      type: "note",
      value: `(${grace1})(${grace2})${mainNote}${dots}`,
      octave,
      dotted: dots.length > 0,
      accidental,
      fermata: articulation === "^",
      staccato: articulation === ";",
      accent: articulation === ">",
      trill,
      tonguing: articulation === "T",
    };
  }

  // Extended grace note
  const g = raw.match(EXT_GRACE_RE);
  if (g) {
    const trill = !!g[1];
    const graceNote = g[2]!;
    const accidental = g[3] as "#" | "b" | undefined;
    const mainNote = g[4]!;
    const octaveChars = g[5] || "";
    const dots = g[6] || "";
    const articulation = g[7] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    return {
      type: "note",
      value: `(${graceNote})${mainNote}${dots}`,
      octave,
      dotted: dots.length > 0,
      accidental,
      fermata: articulation === "^",
      staccato: articulation === ";",
      accent: articulation === ">",
      trill,
      tonguing: articulation === "T",
    };
  }

  // Fallback: text token
  return { type: "text", value: raw };
}
