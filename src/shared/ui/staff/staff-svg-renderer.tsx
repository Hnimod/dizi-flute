/**
 * Custom SVG staff notation renderer that shares x-coordinates with the jianpu layout.
 * This ensures pixel-perfect alignment between staff notes and jianpu numbers.
 */
import type { LayoutItem, Token } from "../jianpu/types";

// --- Staff geometry constants ---
const STAFF_STEP = 3.5;       // px between adjacent staff positions (line-space)
const STAFF_LINE_GAP = STAFF_STEP * 2; // px between adjacent lines
const NUM_LINES = 5;
const STAFF_HEIGHT = STAFF_LINE_GAP * (NUM_LINES - 1); // 28px total
const STAFF_TOP_Y = 36;       // Y of top staff line (extra top margin for clef)
const STAFF_BOT_Y = STAFF_TOP_Y + STAFF_HEIGHT;
const STAFF_TOTAL_H = STAFF_HEIGHT + 60; // with margins for clef, ledger lines, stems

// Treble clef: top line = F5, bottom line = E4
// Staff positions as diatonic steps above C4:
// E4=2, F4=3, G4=4, A4=5, B4=6, C5=7, D5=8, E5=9, F5=10
const BOTTOM_LINE_DIATONIC = 2; // E4

// Note names in diatonic order (C=0, D=1, E=2, F=3, G=4, A=5, B=6)
const NOTE_ORDER = ["C", "D", "E", "F", "G", "A", "B"];

// Major scale intervals in semitones
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const ENHARMONIC_FLAT: Record<string, string> = {
  "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb",
};

const KEY_TO_NORM: Record<string, string> = {
  C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B",
  "bD": "Db", "bE": "Eb", "bB": "Bb", "bA": "Ab", "bG": "Gb",
  "#C": "C#", "#F": "F#",
};

// Key signatures: number of sharps (positive) or flats (negative)
const KEY_SIG_COUNT: Record<string, number> = {
  "C": 0, "G": 1, "D": 2, "A": 3, "E": 4, "B": 5, "F#": 6, "C#": 7,
  "F": -1, "Bb": -2, "Eb": -3, "Ab": -4, "Db": -5, "Gb": -6,
};
// Order of sharps/flats on staff (diatonic positions relative to C4)
// Sharps: F C G D A E B  → staff positions for treble clef
const SHARP_POSITIONS = [10, 7, 11, 8, 5, 9, 6]; // F5, C5, G5, D5, A4, E5, B4
const FLAT_POSITIONS = [6, 9, 5, 8, 4, 7, 3];     // B4, E5, A4, D5, G4, C5, F4

interface ScaleEntry {
  noteName: string;    // e.g., "F#", "Bb", "C"
  letter: string;      // e.g., "F", "B", "C"
  diatonicBase: number; // diatonic index of letter: C=0, D=1, ..., B=6
}

function buildScaleInfo(key: string): ScaleEntry[] {
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

/**
 * Convert a jianpu note token + key info to a diatonic position (steps above C4).
 * C4=0, D4=1, E4=2, ..., B4=6, C5=7, D5=8, ...
 */
const INVALID_DIATONIC = -999;

function noteToDiatonic(
  digit: string,
  octave: number,
  scaleInfo: ScaleEntry[],
): number {
  const idx = parseInt(digit) - 1;
  if (idx < 0 || idx > 6) return INVALID_DIATONIC;

  const entry = scaleInfo[idx]!;
  // Base octave: jianpu octave 0 maps to octave 4 for dizi
  const absOctave = 4 + octave;

  // Diatonic position = octave * 7 + diatonicBase, relative to C0
  // We want relative to C4 = 0
  return (absOctave - 4) * 7 + entry.diatonicBase;
}

/** Convert diatonic position (relative to C4) to staff Y coordinate */
function diatonicToY(pos: number): number {
  // E4 (pos=2) is at STAFF_BOT_Y, each step up decreases Y by STAFF_STEP
  return STAFF_BOT_Y - (pos - BOTTOM_LINE_DIATONIC) * STAFF_STEP;
}

/** Parse grace notes from a note value string like "(2)3" or "(2)(3)4" */
function extractMainDigit(value: string): string {
  const graceMatch = value.match(/^\(([1-7][',]*)\)(?:\(([1-7][',]*)\))?([1-7])/);
  if (graceMatch) return graceMatch[3]!;
  return value[0] || value;
}

