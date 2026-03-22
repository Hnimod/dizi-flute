import { NavLink } from "react-router";
import { levels } from "@/data";
import { useProgressStore } from "@/features/progress-tracking";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  // completedItems included in selector for reactivity when items are toggled
  const getCompletedCount = useProgressStore((s) => {
    void s.completedItems;
    return s.getCompletedCount;
  });

  return (
    <nav className="flex h-full flex-col overflow-y-auto">
      <div className="border-b border-[var(--color-border)] p-4">
        <NavLink to="/" onClick={onClose} className="text-lg font-bold text-[var(--color-accent)]">
          Dizi Flute Course
        </NavLink>
      </div>

      <div className="flex-1 p-3">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Levels
        </p>
        <ul className="space-y-0.5">
          {levels.map((level) => {
            const totalItems = level.sections.flatMap((s) => s.items).length;
            const completed = getCompletedCount(level.id);

            return (
              <li key={level.id}>
                <NavLink
                  to={`/level/${level.id}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--color-accent)] text-white"
                        : "hover:bg-[var(--color-bg-secondary)]"
                    }`
                  }
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold bg-[var(--color-bg-secondary)]">
                    {level.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{level.title}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{level.timeline}</div>
                  </div>
                  {totalItems > 0 && (
                    <span className="shrink-0 text-[10px] tabular-nums text-[var(--color-text-secondary)]">
                      {completed === totalItems ? "✓" : `${completed}/${totalItems}`}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <p className="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Practice
        </p>
        <ul className="space-y-0.5">
          <li>
            <NavLink
              to="/practice"
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "hover:bg-[var(--color-bg-secondary)]"
                }`
              }
            >
              Practice Timer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/practice-log"
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "hover:bg-[var(--color-bg-secondary)]"
                }`
              }
            >
              Practice Log
            </NavLink>
          </li>
        </ul>

        <p className="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Resources
        </p>
        <ul className="space-y-0.5">
          <li>
            <NavLink
              to="/reference"
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "hover:bg-[var(--color-bg-secondary)]"
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
