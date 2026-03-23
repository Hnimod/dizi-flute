import type { LayoutItem, InteractiveOpts } from "./types";
import {
  CELL_NOTE, CELL_BAR,
  Y_MARK, Y_OCTAVE_UP, Y_NOTE, Y_BEAM, Y_BEAM2, Y_OCTAVE_DOWN,
} from "./constants";
import { isBeat } from "./parser";
import { flatFirst, flatLast } from "./layout";

export function renderSvgItems(
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
