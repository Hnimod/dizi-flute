import type { Token } from "./types";

// Extended note regex:
// optional tr prefix, optional # or b, digit 1-7, optional octave ',
// optional dot, optional _ or __, optional articulation ^;>
const EXT_NOTE_RE =
  /^(tr)?(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>T])?$/;

// Grace note: (x)... same extensions
const EXT_GRACE_RE =
  /^(tr)?\(([1-7])\)(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>T])?$/;

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

/** Returns duration multiplier per beat index: 1.0=quarter, 0.5=eighth, 0.25=sixteenth */
export function buildBeatSchedule(content: string): number[] {
  const schedule: number[] = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "") continue;

    const tokens = trimmed.split(/\s+/).map(parseToken);
    for (const t of tokens) {
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

  // Slur markers
  if (raw === "(") return { type: "slur-start" };
  if (raw === ")") return { type: "slur-end" };

  // Beam markers
  if (raw === "[") return { type: "beam-start" };
  if (raw === "]") return { type: "beam-end" };

  // Tonguing annotation: T:single, T:double, T:triple
  if (raw.startsWith("T:")) {
    return { type: "tonguing", technique: raw.slice(2) };
  }

  // Ornament annotation: orn:slide-up, orn:vibrato, etc.
  if (raw.startsWith("orn:")) {
    return { type: "ornament", name: raw.slice(4) };
  }

  // Rest (with optional duration)
  if (raw === "0") return { type: "rest" };
  if (raw === "0_") return { type: "rest", duration: "eighth" };
  if (raw === "0__") return { type: "rest", duration: "sixteenth" };

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
    const underscores = m[6] || "";
    const articulation = m[7] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    const duration =
      underscores === "__" ? "sixteenth" : underscores === "_" ? "eighth" : undefined;

    return {
      type: "note",
      value: digit + dots,
      octave,
      dotted: dots.length > 0,
      accidental,
      duration,
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
    const underscores = g[7] || "";
    const articulation = g[8] || "";

    let octave = 0;
    for (const c of octaveChars) {
      if (c === "'") octave++;
      if (c === ",") octave--;
    }

    const duration =
      underscores === "__" ? "sixteenth" : underscores === "_" ? "eighth" : undefined;

    return {
      type: "note",
      value: `(${graceNote})${mainNote}${dots}`,
      octave,
      dotted: dots.length > 0,
      accidental,
      duration,
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
