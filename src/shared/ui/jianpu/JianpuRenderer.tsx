import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Token, JianpuRendererProps, InteractiveOpts, LayoutItem } from "./types";
import { Y_MARK, Y_NOTE, LINE_HEIGHT } from "./constants";
import { parseToken, normalizeBeamDurations } from "./parser";
import { layoutLine, findActiveBeat } from "./layout";
import { renderSvgItems } from "./svg-renderer";
import { buildNoteTooltip } from "./tooltip";
import type { NoteTooltipLink } from "./tooltip";

function applyXOverrides(items: LayoutItem[], overrides: Map<number, number>): void {
  // First pass: apply direct overrides to beat items and bars
  let barSeq = 0;
  for (const item of items) {
    // Beat items (notes, rests, holds)
    if (item.beatIndex !== null && overrides.has(item.beatIndex)) {
      item.x = overrides.get(item.beatIndex)!;
    }
    // Bar items: match by sequence using negative keys -(barSeq+1)
    if (item.token.type === "bar") {
      const barKey = -(barSeq + 1);
      if (overrides.has(barKey)) {
        item.x = overrides.get(barKey)!;
      }
      barSeq++;
    }
    // Recurse into groups
    if (item.children) {
      applyXOverrides(item.children, overrides);
      if (item.children.length > 0) {
        const minX = Math.min(...item.children.map(c => c.x - c.width / 2));
        const maxX = Math.max(...item.children.map(c => c.x + c.width / 2));
        item.x = (minX + maxX) / 2;
        item.width = maxX - minX;
      }
    }
  }

  // Helper: check if an item was directly overridden
  const isOverridden = (it: LayoutItem) =>
    (it.beatIndex !== null && overrides.has(it.beatIndex)) ||
    it.token.type === "bar" ||
    (it.children && it.children.length > 0);

  // Second pass: interpolate remaining non-overridden items (holds, breaths, ties)
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    if (isOverridden(item)) continue;

    // Find nearest overridden neighbor to left and right
    let leftItem: LayoutItem | null = null;
    for (let j = i - 1; j >= 0; j--) {
      if (isOverridden(items[j]!)) { leftItem = items[j]!; break; }
    }
    let rightItem: LayoutItem | null = null;
    for (let j = i + 1; j < items.length; j++) {
      if (isOverridden(items[j]!)) { rightItem = items[j]!; break; }
    }

    if (leftItem && rightItem) {
      const leftIdx = items.indexOf(leftItem);
      const rightIdx = items.indexOf(rightItem);
      const t = (i - leftIdx) / (rightIdx - leftIdx);
      item.x = leftItem.x + t * (rightItem.x - leftItem.x);
    } else if (leftItem) {
      item.x = leftItem.x + item.width;
    } else if (rightItem) {
      item.x = rightItem.x - item.width;
    }
  }
}

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
  origin,
  renderBeforeLine,
  viewBoxPadLeft = 0,
  xOverrides,
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
      const rawTokens = normalizeBeamDurations(trimmed.split(/\s+/).map(parseToken));
      const result = { ...layoutLine(rawTokens, beatCounter, tokenIdxOffset), isEmpty: false };
      tokenIdxOffset += rawTokens.length + 1; // +1 for the implicit \n between lines
      return result;
    });

  // Apply x-position overrides from staff alignment
  if (xOverrides && xOverrides.size > 0) {
    for (const layout of lineLayouts) {
      if (layout.isEmpty) continue;
      applyXOverrides(layout.items, xOverrides);
    }
  }

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

  // Tooltip state
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; links: NoteTooltipLink[] } | null>(null);
  const [symbolTip, setSymbolTip] = useState<{ x: number; y: number; name: string; id: string; description: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tipHideRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleNoteHover = useCallback((token: Token, event: React.MouseEvent, annotations: string[]) => {
    if (tipHideRef.current) clearTimeout(tipHideRef.current);
    const result = buildNoteTooltip(token, annotations);
    if (!result) return;
    const rect = (event.target as Element).getBoundingClientRect();
    setTooltip({ text: result.text, x: rect.left + rect.width / 2, y: rect.top, links: result.links });
    setSymbolTip(null);
  }, []);

  const handleNoteLeave = useCallback(() => {
    tipHideRef.current = setTimeout(() => setTooltip(null), 200);
  }, []);

  const handleSymbolHover = useCallback((event: React.MouseEvent, info: { name: string; id: string; description: string }) => {
    if (tipHideRef.current) clearTimeout(tipHideRef.current);
    const rect = (event.target as Element).getBoundingClientRect();
    setSymbolTip({ x: rect.left + rect.width / 2, y: rect.top, ...info });
    setTooltip(null);
  }, []);

  const handleSymbolLeave = useCallback(() => {
    tipHideRef.current = setTimeout(() => setSymbolTip(null), 200);
  }, []);

  const handleTipEnter = useCallback(() => {
    if (tipHideRef.current) clearTimeout(tipHideRef.current);
  }, []);

  const handleTipLeave = useCallback(() => {
    setTooltip(null);
    setSymbolTip(null);
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ ...style, position: "relative" }}>
      {hasHeader && (
        <div className="jianpu-header" style={{ marginBottom: 8 }}>
          {title && (
            <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 2 }}>
              {title}
            </div>
          )}
          {origin && (
            <div style={{ textAlign: "center", fontSize: 11, opacity: 0.6, marginBottom: 6 }}>
              {origin}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: 12 }}>
            <div>
              {(keySignature || timeSignature) && (
                <div>
                  {keySignature && <span>1={keySignature}</span>}
                  {keySignature && timeSignature && "  "}
                  {timeSignature && <span>{timeSignature}</span>}
                </div>
              )}
              {tempo && <div style={{ opacity: 0.7 }}>♩={tempo}</div>}
            </div>
          </div>
        </div>
      )}

      {(() => {
        let openVolta: { ending: number } | null = null;
        return lineLayouts.map((layout, lineIdx) => {
        if (layout.isEmpty) {
          return <div key={lineIdx} className="h-2" />;
        }

        const svgElements: React.ReactNode[] = [];
        const interOpts: InteractiveOpts = {
          interactive, selectedTokenIdx, onTokenClick, onGapClick, onBeatClick,
          lineYOffset: lineIdx * LINE_HEIGHT,
          onNoteHover: handleNoteHover,
          onNoteLeave: handleNoteLeave,
          onSymbolHover: handleSymbolHover,
          onSymbolLeave: handleSymbolLeave,
        };
        const voltaResult = renderSvgItems(layout.items, activeBeatIndex, svgElements, `L${lineIdx}`, interOpts, openVolta);
        openVolta = voltaResult.openVolta;

        // Per-line highlight
        const activeItem = findActiveBeat(layout.items, activeBeatIndex);
        const hlX = activeItem ? activeItem.x - activeItem.width / 2 + 1 : 0;
        const hlW = activeItem ? activeItem.width - 2 : 0;
        const lineEndX = lineEndXMap.get(lineIdx) ?? maxWidth;

        // Start marker
        const startItem = startBeatIndex !== undefined ? findActiveBeat(layout.items, startBeatIndex) : undefined;

        const vbWidth = maxWidth + viewBoxPadLeft;
        return (
          <div key={lineIdx}>
            {renderBeforeLine?.(lineIdx, layout.items, maxWidth)}
          <svg
            viewBox={`0 -8 ${vbWidth} ${LINE_HEIGHT + 8}`}
            width="100%"
            preserveAspectRatio="xMinYMid meet"
            style={{ display: "block" }}
            className="jianpu-svg"
          >
            <g transform={viewBoxPadLeft ? `translate(${viewBoxPadLeft}, 0)` : undefined}>
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
            </g>
          </svg>
          </div>
        );
      });
      })()}

      {/* Note tooltip */}
      {tooltip && (
        <div
          onMouseEnter={handleTipEnter}
          onMouseLeave={handleTipLeave}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            transform: `translate(${tooltip.x}px, ${tooltip.y - 10}px)`,
            zIndex: 50,
          }}
        >
          <div
            style={{
              transform: "translate(-50%, -100%)",
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 12,
              lineHeight: 1.5,
              color: "var(--color-text)",
              whiteSpace: "pre-line",
              maxWidth: 280,
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            }}
          >
            {tooltip.text}
            {tooltip.links.length > 0 && (
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid var(--color-border)", display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
                {tooltip.links.map((link) => (
                  <a
                    key={link.id}
                    href={`/${link.type === "technique" ? "techniques" : "knowledge"}/${link.id}`}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--color-accent)",
                      textDecoration: "none",
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {link.label} &rarr;
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Technique symbol tooltip */}
      {symbolTip && (
        <div
          onMouseEnter={handleTipEnter}
          onMouseLeave={handleTipLeave}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            transform: `translate(${symbolTip.x}px, ${symbolTip.y - 10}px)`,
            zIndex: 50,
          }}
        >
          <div
            style={{
              transform: "translate(-50%, -100%)",
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "10px 14px",
              maxWidth: 260,
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
              {symbolTip.name}
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.5, color: "var(--color-text-secondary)", marginBottom: 8 }}>
              {symbolTip.description}
            </div>
            <a
              href={`/techniques/${symbolTip.id}`}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-accent)",
                textDecoration: "none",
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              Learn more &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
