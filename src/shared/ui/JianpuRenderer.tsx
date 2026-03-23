interface JianpuRendererProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  activeBeatIndex?: number;
  beatDurationMs?: number;
  startBeatIndex?: number;
  onBeatClick?: (beatIndex: number) => void;
  title?: string;
  keySignature?: string;
  timeSignature?: string;
  tempo?: number;
  // Interactive editor props
  interactive?: boolean;
  selectedTokenIdx?: number | null;
  onTokenClick?: (tokenIdx: number, x: number, y: number) => void;
  onGapClick?: (insertIdx: number, x: number, y: number) => void;
}

export type Token =
  | {
      type: "note";
      value: string;
      octave: number;
      dotted: boolean;
      accidental?: "#" | "b";
      duration?: "eighth" | "sixteenth";
      fermata?: boolean;
      staccato?: boolean;
      accent?: boolean;
      trill?: boolean;
      tonguing?: boolean;
    }
  | { type: "rest"; duration?: "eighth" | "sixteenth" }
  | { type: "hold" }
  | { type: "bar"; value: string }
  | { type: "text"; value: string }
  | { type: "tie" }
  | { type: "breath" }
  | { type: "slur-start" }
  | { type: "slur-end" }
  | { type: "beam-start" }
  | { type: "beam-end" }
  | { type: "tonguing"; technique: string }
  | { type: "ornament"; name: string };

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

function isBeat(token: Token): boolean {
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

// ─── SVG Layout & Rendering ───

// Cell widths in SVG units
const CELL_NOTE = 28;
const CELL_BAR = 12;
const CELL_TIE = 14;
const CELL_BREATH = 0;
const CELL_BEAM_NOTE = 18;
const CELL_ANNOTATION = 0;
const CELL_TEXT = 16;

// Y positions
const Y_MARK = 6; // tonguing, fermata, staccato, accent, trill
const Y_OCTAVE_UP = 16;
const Y_NOTE = 30; // text baseline
const Y_BEAM = 33; // beam right below note number
const Y_BEAM2 = 37; // sixteenth second line
const Y_OCTAVE_DOWN = 40; // octave dots below beams
const LINE_HEIGHT = 52;

interface LayoutItem {
  token: Token;
  x: number;
  width: number;
  beatIndex: number | null;
  tokenIdx: number;
  children?: LayoutItem[];
  groupType?: "beam" | "slur";
}

function layoutLine(
  tokens: Token[],
  beatCounter: { value: number },
  tokenIdxOffset: number = 0,
): { items: LayoutItem[]; totalWidth: number } {
  const items: LayoutItem[] = [];
  let x = 0;
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i]!;
    const ti = tokenIdxOffset + i;

    if (token.type === "slur-start") {
      const children: LayoutItem[] = [];
      i++;
      const slurX = x;
      while (i < tokens.length && tokens[i]!.type !== "slur-end") {
        const t = tokens[i]!;
        if (t.type === "beam-start") {
          const beamChildren: LayoutItem[] = [];
          i++;
          const beamX = x;
          while (i < tokens.length && tokens[i]!.type !== "beam-end") {
            const bt = tokens[i]!;
            const w = CELL_BEAM_NOTE;
            beamChildren.push({
              token: bt, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
              beatIndex: isBeat(bt) ? beatCounter.value++ : null,
            });
            x += w;
            i++;
          }
          i++; // skip beam-end
          children.push({
            token: { type: "beam-start" }, x: beamX + (x - beamX) / 2,
            width: x - beamX, beatIndex: null, tokenIdx: ti, children: beamChildren, groupType: "beam",
          });
        } else {
          const w = cellWidth(t);
          children.push({
            token: t, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
            beatIndex: isBeat(t) ? beatCounter.value++ : null,
          });
          x += w;
          i++;
        }
      }
      i++; // skip slur-end
      items.push({
        token: { type: "slur-start" }, x: slurX + (x - slurX) / 2,
        width: x - slurX, beatIndex: null, tokenIdx: ti, children, groupType: "slur",
      });
    } else if (token.type === "beam-start") {
      const children: LayoutItem[] = [];
      i++;
      const beamX = x;
      while (i < tokens.length && tokens[i]!.type !== "beam-end") {
        const bt = tokens[i]!;
        const w = CELL_BEAM_NOTE;
        children.push({
          token: bt, x: x + w / 2, width: w, tokenIdx: tokenIdxOffset + i,
          beatIndex: isBeat(bt) ? beatCounter.value++ : null,
        });
        x += w;
        i++;
      }
      i++; // skip beam-end
      items.push({
        token: { type: "beam-start" }, x: beamX + (x - beamX) / 2,
        width: x - beamX, beatIndex: null, tokenIdx: ti, children, groupType: "beam",
      });
    } else if (token.type === "slur-end" || token.type === "beam-end") {
      i++;
    } else {
      const w = cellWidth(token);
      items.push({
        token, x: x + w / 2, width: w, tokenIdx: ti,
        beatIndex: isBeat(token) ? beatCounter.value++ : null,
      });
      x += w;
      i++;
    }
  }

  return { items, totalWidth: x };
}

