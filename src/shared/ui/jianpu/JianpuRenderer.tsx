import { useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { JianpuRendererProps, InteractiveOpts, LayoutItem } from "./types";
import { Y_MARK, Y_NOTE, LINE_HEIGHT } from "./constants";
import { parseToken } from "./parser";
import { layoutLine, findActiveBeat } from "./layout";
import { renderSvgItems } from "./svg-renderer";

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
            viewBox={`0 -8 ${maxWidth} ${LINE_HEIGHT + 8}`}
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
