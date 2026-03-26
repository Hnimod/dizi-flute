import type { LayoutItem, InteractiveOpts } from "./types";
import {
  CELL_NOTE, CELL_BAR,
  Y_VOLTA, Y_MARK, Y_OCTAVE_UP, Y_NOTE, Y_BEAM, Y_BEAM2, Y_OCTAVE_DOWN,
} from "./constants";
import { isBeat } from "./parser";
import { flatFirst, flatLast } from "./layout";

// Ornament names that render as Chinese characters (non-italic, bold)
const ORNAMENT_CHARS: Record<string, string> = {
  fork: "又",
  die: "叠",
  da: "打",
  zeng: "赠",
  bo: "波",
  vibrato: "〜",
};

function ornamentDisplay(name: string): { text: string; isChar: boolean; fontSize?: number } {
  const char = ORNAMENT_CHARS[name];
  if (!char) return { text: name, isChar: false };
  if (name === "vibrato") return { text: char, isChar: true, fontSize: 16 };
  return { text: char, isChar: true };
}

export function renderSvgItems(
  items: LayoutItem[],
  activeBeatIndex: number | undefined,
  elements: React.ReactNode[],
  keyPrefix: string,
  opts?: InteractiveOpts,
  incomingVolta?: { ending: number } | null,
): { openVolta: { ending: number } | null } {
  const pendingAnnotations: string[] = [];

  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]!;
    const key = `${keyPrefix}-${idx}`;

    // Annotations: render above the next item's center x
    if (item.token.type === "tonguing" || item.token.type === "ornament") {
      pendingAnnotations.push(
        item.token.type === "tonguing" ? `T:${item.token.technique}` : item.token.name,
      );
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
        const { text: ornText, isChar, fontSize: ornFs } = ornamentDisplay(item.token.name);
        elements.push(
          <text
            key={key}
            x={targetX}
            y={Y_MARK}
            textAnchor="middle"
            fontSize={ornFs ?? (isChar ? 10 : 8)}
            fontStyle={isChar ? "normal" : "italic"}
            fontWeight={isChar ? "700" : undefined}
            fontFamily="sans-serif"
            fill="var(--color-text-secondary)"
          >
            {ornText}
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
        const x1 = first.x - 5;
        const x2 = last.x + 5;
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
                x1={rs.x - 5}
                y1={Y_BEAM2}
                x2={re.x + 5}
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
      renderSvgToken(item, activeBeatIndex, elements, key, opts, [...pendingAnnotations]);
      if (isBeat(item.token)) pendingAnnotations.length = 0;
    }
  }

  // Post-pass: render volta brackets
  let currentVolta: { ending: number; startX: number; continuation: boolean } | null =
    incomingVolta ? { ending: incomingVolta.ending, startX: 0, continuation: true } : null;
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]!;
    if (item.token.type === "volta") {
      if (currentVolta) {
        renderVoltaBracket(currentVolta, item.x, elements, keyPrefix, true, currentVolta.continuation);
      }
      const nextItem = items[idx + 1];
      const startX = nextItem ? nextItem.x : item.x;
      currentVolta = { ending: item.token.ending, startX, continuation: false };
    } else if (item.token.type === "bar" && (item.token.value === ":|" || item.token.value === "||")) {
      if (currentVolta) {
        renderVoltaBracket(currentVolta, item.x, elements, keyPrefix, true, currentVolta.continuation);
        currentVolta = null;
      }
    }
  }
  // Close volta at end of line if still open (no right edge — continues next line)
  if (currentVolta && items.length > 0) {
    const last = items[items.length - 1]!;
    renderVoltaBracket(currentVolta, last.x + last.width / 2, elements, keyPrefix, false, currentVolta.continuation);
  }
  return { openVolta: currentVolta ? { ending: currentVolta.ending } : null };
}

function renderVoltaBracket(
  volta: { ending: number; startX: number },
  endX: number,
  elements: React.ReactNode[],
  keyPrefix: string,
  closedEnd: boolean,
  continuation: boolean = false,
) {
  const y = Y_VOLTA;
  elements.push(
    <g key={`${keyPrefix}-volta-${volta.ending}-${volta.startX}-${continuation ? "cont" : "start"}`}>
      {!continuation && (
        <line x1={volta.startX} y1={y + 5} x2={volta.startX} y2={y} stroke="var(--color-text)" strokeWidth="1" />
      )}
      <line x1={volta.startX} y1={y} x2={endX} y2={y} stroke="var(--color-text)" strokeWidth="1" />
      {closedEnd && (
        <line x1={endX} y1={y} x2={endX} y2={y + 5} stroke="var(--color-text)" strokeWidth="1" />
      )}
      {!continuation && (
        <text x={volta.startX - 10} y={y + 5} fontSize="7" fontWeight="600" fill="var(--color-text)">{volta.ending}.</text>
      )}
    </g>,
  );
}