function extractGraces(value: string): { digit: string; octave: number }[] {
  const graces: { digit: string; octave: number }[] = [];
  const m = value.match(/^\(([1-7][',]*)\)(?:\(([1-7][',]*)\))?/);
  if (!m) return graces;

  const parseOne = (s: string) => {
    let oct = 0;
    for (let i = 1; i < s.length; i++) {
      if (s[i] === "'") oct++;
      if (s[i] === ",") oct--;
    }
    return { digit: s[0]!, octave: oct };
  };

  graces.push(parseOne(m[1]!));
  if (m[2]) graces.push(parseOne(m[2]));
  return graces;
}

// --- SVG drawing helpers ---

function renderStaffLines(maxWidth: number): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  for (let i = 0; i < NUM_LINES; i++) {
    const y = STAFF_TOP_Y + i * STAFF_LINE_GAP;
    elements.push(
      <line
        key={`staff-line-${i}`}
        x1={0}
        y1={y}
        x2={maxWidth}
        y2={y}
        stroke="var(--color-text)"
        strokeWidth={0.5}
        opacity={0.4}
      />,
    );
  }
  return elements;
}

// Left margin for clef + key signature (in negative x space)
export const CLEF_MARGIN = 80;

/** Render treble clef as Unicode text, sized to fit within viewBox */
function renderClef(): React.ReactNode {
  // The 𝄞 glyph extends ~70% above its baseline. We position the baseline
  // near the bottom of the staff so the clef body covers the staff lines.
  const fontSize = STAFF_HEIGHT * 1.8;
  const y = STAFF_BOT_Y + fontSize * 0.08;
  return (
    <text
      key="clef"
      x={4}
      y={y}
      fontSize={fontSize}
      fontFamily="'Noto Music', 'Segoe UI Symbol', 'Apple Symbols', serif"
      fill="var(--color-text)"
      opacity={0.7}
    >
      𝄞
    </text>
  );
}

/** Render key signature sharps or flats */
function renderKeySignature(keyStr: string): React.ReactNode[] {
  const normKey = KEY_TO_NORM[keyStr] || keyStr;
  const count = KEY_SIG_COUNT[normKey] ?? 0;
  if (count === 0) return [];

  const elements: React.ReactNode[] = [];
  const isSharp = count > 0;
  const positions = isSharp ? SHARP_POSITIONS : FLAT_POSITIONS;
  const symbol = isSharp ? "♯" : "♭";
  const n = Math.abs(count);

  for (let i = 0; i < n && i < positions.length; i++) {
    const diatonic = positions[i]!;
    const y = diatonicToY(diatonic) + 1.5; // slight adjustment for text baseline
    elements.push(
      <text
        key={`keysig-${i}`}
        x={38 + i * 10}
        y={y}
        fontSize={14}
        fontFamily="serif"
        fill="var(--color-text)"
        opacity={0.7}
        textAnchor="middle"
      >
        {symbol}
      </text>,
    );
  }
  return elements;
}

/** Notehead: filled ellipse for quarter/eighth/sixteenth, open for half/whole */
function renderNotehead(
  x: number,
  diatonic: number,
  filled: boolean,
  key: string,
): React.ReactNode {
  const y = diatonicToY(diatonic);
  const rx = 3.2;
  const ry = 2.3;
  return (
    <ellipse
      key={key}
      cx={x}
      cy={y}
      rx={rx}
      ry={ry}
      fill={filled ? "var(--color-text)" : "none"}
      stroke="var(--color-text)"
      strokeWidth={filled ? 0 : 0.8}
      transform={`rotate(-15 ${x} ${y})`}
    />
  );
}

/** Stem: line extending up or down from the notehead */
function renderStem(x: number, diatonic: number, key: string): React.ReactNode {
  const y = diatonicToY(diatonic);
  // Stem up if note is below middle line (B4, diatonic=6), down otherwise
  const stemUp = diatonic < 6;
  const stemLength = 18;
  const stemX = stemUp ? x + 3 : x - 3;
  const y1 = y;
  const y2 = stemUp ? y - stemLength : y + stemLength;

  return (
    <line
      key={key}
      x1={stemX}
      y1={y1}
      x2={stemX}
      y2={y2}
      stroke="var(--color-text)"
      strokeWidth={0.7}
    />
  );
}

