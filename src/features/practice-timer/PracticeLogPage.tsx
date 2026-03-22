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
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Practice Log</h1>
        <p className="mt-1.5 text-sm text-(--color-text-secondary) md:mt-2 md:text-base">
          Your practice history and total time invested.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-5 text-center shadow-sm md:mb-8 md:p-6">
        <p className="text-sm text-(--color-text-secondary)">
          Total Practice Time
        </p>
        <p className="mt-1 text-2xl font-bold md:text-3xl">{formatDuration(totalSeconds)}</p>
        <p className="mt-1 text-sm text-(--color-text-secondary)">
          across {sessions.length} session{sessions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Session list */}
      {sorted.length === 0 ? (
        <div className="rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-8 text-center shadow-sm">
          <p className="text-base font-medium md:text-lg">No sessions yet</p>
          <p className="mt-2 text-sm text-(--color-text-secondary)">
            Start your first practice session and it will appear here. Every
            journey begins with a single breath.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 md:space-y-3">
          {sorted.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-3.5 shadow-sm md:p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-(--color-text-secondary)">
                  {new Date(session.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="rounded-lg bg-(--color-accent-light) px-2.5 py-1 text-xs font-medium text-(--color-accent)">
                  {formatDuration(session.duration)}
                </span>
              </div>
              {session.notes && (
                <p className="mt-2 text-sm text-(--color-text-secondary)">
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