function renderSvgToken(
  item: LayoutItem,
  activeBeatIndex: number | undefined,
  elements: React.ReactNode[],
  key: string,
  opts?: InteractiveOpts,
  annotations: string[] = [],
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
  const noteHoverEnter = opts?.onNoteHover && token.type === "note"
    ? (e: React.MouseEvent) => opts.onNoteHover!(token, e, annotations)
    : undefined;
  const noteHoverLeave = opts?.onNoteLeave;

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

      // Note number (with grace note handling)
      const noteColor = isSelected ? "var(--color-accent)" : textColor;
      const noteStyle = clickable || beatClickable ? { cursor: "pointer" as const } : undefined;
      const graceMatch = token.value.match(/^\((\d[',]*)\)\((\d[',]*)\)(\d.*)$/)
        || token.value.match(/^\((\d[',]*)\)(\d.*)$/);

      if (graceMatch) {
        const isDouble = graceMatch.length === 4;
        const graceRaws = isDouble ? [graceMatch[1]!, graceMatch[2]!] : [graceMatch[1]!];
        const graceText = graceRaws.map((g) => g.replace(/[',]/g, "")).join("");
        const mainText = isDouble ? graceMatch[3]! : graceMatch[2]!;
        // Grace notes as small superscript
        const graceX = x - 6;
        const graceY = Y_OCTAVE_UP - 2;
        elements.push(
          <text
            key={`${key}-grace`}
            x={graceX}
            y={graceY}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill={noteColor}
          >
            {graceText}
          </text>,
        );
        // Octave dots for grace notes
        let graceCharIdx = 0;
        for (const raw of graceRaws) {
          let oct = 0;
          for (const c of raw) { if (c === "'") oct++; if (c === ",") oct--; }
          const dotX = graceX - (graceRaws.length > 1 ? (graceText.length / 2 - graceCharIdx - 0.5) * 5 : 0);
          if (oct > 0) {
            for (let d = 0; d < oct; d++) {
              elements.push(<circle key={`${key}-gou${graceCharIdx}-${d}`} cx={dotX} cy={graceY - 6 - d * 3} r={1} fill={noteColor} />);
            }
          }
          if (oct < 0) {
            for (let d = 0; d < -oct; d++) {
              elements.push(<circle key={`${key}-god${graceCharIdx}-${d}`} cx={dotX} cy={graceY + 4 + d * 3} r={1} fill={noteColor} />);
            }
          }
          graceCharIdx++;
        }
        // Main note digit
        elements.push(
          <text
            key={key}
            x={x}
            y={Y_NOTE}
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill={noteColor}
            style={noteHoverEnter ? { ...noteStyle, cursor: "help" } : noteStyle}
            onClick={clickHandler}
            onMouseEnter={noteHoverEnter}
            onMouseLeave={noteHoverLeave}
            {...beatAttr}
          >
            {mainText}
          </text>,
        );
      } else {
        elements.push(
          <text
            key={key}
            x={x}
            y={Y_NOTE}
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill={noteColor}
            style={noteHoverEnter ? { ...noteStyle, cursor: "help" } : noteStyle}
            onClick={clickHandler}
            onMouseEnter={noteHoverEnter}
            onMouseLeave={noteHoverLeave}
            {...beatAttr}
          >
            {token.value}
          </text>,
        );
      }

      // Augmentation dot (dotted rhythm)
      if (token.dotted) {
        elements.push(
          <circle
            key={`${key}-dot`}
            cx={x + 7}
            cy={Y_NOTE - 4}
            r={1.5}
            fill={noteColor}
          />,
        );
      }

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
      const isRepeatStart = token.value === "|:";
      const isRepeatEnd = token.value === ":|";
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
      } else if (isRepeatStart) {
        // Repeat start: thick line + thin line + two dots
        elements.push(
          <line key={`${key}-a`} x1={x - 3} y1={Y_NOTE - 12} x2={x - 3} y2={Y_NOTE + 4} stroke="var(--color-text)" strokeWidth="2.5" />,
          <line key={`${key}-b`} x1={x + 2} y1={Y_NOTE - 12} x2={x + 2} y2={Y_NOTE + 4} stroke="var(--color-text-secondary)" strokeWidth="1" />,
          <circle key={`${key}-d1`} cx={x + 5} cy={Y_NOTE - 5} r={1.3} fill="var(--color-text)" />,
          <circle key={`${key}-d2`} cx={x + 5} cy={Y_NOTE + 1} r={1.3} fill="var(--color-text)" />,
        );
      } else if (isRepeatEnd) {
        // Repeat end: two dots + thin line + thick line
        elements.push(
          <circle key={`${key}-d1`} cx={x - 5} cy={Y_NOTE - 5} r={1.3} fill="var(--color-text)" />,
          <circle key={`${key}-d2`} cx={x - 5} cy={Y_NOTE + 1} r={1.3} fill="var(--color-text)" />,
          <line key={`${key}-a`} x1={x - 2} y1={Y_NOTE - 12} x2={x - 2} y2={Y_NOTE + 4} stroke="var(--color-text-secondary)" strokeWidth="1" />,
          <line key={`${key}-b`} x1={x + 3} y1={Y_NOTE - 12} x2={x + 3} y2={Y_NOTE + 4} stroke="var(--color-text)" strokeWidth="2.5" />,
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
    case "ornament": {
      const { text: ornText2, isChar: isChar2, fontSize: ornFs2 } = ornamentDisplay(token.name);
      elements.push(
        <text
          key={key}
          x={x + CELL_NOTE / 2}
          y={Y_MARK}
          textAnchor="middle"
          fontSize={ornFs2 ?? (isChar2 ? 10 : 8)}
          fontStyle={isChar2 ? "normal" : "italic"}
          fontWeight={isChar2 ? "700" : undefined}
          fontFamily="sans-serif"
          fill="var(--color-text-secondary)"
        >
          {ornText2}
        </text>,
      );
      break;
    }
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
