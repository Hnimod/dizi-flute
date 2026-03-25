import { useEffect, useRef, useState } from "react";
import { formatDuration } from "@/shared/utils";

const dailyPractice = [
  { duration: "10 min", activity: "Long tones & breathing", notes: "Warm up with long sustained notes" },
  { duration: "10 min", activity: "Technique drills", notes: "Scales, tonguing, ornaments" },
  { duration: "10 min", activity: "Song practice", notes: "Work on a song you enjoy" },
];
import { usePracticeStore } from "./store";

export function PracticePage() {
  const isRunning = usePracticeStore((s) => s.isRunning);
  const elapsed = usePracticeStore((s) => s.elapsed);
  const start = usePracticeStore((s) => s.start);
  const pause = usePracticeStore((s) => s.pause);
  const reset = usePracticeStore((s) => s.reset);
  const tick = usePracticeStore((s) => s.tick);
  const saveSession = usePracticeStore((s) => s.saveSession);
  const [notes, setNotes] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => tick(), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tick]);

  const handleSave = () => {
    if (elapsed === 0) return;
    saveSession(notes);
    setNotes("");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Practice Timer</h1>
        <p className="mt-1.5 text-sm text-(--color-text-secondary) md:mt-2 md:text-base">
          Track your daily practice sessions and build consistency.
        </p>
      </div>

      {/* Timer display */}
      <div className="mb-6 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-6 text-center shadow-sm md:mb-8 md:p-8">
        <div className="font-mono text-5xl font-bold tracking-wider md:text-6xl">
          {formatDuration(elapsed)}
        </div>

        <div className="mt-5 flex justify-center gap-3 md:mt-6">
          {!isRunning ? (
            <button
              onClick={start}
              className="min-h-[44px] rounded-xl bg-(--color-accent) px-8 py-2.5 font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.97]"
            >
              {elapsed > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <button
              onClick={pause}
              className="min-h-[44px] rounded-xl border border-(--color-border) px-8 py-2.5 font-medium transition-colors hover:bg-(--color-bg) active:scale-[0.97]"
            >
              Pause
            </button>
          )}
          <button
            onClick={reset}
            className="min-h-[44px] rounded-xl border border-(--color-border) px-6 py-2.5 font-medium transition-colors hover:bg-(--color-bg) active:scale-[0.97]"
          >
            Reset
          </button>
        </div>

        {/* Save session */}
        <div className="mt-6 border-t border-(--color-border) pt-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Session notes (optional)..."
            rows={2}
            className="w-full rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-3 text-sm focus:border-(--color-accent) focus:outline-none"
          />
          <button
            onClick={handleSave}
            disabled={elapsed === 0}
            className="mt-3 min-h-[44px] rounded-xl bg-(--color-accent) px-8 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Save Session
          </button>
        </div>
      </div>

      {/* Daily practice schedule */}
      <div>
        <h2 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">Daily Practice Schedule</h2>
        <div className="space-y-2.5 md:space-y-3">
          {dailyPractice.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-3.5 shadow-sm md:p-4"
            >
              <span className="shrink-0 rounded-lg bg-(--color-accent-light) px-2.5 py-1 text-xs font-medium text-(--color-accent)">
                {item.duration}
              </span>
              <div>
                <p className="font-medium text-sm md:text-base">{item.activity}</p>
                <p className="mt-0.5 text-xs text-(--color-text-secondary) md:text-sm">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