function cellWidth(token: Token): number {
  switch (token.type) {
    case "bar":
      return CELL_BAR;
    case "tie":
      return CELL_TIE;
    case "breath":
      return CELL_BREATH;
    case "tonguing":
    case "ornament":
      return CELL_ANNOTATION;
    case "text":
      return CELL_TEXT;
    default:
      return CELL_NOTE;
  }
}

interface InteractiveOpts {
  interactive?: boolean;
  selectedTokenIdx?: number | null;
  onTokenClick?: (tokenIdx: number, x: number, y: number) => void;
  onGapClick?: (insertIdx: number, x: number, y: number) => void;
  onBeatClick?: (beatIndex: number) => void;
  lineYOffset?: number;
}

function renderSvgItems(
  items: LayoutItem[],
  activeBeatIndex: number | undefined,
  elements: React.ReactNode[],
  keyPrefix: string,
  opts?: InteractiveOpts,
) {
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]!;
    const key = `${keyPrefix}-${idx}`;

    // Annotations: render above the next item's center x
    if (item.token.type === "tonguing" || item.token.type === "ornament") {
      const next = items[idx + 1];
      const targetX = next ? (next.children ? flatFirst(next.children)?.x ?? next.x : next.x) : item.x;
      if (item.token.type === "tonguing") {
        elements.push(
          <text
            key={key}
            x={targetX}
            y={Y_MARK}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fontFamily="sans-serif"
            fill="var(--color-accent)"
          >
            {item.token.technique === "single"
              ? "T"
              : item.token.technique === "double"
                ? "TK"
                : item.token.technique === "triple"
                  ? "TTK"
                  : item.token.technique}
          </text>,
        );
      } else {
        elements.push(
          <text
            key={key}
            x={targetX}
            y={Y_MARK}
            textAnchor="middle"
            fontSize="8"
            fontStyle="italic"
            fontFamily="sans-serif"
            fill="var(--color-text-secondary)"
          >
            {item.token.name}
          </text>,
        );
      }
      continue;
    }

    if (item.groupType === "slur" && item.children) {
      // Render children first
      renderSvgItems(item.children, activeBeatIndex, elements, `${key}-s`, opts);
      // Draw slur arc above
      const first = flatFirst(item.children);
      const last = flatLast(item.children);
      if (first && last) {
        const sx = first.x;
        const ex = last.x;
        const midX = (sx + ex) / 2;
        const arcHeight = Math.min(10, (ex - sx) * 0.15 + 4);
        elements.push(
          <path
            key={`${key}-arc`}
            d={`M ${sx} ${Y_OCTAVE_UP - 4} Q ${midX} ${Y_OCTAVE_UP - 4 - arcHeight} ${ex} ${Y_OCTAVE_UP - 4}`}
            fill="none"
            stroke="var(--color-text-secondary)"
            strokeWidth="1.2"
          />,
        );
      }
    } else if (item.groupType === "beam" && item.children) {
      // Render children
      renderSvgItems(item.children, activeBeatIndex, elements, `${key}-b`, opts);
      // Draw beam line
      const first = item.children[0];
      const last = item.children[item.children.length - 1];
      if (first && last) {
        const x1 = first.x - first.width * 0.35;
        const x2 = last.x + last.width * 0.35;
        elements.push(
          <line
            key={`${key}-beam`}
            x1={x1}
            y1={Y_BEAM}
            x2={x2}
            y2={Y_BEAM}
            stroke="var(--color-text)"
            strokeWidth="1.5"
          />,
        );
        // Draw partial second beam lines for contiguous sixteenth note runs
        let runStart: number | null = null;
        let beam2Idx = 0;
        for (let ci = 0; ci <= item.children.length; ci++) {
          const child = item.children[ci];
          const isSixteenth =
            child?.token.type === "note" && child.token.duration === "sixteenth";
          if (isSixteenth && runStart === null) {
            runStart = ci;
          } else if (!isSixteenth && runStart !== null) {
            const rs = item.children[runStart]!;
            const re = item.children[ci - 1]!;
            elements.push(
              <line
                key={`${key}-beam2-${beam2Idx++}`}
                x1={rs.x - rs.width * 0.35}
                y1={Y_BEAM2}
                x2={re.x + re.width * 0.35}
                y2={Y_BEAM2}
                stroke="var(--color-text)"
                strokeWidth="1.5"
              />,
            );
            runStart = null;
          }
        }
      }
    } else {
      renderSvgToken(item, activeBeatIndex, elements, key, opts);
    }
  }
}