/** Flag for eighth/sixteenth notes (when not beamed) */
function renderFlag(
  x: number,
  diatonic: number,
  duration: "eighth" | "sixteenth",
  key: string,
): React.ReactNode {
  const y = diatonicToY(diatonic);
  const stemUp = diatonic < 6;
  const stemLength = 18;
  const stemX = stemUp ? x + 3 : x - 3;
  const tipY = stemUp ? y - stemLength : y + stemLength;

  const flags: React.ReactNode[] = [];
  const numFlags = duration === "sixteenth" ? 2 : 1;

  for (let i = 0; i < numFlags; i++) {
    const offset = i * 4;
    if (stemUp) {
      flags.push(
        <path
          key={`${key}-flag-${i}`}
          d={`M${stemX},${tipY + offset} q4,4 2,9`}
          fill="none"
          stroke="var(--color-text)"
          strokeWidth={0.8}
        />,
      );
    } else {
      flags.push(
        <path
          key={`${key}-flag-${i}`}
          d={`M${stemX},${tipY - offset} q4,-4 2,-9`}
          fill="none"
          stroke="var(--color-text)"
          strokeWidth={0.8}
        />,
      );
    }
  }
  return <>{flags}</>;
}

/** Ledger lines for notes above or below the staff */
function renderLedgerLines(x: number, diatonic: number, key: string): React.ReactNode[] {
  const lines: React.ReactNode[] = [];
  const ledgerWidth = 8;

  // Below staff: ledger lines for positions at or below C4 (diatonic 0)
  // Staff bottom is E4 (diatonic 2). Ledger lines at D4(1), C4(0), B3(-1), A3(-2)...
  // Lines are at even diatonic positions below the staff (on lines, not spaces)
  if (diatonic <= 0) {
    // C4 (middle C) is at diatonic 0 — needs ledger line
    for (let d = 0; d >= diatonic; d -= 2) {
      const y = diatonicToY(d);
      lines.push(
        <line
          key={`${key}-ledger-${d}`}
          x1={x - ledgerWidth}
          y1={y}
          x2={x + ledgerWidth}
          y2={y}
          stroke="var(--color-text)"
          strokeWidth={0.5}
          opacity={0.6}
        />,
      );
    }
  }

  // Above staff: ledger lines above F5 (diatonic 10)
  if (diatonic >= 12) {
    for (let d = 12; d <= diatonic; d += 2) {
      const y = diatonicToY(d);
      lines.push(
        <line
          key={`${key}-ledger-${d}`}
          x1={x - ledgerWidth}
          y1={y}
          x2={x + ledgerWidth}
          y2={y}
          stroke="var(--color-text)"
          strokeWidth={0.5}
          opacity={0.6}
        />,
      );
    }
  }

  return lines;
}

/** Quarter rest symbol */
function renderQuarterRest(x: number, key: string): React.ReactNode {
  const midY = STAFF_TOP_Y + STAFF_HEIGHT / 2;
  return (
    <text
      key={key}
      x={x}
      y={midY + 3}
      fontSize={14}
      fontFamily="serif"
      fill="var(--color-text)"
      textAnchor="middle"
      opacity={0.7}
    >
      𝄾
    </text>
  );
}

/** Render eighth/sixteenth rest */
function renderSmallRest(x: number, duration: "eighth" | "sixteenth", key: string): React.ReactNode {
  const midY = STAFF_TOP_Y + STAFF_HEIGHT / 2;
  const symbol = duration === "sixteenth" ? "𝅁" : "𝄾";
  return (
    <text
      key={key}
      x={x}
      y={midY + 3}
      fontSize={14}
      fontFamily="serif"
      fill="var(--color-text)"
      textAnchor="middle"
      opacity={0.7}
    >
      {symbol}
    </text>
  );
}

/** Bar line */
function renderBarLine(x: number, barType: string, key: string): React.ReactNode[] {
  const lines: React.ReactNode[] = [];

  if (barType === "||" || barType === ":||") {
    // Double bar
    lines.push(
      <line key={`${key}-a`} x1={x - 2} y1={STAFF_TOP_Y} x2={x - 2} y2={STAFF_BOT_Y}
        stroke="var(--color-text)" strokeWidth={0.5} opacity={0.5} />,
      <line key={`${key}-b`} x1={x + 1} y1={STAFF_TOP_Y} x2={x + 1} y2={STAFF_BOT_Y}
        stroke="var(--color-text)" strokeWidth={1.2} opacity={0.5} />,
    );
  } else {
    lines.push(
      <line key={key} x1={x} y1={STAFF_TOP_Y} x2={x} y2={STAFF_BOT_Y}
        stroke="var(--color-text)" strokeWidth={0.5} opacity={0.4} />,
    );
  }
  return lines;
}

