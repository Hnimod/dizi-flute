import { Link } from "react-router";
import { levels } from "@/data";

export function HomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Learn Dizi Flute</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          A structured self-study course from absolute beginner to advanced level.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/level/${level.id}`}
            className="group rounded-xl border border-[var(--color-border)] p-5 transition-all hover:border-[var(--color-accent)] hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-sm font-bold text-white">
                {level.id}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)]">{level.ccomGrade}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold group-hover:text-[var(--color-accent)]">
              {level.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{level.subtitle}</p>
            <div className="mt-3 text-xs font-medium text-[var(--color-text-secondary)]">
              {level.timeline}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