function renderSvgToken(
  item: LayoutItem,
  activeBeatIndex: number | undefined,
  elements: React.ReactNode[],
  key: string,
  opts?: InteractiveOpts,
) {
  const { token, x, width, beatIndex, tokenIdx } = item;
  const isActive = beatIndex !== null && beatIndex === activeBeatIndex;
  const isSelected = opts?.selectedTokenIdx === tokenIdx;
  const textColor = isActive ? "white" : "var(--color-text)";
  const secondaryColor = isActive ? "white" : "var(--color-text-secondary)";
  const clickable = opts?.interactive && isBeat(token);
  const beatClickable = !clickable && opts?.onBeatClick && beatIndex !== null;
  const clickHandler = clickable
    ? () => opts.onTokenClick?.(tokenIdx, x, (opts.lineYOffset ?? 0) + Y_NOTE)
    : beatClickable
      ? () => opts.onBeatClick!(beatIndex!)
      : undefined;

  switch (token.type) {
    case "note": {
      // data-beat group wrapper for scrollIntoView
      const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;

      // Accidental
      if (token.accidental) {
        elements.push(
          <text
            key={`${key}-acc`}
            x={x - 7}
            y={Y_NOTE}
            textAnchor="middle"
            fontSize="9"
            fill={textColor}
          >
            {token.accidental === "#" ? "♯" : "♭"}
          </text>,
        );
      }

      // Selection highlight
      if (isSelected) {
        elements.push(
          <rect
            key={`${key}-sel`}
            x={x - width / 2}
            y={Y_NOTE - 15}
            width={width}
            height={20}
            rx={3}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="3 2"
          />,
        );
      }

      // Note number
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill={isSelected ? "var(--color-accent)" : textColor}
          style={clickable || beatClickable ? { cursor: "pointer" } : undefined}
          onClick={clickHandler}
          {...beatAttr}
        >
          {token.value}
        </text>,
      );

      // Octave dots
      if (token.octave > 0) {
        for (let d = 0; d < token.octave; d++) {
          elements.push(
            <circle
              key={`${key}-ou${d}`}
              cx={x}
              cy={Y_OCTAVE_UP - d * 4}
              r={1.5}
              fill={textColor}
            />,
          );
        }
      }
      if (token.octave < 0) {
        for (let d = 0; d < -token.octave; d++) {
          elements.push(
            <circle
              key={`${key}-od${d}`}
              cx={x}
              cy={Y_OCTAVE_DOWN + d * 4}
              r={1.5}
              fill={textColor}
            />,
          );
        }
      }

      // Duration underlines (for non-beamed notes)
      if (token.duration === "eighth" || token.duration === "sixteenth") {
        elements.push(
          <line
            key={`${key}-dur`}
            x1={x - 5}
            y1={Y_BEAM}
            x2={x + 5}
            y2={Y_BEAM}
            stroke={textColor}
            strokeWidth="1.5"
          />,
        );
        if (token.duration === "sixteenth") {
          elements.push(
            <line
              key={`${key}-dur2`}
              x1={x - 5}
              y1={Y_BEAM2}
              x2={x + 5}
              y2={Y_BEAM2}
              stroke={textColor}
              strokeWidth="1.5"
            />,
          );
        }
      }

      // Above-note marks
      const markY = token.octave > 0 ? Y_MARK - 2 : Y_MARK;
      if (token.tonguing) {
        elements.push(
          <text
            key={`${key}-tng`}
            x={x}
            y={markY}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fontFamily="sans-serif"
            fill="var(--color-accent)"
          >
            T
          </text>,
        );
      }
      if (token.fermata) {
        elements.push(
          <text key={`${key}-fer`} x={x} y={markY} textAnchor="middle" fontSize="10" fill={textColor}>
            𝄐
          </text>,
        );
      }
      if (token.staccato) {
        elements.push(
          <circle key={`${key}-stc`} cx={x} cy={markY} r={1.3} fill={textColor} />,
        );
      }
      if (token.accent) {
        elements.push(
          <text key={`${key}-acn`} x={x} y={markY} textAnchor="middle" fontSize="9" fill={textColor}>
            &gt;
          </text>,
        );
      }
      if (token.trill) {
        elements.push(
          <text
            key={`${key}-trl`}
            x={x}
            y={markY}
            textAnchor="middle"
            fontSize="8"
            fontStyle="italic"
            fill={textColor}
          >
            tr
          </text>,
        );
      }
      break;
    }
    case "rest": {
      const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill={isSelected ? "var(--color-accent)" : secondaryColor}
          style={clickable || beatClickable ? { cursor: "pointer" } : undefined}
          onClick={clickHandler}
          {...beatAttr}
        >
          0
        </text>,
      );
      // Duration underlines for rests
      if (token.duration === "eighth" || token.duration === "sixteenth") {
        elements.push(
          <line
            key={`${key}-dur`}
            x1={x - 5}
            y1={Y_BEAM}
            x2={x + 5}
            y2={Y_BEAM}
            stroke={secondaryColor}
            strokeWidth="1.5"
          />,
        );
        if (token.duration === "sixteenth") {
          elements.push(
            <line
              key={`${key}-dur2`}
              x1={x - 5}
              y1={Y_BEAM2}
              x2={x + 5}
              y2={Y_BEAM2}
              stroke={secondaryColor}
              strokeWidth="1.5"
            />,
          );
        }
      }
      break;
    }
    case "hold": {
      const beatAttr = beatIndex !== null ? { "data-beat": beatIndex } : undefined;
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill={isSelected ? "var(--color-accent)" : secondaryColor}
          style={clickable || beatClickable ? { cursor: "pointer" } : undefined}
          onClick={clickHandler}
          {...beatAttr}
        >
          –
        </text>,
      );
      break;
    }
    case "bar": {
      const isDouble = token.value === "||";
      if (isDouble) {
        // Double bar: thin line + thick line
        elements.push(
          <line
            key={`${key}-a`}
            x1={x - 3}
            y1={Y_NOTE - 12}
            x2={x - 3}
            y2={Y_NOTE + 4}
            stroke="var(--color-text-secondary)"
            strokeWidth="1"
          />,
        );
        elements.push(
          <line
            key={`${key}-b`}
            x1={x + 2}
            y1={Y_NOTE - 12}
            x2={x + 2}
            y2={Y_NOTE + 4}
            stroke="var(--color-text)"
            strokeWidth="2.5"
          />,
        );
      } else {
        elements.push(
          <line
            key={key}
            x1={x}
            y1={Y_NOTE - 12}
            x2={x}
            y2={Y_NOTE + 4}
            stroke="var(--color-text-secondary)"
            strokeWidth="1"
          />,
        );
      }
      break;
    }
    case "tie":
      elements.push(
        <path
          key={key}
          d={`M ${x - 5} ${Y_NOTE - 10} Q ${x} ${Y_NOTE - 16} ${x + 5} ${Y_NOTE - 10}`}
          fill="none"
          stroke="var(--color-text-secondary)"
          strokeWidth="1"
        />,
      );
      break;
    case "breath":
      elements.push(
        <text
          key={key}
          x={x + CELL_BAR / 2}
          y={Y_NOTE - 14}
          textAnchor="middle"
          fontSize="8"
          fill="var(--color-text-secondary)"
        >
          ∨
        </text>,
      );
      break;
    case "tonguing":
      elements.push(
        <text
          key={key}
          x={x + CELL_NOTE / 2}
          y={Y_MARK}
          textAnchor="middle"
          fontSize="8"
          fontWeight="600"
          fontFamily="sans-serif"
          fill="var(--color-accent)"
        >
          {token.technique === "single"
            ? "T"
            : token.technique === "double"
              ? "TK"
              : token.technique === "triple"
                ? "TTK"
                : token.technique}
        </text>,
      );
      break;
    case "ornament":
      elements.push(
        <text
          key={key}
          x={x + CELL_NOTE / 2}
          y={Y_MARK}
          textAnchor="middle"
          fontSize="8"
          fontStyle="italic"
          fontFamily="sans-serif"
          fill="var(--color-text-secondary)"
        >
          {token.name}
        </text>,
      );
      break;
    case "text":
      elements.push(
        <text
          key={key}
          x={x}
          y={Y_NOTE}
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-text-secondary)"
        >
          {token.value}
        </text>,
      );
      break;
  }
}

