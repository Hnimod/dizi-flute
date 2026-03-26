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
};

// Map symbol names to technique page info
const SYMBOL_TECHNIQUE: Record<string, { id: string; name: string; description: string }> = {
  fork: { id: "fork-fingering", name: "叉口 Fork Fingering", description: "Alternate fingering for different tone color" },
  die: { id: "die-yin", name: "叠音 Stacked Grace", description: "Quick grace from one hole above, finger only" },
  da: { id: "da-yin", name: "打音 Struck Grace", description: "Quick strike from one hole below, finger only" },
  zeng: { id: "zeng-yin", name: "赠音 Trailing Note", description: "Trailing gift note at end of held note" },
  bo: { id: "bo-yin", name: "波音 Mordent", description: "Single rapid upper-neighbor flick" },
  vibrato: { id: "vibrato", name: "气震音 Breath Vibrato", description: "Pulse diaphragm to make notes shimmer" },
  flutter: { id: "flutter-tongue", name: "花舌 Flutter Tongue", description: "Roll tongue while playing" },
  "slide-up": { id: "slides", name: "上滑音 Slide Up", description: "Glide pitch upward into note" },
  "slide-down": { id: "slides", name: "下滑音 Slide Down", description: "Glide pitch downward" },
  single: { id: "tonguing", name: "吐音 Single Tonguing", description: "Crisp tongue attack — say 'tu'" },
  double: { id: "double-tonguing", name: "双吐 Double Tonguing", description: "Alternating tu-ku for fast passages" },
  triple: { id: "triple-tonguing", name: "三吐 Triple Tonguing", description: "Tu-tu-ku pattern for triplets" },
  tie: { id: "long-tones", name: "连音线 Tie", description: "Hold the note continuously — don't re-tongue the second note" },
  slur: { id: "long-tones", name: "圆滑线 Slur", description: "Play all notes smoothly in one breath without re-tonguing" },
  repeatStart: { id: "rhythm-reading", name: "反复记号 Repeat Start", description: "Play from here, then go back and repeat when you reach the repeat end" },
  repeatEnd: { id: "rhythm-reading", name: "反复记号 Repeat End", description: "Go back to the repeat start and play the section again" },
  volta1: { id: "rhythm-reading", name: "第一房子 1st Ending", description: "Play this ending the first time through the repeat" },
  volta2: { id: "rhythm-reading", name: "第二房子 2nd Ending", description: "Play this ending the second time — skip the 1st ending" },
  volta3: { id: "rhythm-reading", name: "第三房子 3rd Ending", description: "Play this ending the third time through" },
};

function ornamentDisplay(name: string): { text: string; isChar: boolean } {
  const char = ORNAMENT_CHARS[name];
  if (!char) return { text: name, isChar: false };
  return { text: char, isChar: true };
}

