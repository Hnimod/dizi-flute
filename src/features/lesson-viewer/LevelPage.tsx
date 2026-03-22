import { useParams, Link } from "react-router";
import { levels } from "@/data";
import { MarkdownRenderer, AudioPlayer } from "@/shared/ui";
import type { Song, Exercise } from "@/shared/types";

function SongCard({ song }: { song: Song }) {
  const titles = [
    song.titleChinese,
    song.titleVietnamese,
    song.titleEnglish,
  ].filter(Boolean);

  return (
    <div
      className="rounded-lg p-5 my-4"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h4
        className="text-lg font-semibold mb-1"
        style={{ color: "var(--color-text)" }}
      >
        {titles.join(" / ")}
      </h4>
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <span>Key: {song.key}</span>
        <span>Time: {song.timeSignature}</span>
        {song.tempo && <span>Tempo: {song.tempo} BPM</span>}
        {song.origin && <span>Origin: {song.origin}</span>}
      </div>
      {song.description && (
        <p
          className="text-sm mb-3 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {song.description}
        </p>
      )}
      <pre
        className="jianpu rounded-lg p-4 overflow-x-auto text-sm my-3"
        style={{
          backgroundColor: "var(--color-bg)",
          border: "1px solid var(--color-border)",
        }}
      >
        {song.jianpu}
      </pre>
      {song.audioPath && <AudioPlayer src={song.audioPath} className="mt-3" />}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <div
      className="rounded-lg p-5 my-4"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h4
        className="text-lg font-semibold mb-1"
        style={{ color: "var(--color-text)" }}
      >
        {exercise.title}
      </h4>
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
          className="text-sm mb-3 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {exercise.description}
        </p>
      )}
      <pre
        className="jianpu rounded-lg p-4 overflow-x-auto text-sm my-3"
        style={{
          backgroundColor: "var(--color-bg)",
          border: "1px solid var(--color-border)",
        }}
      >
        {exercise.jianpu}
      </pre>
      {exercise.audioPath && (
        <AudioPlayer src={exercise.audioPath} className="mt-3" />
      )}
    </div>
  );
}

export function LevelPage() {
  const { id } = useParams();
  const levelId = Number(id);
  const level = levels.find((l) => l.id === levelId);

  if (!level) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Level not found
        </h1>
        <p
          className="mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          There is no level with id "{id}".
        </p>
        <Link
          to="/"
          className="underline hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          Back to course overview
        </Link>
      </div>
    );
  }

  const prevLevel = levels.find((l) => l.id === levelId - 1);
  const nextLevel = levels.find((l) => l.id === levelId + 1);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        <p
          className="text-sm font-medium mb-1"
          style={{ color: "var(--color-accent)" }}
        >
          Level {level.id} &middot; {level.timeline} &middot; CCOM{" "}
          {level.ccomGrade}
        </p>
        <h1
          className="text-3xl font-bold mb-1"
          style={{ color: "var(--color-text)" }}
        >
          {level.title}
        </h1>
        <p
          className="text-lg"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {level.subtitle}
        </p>
      </header>

      {/* Sections */}
      {level.sections.map((section) => (
        <section key={section.id} className="mb-10">
          <h2
            className="text-2xl font-bold mb-4 pb-2"
            style={{
              color: "var(--color-text)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {section.title}
          </h2>

          {section.content && (
            <MarkdownRenderer content={section.content} />
          )}

          {section.items.map((item) =>
            item.type === "song" ? (
              <SongCard key={item.id} song={item} />
            ) : (
              <ExerciseCard key={item.id} exercise={item} />
            ),
          )}
        </section>
      ))}

      {/* Navigation */}
      <nav
        className="flex justify-between items-center py-6 mt-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {prevLevel ? (
          <Link
            to={`/level/${prevLevel.id}`}
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            &larr; Previous: {prevLevel.title}
          </Link>
        ) : (
          <span />
        )}
        {nextLevel ? (
          <Link
            to={`/level/${nextLevel.id}`}
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            Next: {nextLevel.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