/** Dot for dotted notes */
function renderDot(x: number, diatonic: number, key: string): React.ReactNode {
  const y = diatonicToY(diatonic);
  // If note is on a line, shift dot to the space above
  const onLine = diatonic % 2 === 0;
  const dotY = onLine ? y - STAFF_STEP : y;
  return (
    <circle
      key={key}
      cx={x + 5}
      cy={dotY}
      r={1}
      fill="var(--color-text)"
    />
  );
}

// --- Main render function ---

export interface StaffLineProps {
  items: LayoutItem[];
  maxWidth: number;
  keySignature: string;
  scaleInfo?: ScaleEntry[];
}

/**
 * Render Western-standard slur and tie arcs.
 * - Slurs: smooth cubic bezier over/under a group of notes
 * - Ties: tighter curve connecting two noteheads of the same pitch
 * Direction: curves below noteheads (between staff and jianpu numbers below)
 */
function renderSlurAndTieArcs(
  items: LayoutItem[],
  scaleInfo: ScaleEntry[],
  elements: React.ReactNode[],
): void {
  let arcIdx = 0;

  // Render slur arcs for slur groups — curve below the noteheads
  for (const item of items) {
    if (item.groupType === "slur" && item.children && item.children.length > 0) {
      const notes = collectNotes(item.children, scaleInfo);
      if (notes.length >= 2) {
        const first = notes[0]!;
        const last = notes[notes.length - 1]!;
        // Curve below: use the lowest notehead Y (highest value) as anchor
        const maxY = Math.max(...notes.map((n) => n.y));
        const startY = first.y + 4;
        const endY = last.y + 4;
        const midX = (first.x + last.x) / 2;
        const cpY = maxY + 10;

        elements.push(
          <path
            key={`slur-${arcIdx++}`}
            d={`M${first.x + 3},${startY} C${midX - (midX - first.x) * 0.4},${cpY} ${midX + (last.x - midX) * 0.4},${cpY} ${last.x - 3},${endY}`}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth={0.7}
            opacity={0.55}
          />,
        );
      }
    }
  }

  // Render tie arcs — curve below the noteheads
  const flat = flattenItems(items);
  let tieFrom: { x: number; y: number } | null = null;
  for (const item of flat) {
    if (item.token.type === "note" && tieFrom) {
      const digit = extractMainDigit(item.token.value);
      const diatonic = noteToDiatonic(digit, item.token.octave, scaleInfo);
      if (diatonic !== INVALID_DIATONIC) {
        const noteY = diatonicToY(diatonic);
        const baseY = Math.max(tieFrom.y, noteY) + 4;
        const midX = (tieFrom.x + item.x) / 2;
        const cpY = baseY + 7;

        elements.push(
          <path
            key={`tie-${arcIdx++}`}
            d={`M${tieFrom.x + 3},${baseY} Q${midX},${cpY} ${item.x - 3},${baseY}`}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth={0.7}
            opacity={0.5}
          />,
        );
        tieFrom = null;
      }
    } else if (item.token.type === "tie" || item.token.type === "tie-start") {
      const prevNotes = flat.filter(
        (f) => f.token.type === "note" && f.x < item.x,
      );
      if (prevNotes.length > 0) {
        const prev = prevNotes[prevNotes.length - 1]!;
        const digit = extractMainDigit((prev.token as { value: string }).value);
        const oct = (prev.token as { octave: number }).octave;
        const diatonic = noteToDiatonic(digit, oct, scaleInfo);
        if (diatonic !== INVALID_DIATONIC) {
          tieFrom = { x: prev.x, y: diatonicToY(diatonic) };
        }
      }
    }
  }
}

/** Collect note positions from layout items (recursive) */
function collectNotes(
  items: LayoutItem[],
  scaleInfo: ScaleEntry[],
): { x: number; y: number; diatonic: number }[] {
  const notes: { x: number; y: number; diatonic: number }[] = [];
  for (const item of items) {
    if (item.children) {
      notes.push(...collectNotes(item.children, scaleInfo));
    } else if (item.token.type === "note") {
      const digit = extractMainDigit(item.token.value);
      const diatonic = noteToDiatonic(digit, item.token.octave, scaleInfo);
      if (diatonic !== INVALID_DIATONIC) {
        notes.push({ x: item.x, y: diatonicToY(diatonic), diatonic });
      }
    }
  }
  return notes;
}

