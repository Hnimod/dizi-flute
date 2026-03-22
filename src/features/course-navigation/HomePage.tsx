import { Link } from "react-router";

const levels = [
  { id: 0, title: "Setup & Foundations", subtitle: "Equipment, jianpu notation, breathing", timeline: "Week 0", ccomGrade: "Pre-Grade" },
  { id: 1, title: "First Sounds", subtitle: "First tones, notes 1-5, embouchure", timeline: "Weeks 1-4", ccomGrade: "Grade 1" },
  { id: 2, title: "First Songs", subtitle: "Full scale, simple songs, tonguing", timeline: "Weeks 5-8", ccomGrade: "Grade 1-2" },
  { id: 3, title: "Folk Repertoire", subtitle: "Folk songs, grace notes, dynamics", timeline: "Months 3-4", ccomGrade: "Grade 2-3" },
  { id: 4, title: "Expression", subtitle: "Vibrato, double tonguing, ornaments", timeline: "Months 5-7", ccomGrade: "Grade 3-4" },
  { id: 5, title: "Intermediate Repertoire", subtitle: "Graded pieces, regional styles", timeline: "Months 8-12", ccomGrade: "Grade 4-5" },
  { id: 6, title: "Advancing", subtitle: "Multi-key, modal theory, chromatics", timeline: "Year 2", ccomGrade: "Grade 5-7" },
  { id: 7, title: "Advanced", subtitle: "Concert repertoire, aesthetics", timeline: "Year 2-3+", ccomGrade: "Grade 7-9" },
];

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
