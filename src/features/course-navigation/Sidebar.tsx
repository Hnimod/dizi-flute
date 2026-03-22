import { NavLink } from "react-router";

const levels = [
  { id: 0, title: "Setup & Foundations", timeline: "Week 0" },
  { id: 1, title: "First Sounds", timeline: "Weeks 1-4" },
  { id: 2, title: "First Songs", timeline: "Weeks 5-8" },
  { id: 3, title: "Folk Repertoire", timeline: "Months 3-4" },
  { id: 4, title: "Expression", timeline: "Months 5-7" },
  { id: 5, title: "Intermediate Repertoire", timeline: "Months 8-12" },
  { id: 6, title: "Advancing", timeline: "Year 2" },
  { id: 7, title: "Advanced", timeline: "Year 2-3+" },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
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
          {levels.map((level) => (
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
                <div className="min-w-0">
                  <div className="truncate font-medium">{level.title}</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">{level.timeline}</div>
                </div>
              </NavLink>
            </li>
          ))}
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
