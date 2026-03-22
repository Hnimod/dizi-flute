import { NavLink } from "react-router";
import { levels } from "@/data";
import { useProgressStore } from "@/features/progress-tracking";

export function Sidebar() {
  const completedItems = useProgressStore((s) => s.completedItems);

  return (
    <nav className="flex h-full flex-col overflow-y-auto">
      <div className="border-b border-(--color-border) p-4">
        <NavLink to="/" className="text-lg font-bold text-(--color-accent)">
          Dizi Flute Course
        </NavLink>
      </div>

      <div className="flex-1 p-3">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-(--color-text-secondary)">
          Levels
        </p>
        <ul className="space-y-0.5">
          {levels.map((level) => {
            const totalItems = level.sections.flatMap((s) => s.items).length;
            const completed = Object.entries(completedItems).filter(
              ([key, done]) => done && key.startsWith(`level-${level.id}-`),
            ).length;

            return (
              <li key={level.id}>
                <NavLink
                  to={`/level/${level.id}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-(--color-accent) text-white shadow-sm"
                        : "hover:bg-(--color-bg)"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${isActive ? "bg-white/20 text-white" : "bg-(--color-bg) text-(--color-text-secondary)"}`}>
                        {level.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{level.title}</div>
                        <div className={`text-[11px] ${isActive ? "text-white/70" : "text-(--color-text-secondary)"}`}>{level.timeline}</div>
                      </div>
                      {totalItems > 0 && (
                        <span className={`shrink-0 text-[10px] tabular-nums ${isActive ? "text-white/70" : "text-(--color-text-secondary)"}`}>
                          {completed === totalItems ? "✓" : `${completed}/${totalItems}`}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <p className="mb-2 mt-6 px-2 text-[11px] font-semibold uppercase tracking-wider text-(--color-text-secondary)">
          Practice
        </p>
        <ul className="space-y-0.5">
          <li>
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-(--color-accent) text-white shadow-sm"
                    : "hover:bg-(--color-bg)"
                }`
              }
            >
              Practice Timer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/practice-log"
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-(--color-accent) text-white shadow-sm"
                    : "hover:bg-(--color-bg)"
                }`
              }
            >
              Practice Log
            </NavLink>
          </li>
        </ul>

        <p className="mb-2 mt-6 px-2 text-[11px] font-semibold uppercase tracking-wider text-(--color-text-secondary)">
          Resources
        </p>
        <ul className="space-y-0.5">
          <li>
            <NavLink
              to="/reference"
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-(--color-accent) text-white shadow-sm"
                    : "hover:bg-(--color-bg)"
                }`
              }
            >
              Reference Library
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
