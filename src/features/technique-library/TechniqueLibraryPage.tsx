import { useState } from "react";
import { Link } from "react-router";
import { techniques } from "@/data";
import type { Technique } from "@/shared/types";

const categories: { key: Technique["category"]; label: string }[] = [
  { key: "fundamentals", label: "Fundamentals" },
  { key: "articulation", label: "Articulation" },
  { key: "ornaments", label: "Ornaments" },
  { key: "breathing", label: "Breathing" },
  { key: "fingering", label: "Fingering" },
  { key: "advanced", label: "Advanced" },
];

function LevelBadge({ level }: { level: number }) {
  return (
    <span
      className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
      style={{
        backgroundColor: "var(--color-accent-light)",
        color: "var(--color-accent)",
      }}
    >
      L{level}
    </span>
  );
}

export function TechniqueLibraryPage() {
  const [filter, setFilter] = useState<Technique["category"] | "all">("all");

  const filtered =
    filter === "all"
      ? techniques
      : techniques.filter((t) => t.category === filter);

  // Group by category for display
  const grouped = categories
    .map((cat) => ({
      ...cat,
      items: filtered.filter((t) => t.category === cat.key),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <h1
          className="text-2xl font-bold mb-1 md:text-3xl"
          style={{ color: "var(--color-text)" }}
        >
          Techniques
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Learn dizi techniques — tap any to see exercises and songs.
        </p>
      </header>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            filter === "all"
              ? "bg-(--color-accent) text-white"
              : "bg-(--color-bg-secondary) text-(--color-text-secondary)"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === cat.key
                ? "bg-(--color-accent) text-white"
                : "bg-(--color-bg-secondary) text-(--color-text-secondary)"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Technique cards grouped by category */}
      {grouped.map((group) => (
        <section key={group.key} className="mb-8">
          <h2
            className="text-lg font-bold mb-3 pb-2"
            style={{
              color: "var(--color-text)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {group.label}
          </h2>
          <div className="space-y-2">
            {group.items
              .sort((a, b) => a.level - b.level)
              .map((technique) => (
                <Link
                  key={technique.id}
                  to={`/techniques/${technique.id}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-(--color-bg-secondary)"
                >
                  <LevelBadge level={technique.level} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{technique.name}</div>
                    <div
                      className="truncate text-[11px]"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {technique.description}
                    </div>
                  </div>
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
