import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router";
import { levels } from "@/data";
import { MarkdownRenderer, AudioPlayer, Checkbox, ProgressBar } from "@/shared/ui";
import { useProgressStore, selectIsCompleted, selectCompletedCount } from "@/features/progress-tracking";
import type { Song, Exercise } from "@/shared/types";

function SongCard({ song }: { song: Song }) {
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const completed = useProgressStore(selectIsCompleted(song.id));
  const titles = [
    song.titleChinese,
    song.titleVietnamese,
    song.titleEnglish,
  ].filter(Boolean);

  return (
    <div className="my-3 rounded-xl bg-(--color-bg-secondary) p-4 shadow-sm md:my-4 md:p-5"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-base font-semibold md:text-lg" style={{ color: "var(--color-text)" }}>
          {titles.join(" / ")}
        </h4>
        <Checkbox
          checked={completed}
          onChange={() => toggleItem(song.id)}
          label="Completed"
        />
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mb-3 md:text-sm md:gap-x-4" style={{ color: "var(--color-text-secondary)" }}>
        <span>Key: {song.key}</span>
        <span>Time: {song.timeSignature}</span>
        {song.tempo && <span>Tempo: {song.tempo} BPM</span>}
        {song.origin && <span>Origin: {song.origin}</span>}
      </div>
      {song.description && (
        <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {song.description}
        </p>
      )}
      <pre
        className="jianpu rounded-lg p-3 overflow-x-auto text-xs my-3 md:p-4 md:text-sm"
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
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const completed = useProgressStore(selectIsCompleted(exercise.id));

  return (
    <div className="my-3 rounded-xl bg-(--color-bg-secondary) p-4 shadow-sm md:my-4 md:p-5"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-base font-semibold md:text-lg" style={{ color: "var(--color-text)" }}>
          {exercise.title}
        </h4>
        <Checkbox
          checked={completed}
          onChange={() => toggleItem(exercise.id)}
          label="Completed"
        />
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mb-3 md:text-sm md:gap-x-4" style={{ color: "var(--color-text-secondary)" }}>
        <span>Key: {exercise.key}</span>
        <span>Time: {exercise.timeSignature}</span>
        {exercise.tempo && <span>Tempo: {exercise.tempo} BPM</span>}
      </div>
      {exercise.description && (
        <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {exercise.description}
        </p>
      )}
      <pre
        className="jianpu rounded-lg p-3 overflow-x-auto text-xs my-3 md:p-4 md:text-sm"
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
  const completedCount = useProgressStore(selectCompletedCount(levelId));
  const setCurrentLevel = useProgressStore((s) => s.setCurrentLevel);

  const totalItems = useMemo(
    () => (level ? level.sections.reduce((sum, s) => sum + s.items.length, 0) : 0),
    [level],
  );
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  useEffect(() => {
    if (level) {
      setCurrentLevel(levelId);
    }
  }, [level, levelId, setCurrentLevel]);

  if (!level) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Level not found
        </h1>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
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
      <header className="mb-6 md:mb-8">
        <p className="text-xs font-medium mb-1 md:text-sm" style={{ color: "var(--color-accent)" }}>
          Level {level.id} &middot; {level.timeline} &middot; CCOM {level.ccomGrade}
        </p>
        <h1 className="text-2xl font-bold mb-1 md:text-3xl" style={{ color: "var(--color-text)" }}>
          {level.title}
        </h1>
        <p className="text-base md:text-lg" style={{ color: "var(--color-text-secondary)" }}>
          {level.subtitle}
        </p>
      </header>

      {/* Progress summary */}
      {totalItems > 0 && (
        <div className="mb-6 md:mb-8">
          <p className="text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
            {completedCount} of {totalItems} items completed
          </p>
          <ProgressBar value={progressPercent} />
        </div>
      )}

      {/* Sections */}
      {level.sections.map((section) => (
        <section key={section.id} className="mb-8 md:mb-10">
          <h2
            className="text-xl font-bold mb-3 pb-2 md:text-2xl md:mb-4"
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
        className="flex justify-between items-center py-4 mt-6 gap-4 md:py-6 md:mt-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {prevLevel ? (
          <Link
            to={`/level/${prevLevel.id}`}
            className="text-sm hover:opacity-80 transition-opacity md:text-base"
            style={{ color: "var(--color-accent)" }}
          >
            &larr; {prevLevel.title}
          </Link>
        ) : (
          <span />
        )}
        {nextLevel ? (
          <Link
            to={`/level/${nextLevel.id}`}
            className="text-sm hover:opacity-80 transition-opacity text-right md:text-base"
            style={{ color: "var(--color-accent)" }}
          >
            {nextLevel.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