export function renderStaffSvgLine(
  items: LayoutItem[],
  maxWidth: number,
  keySignature: string,
): React.ReactNode {
  const scaleInfo = buildScaleInfo(keySignature);
  const elements: React.ReactNode[] = [];

  // Walk items and render notes/rests/bars
  const flatItems = flattenItems(items);


  for (let i = 0; i < flatItems.length; i++) {
    const item = flatItems[i]!;
    const token = item.token;
    const x = item.x;
    const k = `n${i}`;

    switch (token.type) {
      case "note": {
        const mainDigit = extractMainDigit(token.value);
        const diatonic = noteToDiatonic(mainDigit, token.octave, scaleInfo);
        if (diatonic === INVALID_DIATONIC) break;

        // Determine fill: quarter/eighth/sixteenth are filled, half/whole are open
        // Check if note has holds after it (making it longer)
        let holdCount = 0;
        for (let j = i + 1; j < flatItems.length; j++) {
          if (flatItems[j]!.token.type === "hold") holdCount++;
          else break;
        }

        const isHalf = !token.duration && holdCount === 1;
        const isWhole = !token.duration && holdCount >= 3;
        const filled = !isHalf && !isWhole;

        // Ledger lines
        elements.push(...renderLedgerLines(x, diatonic, `${k}-ledger`));

        // Notehead
        elements.push(renderNotehead(x, diatonic, filled, `${k}-head`));

        // Stem (not for whole notes)
        if (!isWhole) {
          elements.push(renderStem(x, diatonic, `${k}-stem`));
        }

        // Flag (for eighth/sixteenth when not in a beam group)
        if (token.duration && !item.inBeam) {
          elements.push(renderFlag(x, diatonic, token.duration, `${k}-flag`));
        }

        // Dotted note
        if (token.dotted) {
          elements.push(renderDot(x, diatonic, `${k}-dot`));
        }

        // Grace notes (small noteheads before the main note)
        const graces = extractGraces(token.value);
        for (let gi = 0; gi < graces.length; gi++) {
          const g = graces[gi]!;
          const gDiatonic = noteToDiatonic(g.digit, g.octave, scaleInfo);
          if (gDiatonic === INVALID_DIATONIC) continue;
          const gx = x - 6 - (graces.length - 1 - gi) * 5;
          const gy = diatonicToY(gDiatonic);
          elements.push(
            <ellipse
              key={`${k}-grace-${gi}`}
              cx={gx}
              cy={gy}
              rx={2}
              ry={1.5}
              fill="var(--color-text)"
              transform={`rotate(-15 ${gx} ${gy})`}
            />,
          );
        }

        break;
      }

      case "rest": {
        if (token.duration === "eighth" || token.duration === "sixteenth") {
          elements.push(renderSmallRest(x, token.duration, k));
        } else {
          elements.push(renderQuarterRest(x, k));
        }
        break;
      }

      case "bar": {
        elements.push(...renderBarLine(x, token.value, k));
        break;
      }

      // skip non-rendering tokens
    }
  }

  // Render tie/slur arcs between consecutive notes
  // Walk the flat items and find tie-start/tie-end pairs and slur groups
  renderSlurAndTieArcs(items, scaleInfo, elements);

  // Separate clef/keysig (at absolute positions) from notes (need offset)
  const clefElements = [renderClef(), ...renderKeySignature(keySignature)];
  const staffLines = renderStaffLines(maxWidth + CLEF_MARGIN);

  return (
    <svg
      viewBox={`0 -4 ${maxWidth + CLEF_MARGIN} ${STAFF_TOTAL_H}`}
      width="100%"
      preserveAspectRatio="xMinYMid meet"
      style={{ display: "block" }}
      className="staff-svg"
    >
      {staffLines}
      {clefElements}
      <g transform={`translate(${CLEF_MARGIN}, 0)`}>
        {elements}
      </g>
    </svg>
  );
}

/** Flatten beam/slur groups into a linear list, marking beam membership */
interface FlatItem {
  token: Token;
  x: number;
  width: number;
  inBeam: boolean;
}

function flattenItems(items: LayoutItem[], parentIsBeam = false): FlatItem[] {
  const result: FlatItem[] = [];
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      const isBeam = item.groupType === "beam";
      result.push(...flattenItems(item.children, isBeam || parentIsBeam));
    } else {
      result.push({ token: item.token, x: item.x, width: item.width, inBeam: parentIsBeam });
    }
  }
  return result;
}
