import { useEffect, useRef, useState } from "react";
import { course } from "@/data";
import { formatDuration } from "@/shared/utils";
import { usePracticeStore } from "./store";

export function PracticePage() {
  const { isRunning, elapsed, start, pause, reset, tick, saveSession } =
    usePracticeStore();
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Practice Timer</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Track your daily practice sessions and build consistency.
        </p>
      </div>

      {/* Timer display */}
      <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
        <div className="font-mono text-6xl font-bold tracking-wider">
          {formatDuration(elapsed)}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {!isRunning ? (
            <button
              onClick={start}
              className="rounded-lg bg-[var(--color-accent)] px-6 py-2 font-medium text-white transition-opacity hover:opacity-90"
            >
              {elapsed > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <button
              onClick={pause}
              className="rounded-lg border border-[var(--color-border)] px-6 py-2 font-medium transition-colors hover:bg-[var(--color-bg-secondary)]"
            >
              Pause
            </button>
          )}
          <button
            onClick={reset}
            className="rounded-lg border border-[var(--color-border)] px-6 py-2 font-medium transition-colors hover:bg-[var(--color-bg-secondary)]"
          >
            Reset
          </button>
        </div>

        {/* Save session */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Session notes (optional)..."
            rows={2}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm focus:border-[var(--color-accent)] focus:outline-none"
          />
          <button
            onClick={handleSave}
            disabled={elapsed === 0}
            className="mt-3 rounded-lg bg-[var(--color-accent)] px-6 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Save Session
          </button>
        </div>
      </div>

      {/* Daily practice schedule */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Daily Practice Schedule</h2>
        <div className="space-y-3">
          {course.dailyPractice.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-4"
            >
              <span className="shrink-0 rounded bg-[var(--color-accent-light)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]">
                {item.duration}
              </span>
              <div>
                <p className="font-medium">{item.activity}</p>
                <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
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
