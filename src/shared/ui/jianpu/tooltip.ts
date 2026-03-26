import type { Token } from "./types";

const SOLFEGE: Record<string, string> = {
  "1": "Do", "2": "Re", "3": "Mi", "4": "Fa",
  "5": "Sol", "6": "La", "7": "Ti",
};

// Standard dizi fingering: 筒音作5 (all holes covered = low 5)
// Holes: 1(top) 2 3 4 5 6(bottom) — ● = covered, ○ = open, ◐ = half
// Key format: "digit:octave" e.g. "5:-1" = low 5, "1:0" = middle 1, "3:1" = high 3
const FINGERING: Record<string, string> = {
  // Lower octave
  "5:-1": "●●●●●●",
  "6:-1": "●●●●●○",
  "7:-1": "●●●●○○",
  // Middle octave
  "1:0":  "●●●○○○",
  "2:0":  "●●○○○○",
  "3:0":  "●○○○○○",
  "4:0":  "○●●○○○",
  "5:0":  "○●●●●●",
  "6:0":  "●●●●●○",
  "7:0":  "●●●●○○",
  // Upper octave (overblow)
  "1:1":  "●●●○○○",
  "2:1":  "●●○○○○",
  "3:1":  "●○○○○○",
};

// Sharp variants
const FINGERING_SHARP: Record<string, string> = {
  "1:0":  "●●◐○○○",
  "2:0":  "●◐○○○○",
  "4:0":  "○○●○○○",
  "5:0":  "○●●●●◐",
};

// Fork fingering variants
const FINGERING_FORK: Record<string, string> = {
  "2:0":  "●○●○○○",
  "3:0":  "○●○○○○",
  "5:0":  "●●○●●●",
  "6:0":  "●●○●●○",
  "5:-1": "●●○●●●",
};

function getFingering(digit: string, octave: number, accidental?: string, hasFork?: boolean): string | null {
  const key = `${digit}:${octave}`;
  if (hasFork && FINGERING_FORK[key]) return FINGERING_FORK[key]!;
  if (accidental === "#" && FINGERING_SHARP[key]) return FINGERING_SHARP[key]!;
  return FINGERING[key] ?? null;
}

export interface NoteTooltipLink {
  id: string;
  label: string;
  type: "technique" | "reference";
}

export interface NoteTooltipResult {
  text: string;
  links: NoteTooltipLink[];
}

