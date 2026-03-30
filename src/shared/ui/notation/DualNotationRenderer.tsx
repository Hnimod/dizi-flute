import { useCallback, useEffect, useRef, useState } from "react";
import { JianpuRenderer } from "../jianpu/JianpuRenderer";
import { VexFlowStaffLine } from "../staff/vexflow-staff";
import { useNotationPreference } from "./useNotationPreference";
import type { JianpuRendererProps, LayoutItem } from "../jianpu/types";
import "../staff/staff.css";

interface DualNotationRendererProps extends JianpuRendererProps {
  abc?: string;
}

export function DualNotationRenderer({
  abc: _manualAbc,
  content,
  keySignature,
  timeSignature,
  tempo,
  ...jianpuProps
}: DualNotationRendererProps) {
  const showStaff = useNotationPreference((s) => s.showStaff);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // xOverrides: beatIndex → SVG viewBox x coordinate
  const [xOverrides, setXOverrides] = useState<Map<number, number> | undefined>();
  const maxWidthRef = useRef(0);
  const positionsCollected = useRef(false);

  useEffect(() => {
    if (!showStaff || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.clientWidth);
    return () => observer.disconnect();
  }, [showStaff]);

  // Reset positions when content/key/time changes
  useEffect(() => {
    positionsCollected.current = false;
    setXOverrides(undefined);
  }, [content, keySignature, timeSignature, containerWidth]);

  // Collect note positions from VexFlow — called from useEffect in VexFlowStaffLine
  // Only applies overrides once to avoid infinite loop
  const allPositions = useRef(new Map<number, number>());
  const noteStartXRef = useRef(0);
  const noteEndXRef = useRef(0);

  const handleNotePositions = useCallback(
    (positions: Map<number, number>, noteStartX: number, noteEndX: number) => {
      if (positionsCollected.current) return;

      for (const [beatIdx, xPx] of positions) {
        allPositions.current.set(beatIdx, xPx);
      }
      noteStartXRef.current = noteStartX;
      noteEndXRef.current = noteEndX;
    },
    [],
  );

  // After first render with VexFlow, apply collected positions
  useEffect(() => {
    if (!showStaff || positionsCollected.current || allPositions.current.size === 0) return;
    const mw = maxWidthRef.current;
    if (containerWidth <= 0 || mw <= 0) return;

    // Schedule override application after VexFlow has rendered
    const timer = setTimeout(() => {
      const overrides = new Map<number, number>();
      // Direct pixel-to-SVG mapping: containerWidth px = maxWidth SVG units
      for (const [beatIdx, xPx] of allPositions.current) {
        overrides.set(beatIdx, xPx * (mw / containerWidth));
      }
      positionsCollected.current = true;
      setXOverrides(overrides);
    }, 50);
    return () => clearTimeout(timer);
  });

  const renderBeforeLine = useCallback(
    (lineIdx: number, items: LayoutItem[], maxWidth: number) => {
      if (containerWidth <= 0) return null;
      maxWidthRef.current = maxWidth;
      return (
        <VexFlowStaffLine
          items={items}
          maxWidth={maxWidth}
          keySignature={keySignature || "C"}
          timeSignature={timeSignature}
          containerWidth={containerWidth}
          showJianpu={false}
          lineIndex={lineIdx}
          onNotePositions={handleNotePositions}
        />
      );
    },
    [keySignature, timeSignature, containerWidth, handleNotePositions],
  );

  return (
    <div ref={containerRef}>
      <JianpuRenderer
        content={content}
        keySignature={keySignature}
        timeSignature={timeSignature}
        tempo={tempo}
        renderBeforeLine={showStaff && containerWidth > 0 ? renderBeforeLine : undefined}
        viewBoxPadLeft={0}
        xOverrides={xOverrides}
        {...jianpuProps}
      />
    </div>
  );
}