function renderVibratoWave(x: number, y: number, key: string, opts?: InteractiveOpts): React.ReactNode {
  const w = 5;
  const info = SYMBOL_TECHNIQUE["vibrato"];
  const hoverEnter = opts?.onSymbolHover && info
    ? (e: React.MouseEvent) => opts.onSymbolHover!(e, info)
    : undefined;
  const hoverLeave = opts?.onSymbolLeave;
  return (
    <g key={key} style={hoverEnter ? { cursor: "help" } : undefined} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
      <rect x={x - w} y={y - 4} width={w * 2} height={8} fill="transparent" />
      <path
        d={`M ${x - w} ${y} q ${w * 0.33} -3 ${w * 0.66} 0 q ${w * 0.33} 3 ${w * 0.66} 0 q ${w * 0.33} -3 ${w * 0.66} 0`}
        fill="none"
        stroke="var(--color-text)"
        strokeWidth="1.2"
      />
    </g>
  );
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
        const tInfo = SYMBOL_TECHNIQUE[item.token.technique];
        const tHover = opts?.onSymbolHover && tInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, tInfo) : undefined;
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
            style={tHover ? { cursor: "help" } : undefined}
            onMouseEnter={tHover}
            onMouseLeave={opts?.onSymbolLeave}
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
      } else if (item.token.name === "vibrato") {
        elements.push(renderVibratoWave(targetX, Y_MARK, key, opts));
      } else {
        const { text: ornText, isChar } = ornamentDisplay(item.token.name);
        const oInfo = SYMBOL_TECHNIQUE[item.token.name];
        const oHover = opts?.onSymbolHover && oInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, oInfo) : undefined;
        elements.push(
          <text
            key={key}
            x={targetX}
            y={Y_MARK}
            textAnchor="middle"
            fontSize={isChar ? 10 : 8}
            fontStyle={isChar ? "normal" : "italic"}
            fontWeight={isChar ? "700" : undefined}
            fontFamily="sans-serif"
            fill="var(--color-text-secondary)"
            style={oHover ? { cursor: "help" } : undefined}
            onMouseEnter={oHover}
            onMouseLeave={opts?.onSymbolLeave}
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
        const slurInfo = SYMBOL_TECHNIQUE["slur"];
        const slurHover = opts?.onSymbolHover && slurInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, slurInfo) : undefined;
        const slurD = `M ${sx} ${Y_OCTAVE_UP - 4} Q ${midX} ${Y_OCTAVE_UP - 4 - arcHeight} ${ex} ${Y_OCTAVE_UP - 4}`;
        elements.push(
          <g key={`${key}-arc`} style={slurHover ? { cursor: "help" } : undefined} onMouseEnter={slurHover} onMouseLeave={opts?.onSymbolLeave}>
            <path d={slurD} fill="none" stroke="transparent" strokeWidth="6" />
            <path d={slurD} fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.2" />
          </g>,
        );
      }
    } else if (item.groupType === "beam" && item.children) {
      // Render children
      renderSvgItems(item.children, activeBeatIndex, elements, `${key}-b`, opts);
      // Draw beam line
      const first = item.children.find(c => isBeat(c.token));
      const last = [...item.children].reverse().find(c => isBeat(c.token));
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
          if (child && !isBeat(child.token)) continue; // skip annotations
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
        renderVoltaBracket(currentVolta, item.x, elements, keyPrefix, true, currentVolta.continuation, opts);
      }
      const nextItem = items[idx + 1];
      const startX = nextItem ? nextItem.x : item.x;
      currentVolta = { ending: item.token.ending, startX, continuation: false };
    } else if (item.token.type === "bar" && (item.token.value === ":|" || item.token.value === "||")) {
      if (currentVolta) {
        renderVoltaBracket(currentVolta, item.x, elements, keyPrefix, true, currentVolta.continuation, opts);
        currentVolta = null;
      }
    }
  }
  // Close volta at end of line if still open (no right edge — continues next line)
  if (currentVolta && items.length > 0) {
    const last = items[items.length - 1]!;
    renderVoltaBracket(currentVolta, last.x + last.width / 2, elements, keyPrefix, false, currentVolta.continuation, opts);
  }
  // Post-pass: render tie arcs (~( ... ~))
  // Flatten all items including beam/slur children for tie lookups
  function flattenItems(list: LayoutItem[]): LayoutItem[] {
    const flat: LayoutItem[] = [];
    for (const it of list) {
      flat.push(it);
      if (it.children) flat.push(...flattenItems(it.children));
    }
    return flat;
  }
  const allFlat = flattenItems(items);
  let tieStartX: number | null = null;
  for (let fi = 0; fi < allFlat.length; fi++) {
    const it = allFlat[fi]!;
    if (it.token.type === "tie-start") {
      // Find next beat after this marker
      for (let j = fi + 1; j < allFlat.length; j++) {
        if (isBeat(allFlat[j]!.token)) { tieStartX = allFlat[j]!.x; break; }
      }
    } else if (it.token.type === "tie-end" && tieStartX !== null) {
      // Find previous beat before this marker
      let tieEndX = tieStartX;
      for (let j = fi - 1; j >= 0; j--) {
        if (isBeat(allFlat[j]!.token)) { tieEndX = allFlat[j]!.x; break; }
      }
      const midX = (tieStartX + tieEndX) / 2;
      const tieInfo = SYMBOL_TECHNIQUE["tie"];
      const tieHover = opts?.onSymbolHover && tieInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, tieInfo) : undefined;
      const arcD = `M ${tieStartX} ${Y_NOTE - 12} Q ${midX} ${Y_NOTE - 20} ${tieEndX} ${Y_NOTE - 12}`;
      elements.push(
        <g key={`${keyPrefix}-tie-${tieStartX}`} style={tieHover ? { cursor: "help" } : undefined} onMouseEnter={tieHover} onMouseLeave={opts?.onSymbolLeave}>
          <path d={arcD} fill="none" stroke="transparent" strokeWidth="6" />
          <path d={arcD} fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.2" />
        </g>,
      );
      tieStartX = null;
    }
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
  opts?: InteractiveOpts,
) {
  const y = Y_VOLTA;
  const vKey = `volta${volta.ending}` as keyof typeof SYMBOL_TECHNIQUE;
  const vInfo = SYMBOL_TECHNIQUE[vKey] ?? SYMBOL_TECHNIQUE["volta1"];
  const vHover = opts?.onSymbolHover && vInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, vInfo) : undefined;
  elements.push(
    <g
      key={`${keyPrefix}-volta-${volta.ending}-${volta.startX}-${continuation ? "cont" : "start"}`}
      style={vHover ? { cursor: "help" } : undefined}
      onMouseEnter={vHover}
      onMouseLeave={opts?.onSymbolLeave}
    >
      <rect x={volta.startX} y={y - 2} width={endX - volta.startX} height={10} fill="transparent" />
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
        const rsInfo = SYMBOL_TECHNIQUE["repeatStart"];
        const rsHover = opts?.onSymbolHover && rsInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, rsInfo) : undefined;
        elements.push(
          <g key={key} style={rsHover ? { cursor: "help" } : undefined} onMouseEnter={rsHover} onMouseLeave={opts?.onSymbolLeave}>
            <rect x={x - 5} y={Y_NOTE - 12} width={12} height={18} fill="transparent" />
            <line x1={x - 3} y1={Y_NOTE - 12} x2={x - 3} y2={Y_NOTE + 4} stroke="var(--color-text)" strokeWidth="2.5" />
            <line x1={x + 2} y1={Y_NOTE - 12} x2={x + 2} y2={Y_NOTE + 4} stroke="var(--color-text-secondary)" strokeWidth="1" />
            <circle cx={x + 5} cy={Y_NOTE - 5} r={1.3} fill="var(--color-text)" />
            <circle cx={x + 5} cy={Y_NOTE + 1} r={1.3} fill="var(--color-text)" />
          </g>,
        );
      } else if (isRepeatEnd) {
        const reInfo = SYMBOL_TECHNIQUE["repeatEnd"];
        const reHover = opts?.onSymbolHover && reInfo ? (e: React.MouseEvent) => opts.onSymbolHover!(e, reInfo) : undefined;
        elements.push(
          <g key={key} style={reHover ? { cursor: "help" } : undefined} onMouseEnter={reHover} onMouseLeave={opts?.onSymbolLeave}>
            <rect x={x - 7} y={Y_NOTE - 12} width={12} height={18} fill="transparent" />
            <circle cx={x - 5} cy={Y_NOTE - 5} r={1.3} fill="var(--color-text)" />
            <circle cx={x - 5} cy={Y_NOTE + 1} r={1.3} fill="var(--color-text)" />
            <line x1={x - 2} y1={Y_NOTE - 12} x2={x - 2} y2={Y_NOTE + 4} stroke="var(--color-text-secondary)" strokeWidth="1" />
            <line x1={x + 3} y1={Y_NOTE - 12} x2={x + 3} y2={Y_NOTE + 4} stroke="var(--color-text)" strokeWidth="2.5" />
          </g>,
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
      // Handled in renderSvgItems main loop
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
    case "tonguing": {
      const tInfo2 = SYMBOL_TECHNIQUE[token.technique];
      const tHover2 = opts?.onSymbolHover && tInfo2 ? (e: React.MouseEvent) => opts.onSymbolHover!(e, tInfo2) : undefined;
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
          style={tHover2 ? { cursor: "help" } : undefined}
          onMouseEnter={tHover2}
          onMouseLeave={opts?.onSymbolLeave}
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
    }
    case "ornament": {
      if (token.name === "vibrato") {
        elements.push(renderVibratoWave(x + CELL_NOTE / 2, Y_MARK, key, opts));
        break;
      }
      const { text: ornText2, isChar: isChar2 } = ornamentDisplay(token.name);
      const oInfo2 = SYMBOL_TECHNIQUE[token.name];
      const oHover2 = opts?.onSymbolHover && oInfo2 ? (e: React.MouseEvent) => opts.onSymbolHover!(e, oInfo2) : undefined;
      elements.push(
        <text
          key={key}
          x={x + CELL_NOTE / 2}
          y={Y_MARK}
          textAnchor="middle"
          fontSize={isChar2 ? 10 : 8}
          fontStyle={isChar2 ? "normal" : "italic"}
          fontWeight={isChar2 ? "700" : undefined}
          fontFamily="sans-serif"
          fill="var(--color-text-secondary)"
          style={oHover2 ? { cursor: "help" } : undefined}
          onMouseEnter={oHover2}
          onMouseLeave={opts?.onSymbolLeave}
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