export function buildNoteTooltip(token: Token, annotations: string[]): NoteTooltipResult | null {
  if (token.type !== "note") return null;

  const lines: string[] = [];
  const links: NoteTooltipLink[] = [];
  const addedIds = new Set<string>();
  const addLink = (id: string, label: string, type: "technique" | "reference" = "technique") => {
    if (!addedIds.has(id)) { addedIds.add(id); links.push({ id, label, type }); }
  };

  // Grace notes + main note
  const graceMatch = token.value.match(/^\((\d[',]*)\)\((\d[',]*)\)(\d)/)
    || token.value.match(/^\((\d[',]*)\)(\d)/);
  const mainDigit = graceMatch
    ? (graceMatch.length === 4 ? graceMatch[3]! : graceMatch[2]!)
    : token.value.replace(/\./g, "");

  const name = SOLFEGE[mainDigit] ?? mainDigit;
  let noteLabel = `${mainDigit} (${name})`;
  if (token.octave > 0) noteLabel += ` — upper octave`;
  if (token.octave < 0) noteLabel += ` — lower octave`;
  lines.push(noteLabel);

  // Fingering chart
  const hasFork = annotations.includes("fork");
  const fingering = getFingering(mainDigit, token.octave, token.accidental, hasFork);
  if (fingering) {
    lines.push(`Fingering: ${fingering}`);
    addLink("d-key-dizi", "D-Key Fingering Chart", "reference");
  }

  // Grace notes
  if (graceMatch) {
    const isDouble = graceMatch.length === 4;
    const graces = isDouble ? `${graceMatch[1]!.replace(/[',]/g, "")}${graceMatch[2]!.replace(/[',]/g, "")}` : graceMatch[1]!.replace(/[',]/g, "");
    lines.push(`Grace notes: ${graces} → ${mainDigit} (quick ornamental flick before the beat)`);
    addLink("grace-note", "Grace Notes");
  }

  // Accidental
  if (token.accidental === "#") { lines.push("Sharp ♯ — raise a half step"); addLink("fingering-charts", "Fingering Charts", "reference"); }
  if (token.accidental === "b") { lines.push("Flat ♭ — lower a half step"); addLink("fingering-charts", "Fingering Charts", "reference"); }

  // Duration
  if (token.duration === "eighth") lines.push("Eighth note (half beat)");
  if (token.duration === "sixteenth") lines.push("Sixteenth note (quarter beat)");
  if (token.dotted) { lines.push("Dotted — hold 1.5× duration"); addLink("dotted-rhythm", "Dotted Rhythms"); }

  // Octave
  if (token.octave !== 0) addLink("two-octave-range", "Two Octave Range");

  // Articulations
  if (token.tonguing) { lines.push("Tonguing (T) — crisp tongue attack on this note"); addLink("tonguing", "Single Tonguing"); }
  if (token.trill) { lines.push("Trill (tr) — rapidly alternate with note above"); addLink("trill", "Trill"); }
  if (token.fermata) lines.push("Fermata — hold longer than written");
  if (token.staccato) lines.push("Staccato — short and detached");
  if (token.accent) { lines.push("Accent — emphasize this note"); addLink("dynamics", "Dynamics"); }

  // Annotations from preceding tokens
  for (const ann of annotations) {
    if (ann === "fork") { lines.push("Fork fingering (又) — alternate fingering for different tone color"); addLink("fork-fingering", "Fork Fingering"); }
    else if (ann === "die") { lines.push("叠音 (Dié Yīn) — quick grace from ONE hole above, finger only (no tongue)"); addLink("die-yin", "叠音 Die Yin"); }
    else if (ann === "da") { lines.push("打音 (Dǎ Yīn) — quick strike from ONE hole below, finger only (no tongue)"); addLink("da-yin", "打音 Da Yin"); }
    else if (ann === "zeng") { lines.push("赠音 (Zèng Yīn) — trailing gift note at end of held note, release finger as breath stops"); addLink("zeng-yin", "赠音 Zeng Yin"); }
    else if (ann === "bo") { lines.push("波音 (Bō Yīn) — single rapid upper-neighbor flick (one oscillation, like a short trill)"); addLink("bo-yin", "波音 Bo Yin"); }
    else if (ann === "vibrato") { lines.push("Vibrato — oscillate pitch for expression"); addLink("vibrato", "Vibrato"); }
    else if (ann === "slide-up") { lines.push("Slide up — glide pitch upward into note"); addLink("slides", "Slides"); }
    else if (ann === "slide-down") { lines.push("Slide down — glide pitch downward"); addLink("slides", "Slides"); }
    else if (ann === "flutter") { lines.push("Flutter tongue (花舌) — roll tongue while playing"); addLink("flutter-tongue", "Flutter Tongue"); }
    else if (ann.startsWith("T:")) {
      const tech = ann.slice(2);
      if (tech === "single") { lines.push("Single tonguing (T) — one tongue attack per note"); addLink("tonguing", "Single Tonguing"); }
      else if (tech === "double") { lines.push("Double tonguing (TK) — alternating tongue attacks"); addLink("double-tonguing", "Double Tonguing"); }
      else if (tech === "triple") { lines.push("Triple tonguing (TTK) — three rapid attacks"); addLink("triple-tonguing", "Triple Tonguing"); }
    }
  }

  return { text: lines.join("\n"), links };
}
