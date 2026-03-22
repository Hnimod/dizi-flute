import { formatDuration } from "@/shared/utils";
import { usePracticeStore } from "./store";

export function PracticeLogPage() {
  const sessions = usePracticeStore((s) => s.sessions);
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const totalSeconds = sessions.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Practice Log</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Your practice history and total time invested.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Total Practice Time
        </p>
        <p className="mt-1 text-3xl font-bold">{formatDuration(totalSeconds)}</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          across {sessions.length} session{sessions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Session list */}
      {sorted.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] p-8 text-center">
          <p className="text-lg font-medium">No sessions yet</p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Start your first practice session and it will appear here. Every
            journey begins with a single breath.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((session) => (
            <div
              key={session.id}
              className="rounded-lg border border-[var(--color-border)] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {new Date(session.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="rounded bg-[var(--color-accent-light)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]">
                  {formatDuration(session.duration)}
                </span>
              </div>
              {session.notes && (
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {session.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
