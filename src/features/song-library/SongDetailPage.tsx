import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router";
import { songs as staticSongs, getTechnique, difficultyLabels } from "@/data";
import { VideoEmbed } from "@/shared/ui";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useProgressStore } from "@/features/progress-tracking";
import { useSongLibraryStore } from "./store";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

function SheetImageAccordion({ src }: { src: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 cursor-pointer text-sm font-medium select-none hover:opacity-80"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Original Sheet
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
              <img src={src} alt="Jianpu sheet" className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const userSongs = useSongLibraryStore((s) => s.userSongs);

  const song = useMemo(() => {
    return staticSongs.find((s) => s.id === songId) ?? userSongs.find((s) => s.id === songId);
  }, [songId, userSongs]);

  const favorited = useProgressStore((s) => song ? !!s.favoritedItems[song.id] : false);
  const toggleFavorite = useProgressStore((s) => s.toggleFavorite);

  const techniqueDetails = useMemo(() => {
    if (!song?.techniques) return [];
    return song.techniques
      .map((id) => getTechnique(id))
      .filter(Boolean) as NonNullable<ReturnType<typeof getTechnique>>[];
  }, [song]);

  if (!song) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Song not found
        </h1>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
          There is no song with id "{songId}".
        </p>
        <Link to="/" className="underline hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          Back to Songs
        </Link>
      </div>
    );
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
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold mb-1 md:text-3xl" style={{ color: "var(--color-text)" }}>
            {getTitle(song)}
          </h1>
          <button
            onClick={() => toggleFavorite(song.id)}
            className="shrink-0 p-1 hover:opacity-70 transition-opacity"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill={favorited ? "var(--color-accent)" : "none"}
              stroke={favorited ? "var(--color-accent)" : "var(--color-text-secondary)"}
              strokeWidth={2}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          <span
            className="rounded-md px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)" }}
          >
            {song.difficulty}/10 · {difficultyLabels[song.difficulty] ?? ""}
          </span>
          <span>Key: {song.key}</span>
          <span>Time: {song.timeSignature}</span>
          {song.tempo && <span>Tempo: {song.tempo} BPM</span>}
          {song.origin && <span>Origin: {song.origin}</span>}
        </div>
        {song.difficultyNote && (
          <p className="mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
            {song.difficultyNote}
          </p>
        )}
      </header>

      {song.description && (
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {song.description}
        </p>
      )}

      {/* Technique pills */}
      {techniqueDetails.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
            Techniques used:
          </p>
          <div className="flex flex-wrap gap-2">
            {techniqueDetails.map((t) => (
              <Link
                key={t.id}
                to={`/techniques/${t.id}`}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                }}
              >
                {t.name}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(song.videoUrls ?? (song.videoUrl ? [song.videoUrl] : [])).map((url, i) => (
        <VideoEmbed key={i} url={url} className="mb-4" />
      ))}

      {song.sheetImage && <SheetImageAccordion src={song.sheetImage} />}

      <div className="my-4">
        <TempoGuide
          content={song.jianpu}
          abc={song.abc}
          tempo={song.tempo}
          title={getTitle(song)}
          keySignature={song.key}
          timeSignature={song.timeSignature}
          origin={song.origin}
          className="rounded-lg p-4 overflow-x-auto"
          style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
        />
      </div>
    </div>
  );
}
