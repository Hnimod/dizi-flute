import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getTechnique, exercises as staticExercises, songs as staticSongs } from "@/data";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import type { Exercise } from "@/shared/types";

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <div
      className="my-4 rounded-xl bg-(--color-bg-secondary) p-5 shadow-sm"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="mb-1">
        <h4
          className="text-base font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {exercise.title}
        </h4>
      </div>
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <span>Key: {exercise.key}</span>
        <span>Time: {exercise.timeSignature}</span>
        {exercise.tempo && <span>Tempo: {exercise.tempo} BPM</span>}
      </div>
      {exercise.description && (
        <p
          className="text-sm mb-3 leading-relaxed whitespace-pre-line"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {exercise.description}
        </p>
      )}
      <TempoGuide
        content={exercise.jianpu}
        tempo={exercise.tempo}
        title={exercise.title}
        keySignature={exercise.key}
        timeSignature={exercise.timeSignature}
        className="rounded-lg p-4 overflow-x-auto"
        style={{
          backgroundColor: "var(--color-bg)",
          border: "1px solid var(--color-border)",
        }}
      />
    </div>
  );
}

export function TechniqueDetailPage() {
  const { techniqueId } = useParams();
  const navigate = useNavigate();
  const technique = getTechnique(techniqueId ?? "");
  const exercises = useMemo(
    () =>
      technique
        ? technique.exerciseIds
            .map((id) => staticExercises.find((e) => e.id === id))
            .filter(Boolean) as Exercise[]
        : [],
    [technique],
  );

  const relatedSongs = useMemo(
    () =>
      technique
        ? staticSongs.filter((s) => s.techniques?.includes(technique.id))
        : [],
    [technique],
  );

  if (!technique) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Technique not found
        </h1>
        <Link
          to="/techniques"
          className="underline hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          Back to Techniques
        </Link>
      </div>
    );
  }

  function getTitle(song: { titleChinese?: string; titleVietnamese?: string; titleEnglish: string }) {
    return [song.titleChinese, song.titleVietnamese, song.titleEnglish]
      .filter(Boolean)
      .join(" / ");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm hover:opacity-80 mb-4"
        style={{ color: "var(--color-accent)" }}
      >
        &larr; Back
      </button>

      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="rounded-md px-2 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: "var(--color-accent-light)",
              color: "var(--color-accent)",
            }}
          >
            Level {technique.level}
          </span>
          <span
            className="rounded-md px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-bg-tertiary)",
              color: "var(--color-text-secondary)",
            }}
          >
            {technique.category}
          </span>
        </div>
        <h1
          className="text-2xl font-bold mb-2 md:text-3xl"
          style={{ color: "var(--color-text)" }}
        >
          {technique.name}
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {technique.description}
        </p>
      </header>

      {technique.referenceSlug && (
        <Link
          to={`/knowledge/${technique.referenceSlug}`}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium mb-6 transition-colors hover:opacity-80"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            color: "var(--color-accent)",
            border: "1px solid var(--color-border)",
          }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Read more in Knowledge
        </Link>
      )}

      {/* Exercises */}
      {exercises.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-bold mb-3 pb-2"
            style={{
              color: "var(--color-text)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            Practice Exercises
          </h2>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </section>
      )}

      {/* Related songs */}
      {relatedSongs.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-bold mb-3 pb-2"
            style={{
              color: "var(--color-text)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            Songs Using This Technique
          </h2>
          <div className="space-y-1">
            {relatedSongs.map((song) => (
              <Link
                key={song.id}
                to={`/song/${song.id}`}
                className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-(--color-bg-secondary)"
              >
                <span
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-(--color-accent-light) text-(--color-accent)"
                >
                  L{song.levelId}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {getTitle(song)}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {song.key} · {song.timeSignature}
                    {song.tempo ? ` · ${song.tempo} BPM` : ""}
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
      )}
    </div>
  );
}
