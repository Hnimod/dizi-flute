import { Link } from "react-router";
import { levels } from "@/data";
import { useProgressStore } from "@/features/progress-tracking";

export function HomePage() {
  // Destructure completedItems so the component re-renders when progress changes
  const { getCompletedCount, completedItems: _completedItems } = useProgressStore();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Learn Dizi Flute</h1>
        <p className="mt-2 text-(--color-text-secondary)">
          A structured self-study course from absolute beginner to advanced level.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {levels.map((level) => {
          const totalItems = level.sections.flatMap((s) => s.items).length;
          const completedCount = getCompletedCount(level.id);
          const isComplete = totalItems > 0 && completedCount >= totalItems;
          const percent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

          return (
            <Link
              key={level.id}
              to={`/level/${level.id}`}
              className="group rounded-xl border border-(--color-border) p-5 transition-all hover:border-(--color-accent) hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-accent) text-sm font-bold text-white">
                  {level.id}
                </span>
                <span className="text-xs text-(--color-text-secondary)">
                  {level.ccomGrade}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold group-hover:text-(--color-accent)">
                {level.title}
              </h2>
              <p className="mt-1 text-sm text-(--color-text-secondary)">{level.subtitle}</p>
              <div className="mt-3 text-xs font-medium text-(--color-text-secondary)">
                {level.timeline}
              </div>
              {totalItems > 0 && (
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-border)">
                    <div
                      className="h-full rounded-full bg-(--color-accent) transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-(--color-text-secondary)">
                      {completedCount} / {totalItems}
                    </span>
                    {isComplete && (
                      <span className="rounded-full bg-(--color-accent) px-2 py-0.5 text-[10px] font-semibold text-white">
                        Complete
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