/** Get the first leaf LayoutItem (for arc endpoints) */
function flatFirst(items: LayoutItem[]): LayoutItem | undefined {
  for (const item of items) {
    if (item.children) {
      const f = flatFirst(item.children);
      if (f) return f;
    } else if (isBeat(item.token)) {
      return item;
    }
  }
  return undefined;
}

function findActiveBeat(items: LayoutItem[], beatIdx: number | undefined): LayoutItem | undefined {
  if (beatIdx === undefined) return undefined;
  for (const item of items) {
    if (item.beatIndex === beatIdx) return item;
    if (item.children) {
      const found = findActiveBeat(item.children, beatIdx);
      if (found) return found;
    }
  }
  return undefined;
}

function flatLast(items: LayoutItem[]): LayoutItem | undefined {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i]!;
    if (item.children) {
      const l = flatLast(item.children);
      if (l) return l;
    } else if (isBeat(item.token)) {
      return item;
    }
  }
  return undefined;
}


import { useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function JianpuRenderer({
  content,
  className = "",
  style,
  activeBeatIndex,
  beatDurationMs,
  startBeatIndex,
  onBeatClick,
  title,
  keySignature,
  timeSignature,
  tempo,
  interactive,
  selectedTokenIdx,
  onTokenClick,
  onGapClick,
}: JianpuRendererProps) {
  const notationLines = content.split("\n");

  const beatCounter = { value: 0 };
  let tokenIdxOffset = 0;

  // Pre-compute layouts for all notation lines to find max width
  const lineLayouts: { items: LayoutItem[]; totalWidth: number; isEmpty: boolean }[] =
    notationLines.map((line) => {
      const trimmed = line.trim();
      if (trimmed === "") {
        tokenIdxOffset++; // account for \n
        return { items: [], totalWidth: 0, isEmpty: true };
      }
      const rawTokens = trimmed.split(/\s+/).map(parseToken);
      const result = { ...layoutLine(rawTokens, beatCounter, tokenIdxOffset), isEmpty: false };
      tokenIdxOffset += rawTokens.length + 1; // +1 for the implicit \n between lines
      return result;
    });

  const maxWidth = Math.max(...lineLayouts.map((l) => l.totalWidth), 1);

  const hasHeader = title || keySignature || timeSignature || tempo;

  const transitionDur = (beatDurationMs ?? 150) / 1000; // seconds for framer-motion

  // Track which line has the active beat
  const activeLineIdx = lineLayouts.findIndex(
    (l) => !l.isEmpty && findActiveBeat(l.items, activeBeatIndex),
  );

  // Compute line end x positions for exit animation
  const lineEndXMap = useMemo(() => {
    const map = new Map<number, number>();
    lineLayouts.forEach((layout, idx) => {
      if (!layout.isEmpty) {
        let endX = 0;
        for (const item of layout.items) {
          const r = item.x + item.width / 2;
          if (r > endX) endX = r;
        }
        map.set(idx, endX + 20);
      }
    });
    return map;
  }, [lineLayouts]);

  // Remember the previous line to know the exit direction
  const prevLineRef = useRef(-1);
  if (activeLineIdx >= 0) {
    prevLineRef.current = activeLineIdx;
  }

  return (
    <div className={className} style={style}>
      {hasHeader && (
        <div className="jianpu-header">
          {title && <div>{title}</div>}
          {(keySignature || timeSignature) && (
            <div>
              {keySignature && `1=${keySignature}`}
              {keySignature && timeSignature && "  "}
              {timeSignature}
            </div>
          )}
          {tempo && <div>♩={tempo}</div>}
        </div>
      )}

      {lineLayouts.map((layout, lineIdx) => {
        if (layout.isEmpty) {
          return <div key={lineIdx} className="h-2" />;
        }

        const svgElements: React.ReactNode[] = [];
        const interOpts: InteractiveOpts = {
          interactive, selectedTokenIdx, onTokenClick, onGapClick, onBeatClick,
          lineYOffset: lineIdx * LINE_HEIGHT,
        };
        renderSvgItems(layout.items, activeBeatIndex, svgElements, `L${lineIdx}`, interOpts);

        // Per-line highlight
        const activeItem = findActiveBeat(layout.items, activeBeatIndex);
        const hlX = activeItem ? activeItem.x - activeItem.width / 2 + 1 : 0;
        const hlW = activeItem ? activeItem.width - 2 : 0;
        const lineEndX = lineEndXMap.get(lineIdx) ?? maxWidth;

        // Start marker
        const startItem = startBeatIndex !== undefined ? findActiveBeat(layout.items, startBeatIndex) : undefined;

        return (
          <svg
            key={lineIdx}
            viewBox={`0 0 ${maxWidth} ${LINE_HEIGHT}`}
            width="100%"
            preserveAspectRatio="xMinYMid meet"
            style={{ display: "block" }}
            className="jianpu-svg"
          >
            <AnimatePresence>
              {activeItem && (
                <motion.rect
                  key={`hl-${lineIdx}`}
                  y={Y_NOTE - 14}
                  height={18}
                  rx={3}
                  fill="var(--color-accent)"
                  initial={false}
                  animate={{
                    x: hlX,
                    width: hlW,
                    opacity: 1,
                  }}
                  exit={{
                    x: lineEndX,
                    opacity: 0,
                  }}
                  transition={beatDurationMs ? {
                    x: { duration: transitionDur, ease: "linear" },
                    width: { duration: transitionDur, ease: "linear" },
                    opacity: { duration: 0.15, ease: "easeOut" },
                  } : {
                    duration: 0,
                  }}
                />
              )}
            </AnimatePresence>
            {startItem && !activeItem && (
              <polygon
                points={`${startItem.x - 4},${Y_MARK - 4} ${startItem.x + 4},${Y_MARK - 4} ${startItem.x},${Y_MARK + 2}`}
                fill="var(--color-accent)"
                opacity={0.7}
              />
            )}
            {svgElements}
          </svg>
        );
      })}
    </div>
  );
}
