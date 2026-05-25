import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DualNotationRenderer, useNotationPreference, buildBeatSchedule, useMetronome } from "@/shared/ui";

interface TempoGuideProps {
  content: string;
  tempo?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  keySignature?: string;
  timeSignature?: string;
  origin?: string;
  abc?: string;
  staffBaseOctave?: number;
  /** Source content for staff rendering (when jianpu shows transposed digits). */
  staffContent?: string;
  staffKey?: string;
  /** Slot rendered below the playback controls — moves with focus/fullscreen. */
  extraControls?: React.ReactNode;
}

export function TempoGuide({ content, tempo, className, style, title, keySignature, timeSignature, origin, abc, staffBaseOctave, staffContent, staffKey, extraControls }: TempoGuideProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [startBeat, setStartBeat] = useState(-1);
  const [bpm, setBpm] = useState(tempo ?? 60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const beatRef = useRef(-1);

  const schedule = useMemo(() => buildBeatSchedule(content), [content]);
  const totalBeats = schedule.length;

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(-1);
    setStartBeat(-1);
    beatRef.current = -1;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleBeatClick = useCallback((beatIndex: number) => {
    if (isPlaying) return;
    setStartBeat(beatIndex);
    setCurrentBeat(beatIndex);
    beatRef.current = beatIndex;
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) return false;
      setCurrentBeat((b) => {
        const start = b >= totalBeats - 1 || b < 0
          ? (startBeat >= 0 ? startBeat : 0)
          : b;
        beatRef.current = start;
        return start;
      });
      return true;
    });
  }, [totalBeats, startBeat]);

  // setTimeout-based beat advancement with duration-aware scheduling
  useEffect(() => {
    if (!isPlaying) return;

    const baseMs = (60 / bpm) * 1000;

    function tick() {
      const beat = beatRef.current;
      if (beat >= totalBeats) {
        setIsPlaying(false);
        setCurrentBeat(-1);
        beatRef.current = -1;
        return;
      }
      setCurrentBeat(beat);
      const duration = baseMs * (schedule[beat] ?? 1);
      timeoutRef.current = setTimeout(() => {
        beatRef.current = beat + 1;
        tick();
      }, duration);
    }

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, bpm, totalBeats, schedule]);

  // Scroll active beat into view
  useEffect(() => {
    if (currentBeat < 0 || !containerRef.current) return;
    const el = containerRef.current.querySelector(`[data-beat="${currentBeat}"]`);
    if (el) {
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [currentBeat]);

  const showStaff = useNotationPreference((s) => s.showStaff);
  const toggleStaff = useNotationPreference((s) => s.toggleStaff);

  const metronome = useMetronome(bpm, timeSignature);

  // Escape exits fullscreen; lock body scroll while open.
  useEffect(() => {
    if (!isFullscreen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsFullscreen(false);
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  const body = (
    <>
      {/* Controls */}
      <div
        className="flex flex-wrap items-center gap-3 rounded-lg px-3 py-2 mb-2 text-sm"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      >
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Stop */}
        <button
          onClick={stop}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-secondary)" }}
          title="Stop"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        </button>

        {/* BPM controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setBpm((b) => Math.max(20, b - 5))}
            className="flex h-6 w-6 items-center justify-center rounded transition-opacity hover:opacity-70"
            style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
          >
            −
          </button>
          <span className="min-w-[4rem] text-center font-medium" style={{ color: "var(--color-text)" }}>
            {bpm} BPM
          </span>
          <button
            onClick={() => setBpm((b) => Math.min(300, b + 5))}
            className="flex h-6 w-6 items-center justify-center rounded transition-opacity hover:opacity-70"
            style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
          >
            +
          </button>
        </div>

        {/* Metronome toggle — clicks at the selected BPM */}
        <button
          onClick={metronome.toggle}
          className="flex h-7 items-center gap-1 rounded-md px-2 transition-opacity hover:opacity-70"
          style={{
            color: metronome.isOn ? "var(--color-accent)" : "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            fontSize: 11,
          }}
          title={metronome.isOn ? "Stop metronome" : "Start metronome at this tempo"}
          aria-pressed={metronome.isOn}
        >
          <svg
            className={`h-4 w-4 ${metronome.isOn ? "metronome-tick" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l3.5 18h-13L9 3z" />
            <path strokeLinecap="round" d="M5 17h14" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l4-7" />
          </svg>
          <span>Metronome</span>
        </button>

        {/* Staff notation toggle */}
        <button
          onClick={toggleStaff}
          className="flex h-7 items-center gap-1 rounded-md px-2 transition-opacity hover:opacity-70"
          style={{
            color: showStaff ? "var(--color-accent)" : "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            fontSize: 11,
          }}
          title={showStaff ? "Hide staff notation" : "Show staff notation"}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M3 6h18M3 10h18M3 14h18M3 18h18" strokeLinecap="round" />
            <ellipse cx="16" cy="8" rx="2.5" ry="2" fill="currentColor" stroke="none" transform="rotate(-15 16 8)" />
          </svg>
          <span>Staff</span>
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={() => setIsFullscreen((v) => !v)}
          className="flex h-7 items-center gap-1 rounded-md px-2 transition-opacity hover:opacity-70"
          style={{
            color: isFullscreen ? "var(--color-accent)" : "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            fontSize: 11,
          }}
          title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen (focus practice)"}
          aria-pressed={isFullscreen}
        >
          {isFullscreen ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v5H4M20 9h-5V4M4 15h5v5M15 20v-5h5" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          )}
          <span>{isFullscreen ? "Exit" : "Focus"}</span>
        </button>

        {/* Beat counter / start indicator */}
        <span className="ml-auto text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {currentBeat >= 0 ? (
            <>{currentBeat + 1} / {totalBeats}</>
          ) : startBeat >= 0 ? (
            <button onClick={() => setStartBeat(-1)} className="hover:opacity-70 transition-opacity">
              from {startBeat + 1} ✕
            </button>
          ) : null}
        </span>
      </div>

      {extraControls && <div className="mb-2">{extraControls}</div>}

      {/* Notation with highlight */}
      <div ref={containerRef}>
        {content.trim() ? (
        <DualNotationRenderer
          content={content}
          abc={abc}
          activeBeatIndex={currentBeat >= 0 ? currentBeat : undefined}
          beatDurationMs={isPlaying && currentBeat >= 0 ? (60 / bpm) * 1000 * (schedule[currentBeat] ?? 1) : undefined}
          startBeatIndex={startBeat >= 0 && currentBeat < 0 ? startBeat : undefined}
          onBeatClick={handleBeatClick}
          className={className}
          style={style}
          title={title}
          keySignature={keySignature}
          timeSignature={timeSignature}
          tempo={tempo}
          origin={origin}
          staffBaseOctave={staffBaseOctave}
          staffContent={staffContent}
          staffKey={staffKey}
        />
        ) : (
          <div
            className="rounded-lg p-6 text-center text-sm"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text-secondary)",
              border: "1px dashed var(--color-border)",
            }}
          >
            Notation not available yet.
          </div>
        )}
      </div>
    </>
  );

  if (isFullscreen) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: "var(--color-bg)" }}
        role="dialog"
        aria-modal="true"
        aria-label={title ? `${title} — focus practice` : "Focus practice"}
      >
        {title && (
          <div
            className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-2"
            style={{ borderColor: "var(--color-border)" }}
          >
            <h2 className="truncate text-sm font-semibold md:text-base" style={{ color: "var(--color-text)" }}>
              {title}
            </h2>
            <button
              onClick={() => setIsFullscreen(false)}
              className="shrink-0 rounded-md p-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-text-secondary)" }}
              title="Exit fullscreen (Esc)"
              aria-label="Exit fullscreen"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-5xl">{body}</div>
        </div>
      </div>,
      document.body,
    );
  }

  return <div>{body}</div>;
}
