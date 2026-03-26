import type { Technique } from "@/shared/types";

// Fundamentals
import { technique as rhythmReading } from "./fundamentals/rhythm-reading";
import { technique as longTones } from "./fundamentals/long-tones";
import { technique as scaleWalk } from "./fundamentals/scale-walk";
import { technique as stepPatterns } from "./fundamentals/step-patterns";
import { technique as skipPatterns } from "./fundamentals/skip-patterns";

// Articulation
import { technique as tonguing } from "./articulation/tonguing";
import { technique as doubleTonguing } from "./articulation/double-tonguing";
import { technique as tripleTonguing } from "./articulation/triple-tonguing";
import { technique as duoYin } from "./articulation/duo-yin";

// Ornaments
import { technique as graceNote } from "./ornaments/grace-note";
import { technique as dieYin } from "./ornaments/die-yin";
import { technique as daYin } from "./ornaments/da-yin";
import { technique as zengYin } from "./ornaments/zeng-yin";
import { technique as boYin } from "./ornaments/bo-yin";
import { technique as trill } from "./ornaments/trill";
import { technique as ornamentCombo } from "./ornaments/ornament-combo";

// Breathing
import { technique as dynamics } from "./breathing/dynamics";
import { technique as vibrato } from "./breathing/vibrato";
import { technique as circularBreathing } from "./breathing/circular-breathing";

// Fingering
import { technique as pentatonicScale } from "./fingering/pentatonic-scale";
import { technique as octaveJumps } from "./fingering/octave-jumps";
import { technique as twoOctaveRange } from "./fingering/two-octave-range";
import { technique as forkFingering } from "./fingering/fork-fingering";
import { technique as halfHoling } from "./fingering/half-holing";
import { technique as flyingFingers } from "./fingering/flying-fingers";

// Advanced
import { technique as flutterTongue } from "./advanced/flutter-tongue";
import { technique as slides } from "./advanced/slides";
import { technique as sanBan } from "./advanced/san-ban";
import { technique as liYin } from "./advanced/li-yin";
import { technique as harmonics } from "./advanced/harmonics";
import { technique as sixteenthNotes } from "./advanced/sixteenth-notes";
import { technique as dottedRhythm } from "./advanced/dotted-rhythm";

export const techniques: Technique[] = [
  rhythmReading,
  longTones,
  scaleWalk,
  stepPatterns,
  skipPatterns,
  tonguing,
  doubleTonguing,
  tripleTonguing,
  duoYin,
  graceNote,
  dieYin,
  daYin,
  zengYin,
  boYin,
  trill,
  ornamentCombo,
  dynamics,
  vibrato,
  circularBreathing,
  pentatonicScale,
  octaveJumps,
  twoOctaveRange,
  forkFingering,
  halfHoling,
  flyingFingers,
  flutterTongue,
  slides,
  sanBan,
  liYin,
  harmonics,
  sixteenthNotes,
  dottedRhythm,
];

export function getTechnique(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

export function getTechniquesByCategory(category: Technique["category"]): Technique[] {
  return techniques.filter((t) => t.category === category);
}
