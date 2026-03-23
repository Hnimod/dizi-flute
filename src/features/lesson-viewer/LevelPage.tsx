import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { levels } from "@/data";
import { MarkdownRenderer, AudioPlayer, Checkbox, ProgressBar, VideoEmbed, JianpuRenderer } from "@/shared/ui";
import { useProgressStore, selectIsCompleted, selectCompletedCount } from "@/features/progress-tracking";
import { PracticeView } from "./PracticeView";
import type { Song, Exercise } from "@/shared/types";
import { UserVideos } from "./UserVideos";

/* ─── Helpers ─── */

function getItemTitle(item: Song | Exercise): string {
  if (item.type === "song") {
    return [item.titleChinese, item.titleVietnamese, item.titleEnglish]
      .filter(Boolean)
      .join(" / ");
  }
  return item.title;
}

/* ─── Desktop: full cards ─── */

function SongCard({ song }: { song: Song }) {
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const completed = useProgressStore(selectIsCompleted(song.id));
  const titles = [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean);

  return (
    <div
      className="my-4 rounded-xl bg-(--color-bg-secondary) p-5 shadow-sm"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
          {titles.join(" / ")}
        </h4>
        <Checkbox checked={completed} onChange={() => toggleItem(song.id)} label="Completed" />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
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
      {song.videoUrl && <VideoEmbed url={song.videoUrl} className="my-3" />}
      <UserVideos itemId={song.id} />
      <JianpuRenderer
        content={song.jianpu}
        className="rounded-lg p-4 overflow-x-auto my-3"
        style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
      />
      {song.audioPath && <AudioPlayer src={song.audioPath} className="mt-3" />}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const completed = useProgressStore(selectIsCompleted(exercise.id));

  return (
    <div
      className="my-4 rounded-xl bg-(--color-bg-secondary) p-5 shadow-sm"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
          {exercise.title}
        </h4>
        <Checkbox checked={completed} onChange={() => toggleItem(exercise.id)} label="Completed" />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
        <span>Key: {exercise.key}</span>
        <span>Time: {exercise.timeSignature}</span>
        {exercise.tempo && <span>Tempo: {exercise.tempo} BPM</span>}
      </div>
      {exercise.description && (
        <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {exercise.description}
        </p>
      )}
      {exercise.videoUrl && <VideoEmbed url={exercise.videoUrl} className="my-3" />}
      <UserVideos itemId={exercise.id} />
      <JianpuRenderer
        content={exercise.jianpu}
        className="rounded-lg p-4 overflow-x-auto my-3"
        style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
      />
      {exercise.audioPath && <AudioPlayer src={exercise.audioPath} className="mt-3" />}
    </div>
  );
}

/* ─── Mobile: compact row ─── */

function CompactItemRow({
  item,
  onTap,
}: {
  item: Song | Exercise;
  onTap: () => void;
}) {
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const completed = useProgressStore(selectIsCompleted(item.id));

  return (
    <button
      onClick={onTap}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-(--color-bg-secondary) active:bg-(--color-accent-light)"
    >
      <span
        className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
          item.type === "song"
            ? "bg-(--color-accent-light) text-(--color-accent)"
            : "bg-(--color-bg-tertiary) text-(--color-text-secondary)"
        }`}
      >
        {item.type === "song" ? "Song" : "Ex"}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{getItemTitle(item)}</div>
        <div className="text-[11px] text-(--color-text-secondary)">
          {item.key} · {item.timeSignature}
          {item.tempo ? ` · ${item.tempo} BPM` : ""}
        </div>
      </div>
      <div
        className="shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          toggleItem(item.id);
        }}
      >
        <div
          className="flex h-6 w-6 items-center justify-center rounded transition-colors"
          style={{
            backgroundColor: completed ? "var(--color-accent)" : "transparent",
            border: `2px solid ${completed ? "var(--color-accent)" : "var(--color-border)"}`,
          }}
        >
          {completed && (
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

/* ─── Main page ─── */

export function LevelPage() {
  const { id } = useParams();
  const levelId = Number(id);
  const level = levels.find((l) => l.id === levelId);
  const completedCount = useProgressStore(selectCompletedCount(levelId));
  const setCurrentLevel = useProgressStore((s) => s.setCurrentLevel);

  // Practice view state: which section's items and starting index
  const [practiceState, setPracticeState] = useState<{
    items: (Song | Exercise)[];
    index: number;
  } | null>(null);

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

  // Reset practice view when navigating to a different level
  useEffect(() => {
    setPracticeState(null);
  }, [levelId]);

  if (!level) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Level not found
        </h1>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
          There is no level with id "{id}".
        </p>
        <Link to="/" className="underline hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          Back to course overview
        </Link>
      </div>
    );
  }

  const prevLevel = levels.find((l) => l.id === levelId - 1);
  const nextLevel = levels.find((l) => l.id === levelId + 1);

  return (
    <>
      {/* Full-screen practice view overlay */}
      {practiceState && (
        <PracticeView
          items={practiceState.items}
          initialIndex={practiceState.index}
          levelTitle={level.title}
          onClose={() => setPracticeState(null)}
        />
      )}

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

            {section.content && <MarkdownRenderer content={section.content} />}

            {/* Desktop: full cards */}
            <div className="hidden md:block">
              {section.items.map((item) =>
                item.type === "song" ? (
                  <SongCard key={item.id} song={item} />
                ) : (
                  <ExerciseCard key={item.id} exercise={item} />
                ),
              )}
            </div>

            {/* Mobile: compact list → tap opens full-screen practice view */}
            <div className="md:hidden space-y-1 mt-3">
              {section.items.map((item, idx) => (
                <CompactItemRow
                  key={item.id}
                  item={item}
                  onTap={() => setPracticeState({ items: section.items, index: idx })}
                />
              ))}
            </div>
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
    </>
  );
}
