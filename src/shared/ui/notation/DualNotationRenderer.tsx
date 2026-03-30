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

  // Track container width for VexFlow rendering
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

  const renderBeforeLine = useCallback(
    (_lineIdx: number, items: LayoutItem[], maxWidth: number) => {
      if (containerWidth <= 0) return null;
      return (
        <VexFlowStaffLine
          items={items}
          maxWidth={maxWidth}
          keySignature={keySignature || "C"}
          containerWidth={containerWidth}
        />
      );
    },
    [keySignature, containerWidth],
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
        {...jianpuProps}
      />
    </div>
  );
}
