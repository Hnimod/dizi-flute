import { Link } from "react-router";
import { motion } from "framer-motion";
import { levels } from "@/data";
import { useProgressStore } from "@/features/progress-tracking";

export function HomePage() {
  const completedItems = useProgressStore((s) => s.completedItems);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Learn Dizi Flute</h1>
        <p className="mt-1.5 text-sm text-(--color-text-secondary) md:mt-2 md:text-base">
          A structured self-study course from absolute beginner to advanced level.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
        {levels.map((level) => {
          const totalItems = level.sections.flatMap((s) => s.items).length;
          const completedCount = Object.entries(completedItems).filter(
            ([key, done]) => done && key.startsWith(`level-${level.id}-`),
          ).length;
          const isComplete = totalItems > 0 && completedCount >= totalItems;
          const percent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: level.id * 0.05, ease: "easeOut" }}
            >
            <Link
              to={`/level/${level.id}`}
              className="group block rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-4 shadow-sm transition-all hover:border-(--color-accent) hover:shadow-md active:scale-[0.98] md:p-5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-accent) text-sm font-bold text-white">
                  {level.id}
                </span>
                <span className="text-xs text-(--color-text-secondary)">
                  {level.ccomGrade}
                </span>
              </div>
              <h2 className="mt-3 text-base font-semibold group-hover:text-(--color-accent) md:text-lg">
                {level.title}
              </h2>
              <p className="mt-1 text-sm text-(--color-text-secondary) leading-snug">{level.subtitle}</p>
              <div className="mt-2.5 text-xs font-medium text-(--color-text-secondary)">
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
