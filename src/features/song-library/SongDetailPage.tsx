import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router";
import { songs as staticSongs, getTechnique, difficultyLabels } from "@/data";
import { VideoEmbed, transposeJianpu, transposeKey, tongyinShift, diziKeyFor } from "@/shared/ui";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useTongyinPreference, TONGYIN_OPTIONS } from "@/features/lesson-viewer";
import { useProgressStore } from "@/features/progress-tracking";
import { useSongLibraryStore } from "./store";
import { TONGYIN_TO_DIGIT } from "@/shared/types";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titlePinyin, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

function SheetImageAccordion({ src }: { src: string | string[] }) {
  const pages = Array.isArray(src) ? src : [src];
  const [open, setOpen] = useState(false);
  // fullscreenIdx === null means closed; otherwise it's the page being viewed.
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  const isFullscreen = fullscreenIdx !== null;

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenIdx(null);
      else if (e.key === "ArrowRight") setFullscreenIdx((i) => (i === null ? null : Math.min(pages.length - 1, i + 1)));
      else if (e.key === "ArrowLeft") setFullscreenIdx((i) => (i === null ? null : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen, pages.length]);

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
        Original Sheet{pages.length > 1 && ` (${pages.length} pages)`}
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
            <div className="mt-2 space-y-3">
              {pages.map((page, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden relative group"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <img
                    src={page}
                    alt={pages.length > 1 ? `Jianpu sheet page ${i + 1}` : "Jianpu sheet"}
                    className="w-full cursor-zoom-in"
                    onClick={() => setFullscreenIdx(i)}
                  />
                  {pages.length > 1 && (
                    <div
                      className="absolute top-2 left-2 rounded px-1.5 py-0.5 text-xs font-semibold"
                      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                    >
                      {i + 1} / {pages.length}
                    </div>
                  )}
                  <button
                    onClick={() => setFullscreenIdx(i)}
                    aria-label="View fullscreen"
                    title="View fullscreen"
                    className="absolute top-2 right-2 rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setFullscreenIdx(null)}
          >
            <img
              src={pages[fullscreenIdx!]}
              alt={pages.length > 1 ? `Jianpu sheet page ${fullscreenIdx! + 1}` : "Jianpu sheet"}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {pages.length > 1 && (
              <>
                {fullscreenIdx! > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setFullscreenIdx(fullscreenIdx! - 1); }}
                    aria-label="Previous page"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {fullscreenIdx! < pages.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setFullscreenIdx(fullscreenIdx! + 1); }}
                    aria-label="Next page"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                >
                  {fullscreenIdx! + 1} / {pages.length}
                </div>
              </>
            )}
            <button
              onClick={() => setFullscreenIdx(null)}
              aria-label="Close fullscreen"
              className="absolute top-4 right-4 rounded-full p-2 cursor-pointer hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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

  const userTongyin = useTongyinPreference((s) => s.tongyin);
  const setUserTongyin = useTongyinPreference((s) => s.setTongyin);
  const sourceTongyin = song?.sourceTongyin ?? "Sol";
  const sourceDigit = TONGYIN_TO_DIGIT[sourceTongyin];
  const userDigit = TONGYIN_TO_DIGIT[userTongyin];
  const shift = tongyinShift(sourceDigit, userDigit);
  const displayJianpu = useMemo(
    () => (song ? transposeJianpu(song.jianpu, shift) : ""),
    [song, shift],
  );
  const displayKey = useMemo(
    () => (song ? transposeKey(song.key, sourceDigit, userDigit) : ""),
    [song, sourceDigit, userDigit],
  );
  // Dizi-key implied by the source page. Position-shift transposition
  // preserves fingerings, so it stays the same regardless of the user's
  // chosen tongyin — it's a property of the physical flute the source
  // notation was written for.
  const diziKey = useMemo(
    () => (song ? diziKeyFor(song.key, sourceDigit) : ""),
    [song, sourceDigit],
  );

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

  const videoUrls = song.videoUrls ?? (song.videoUrl ? [song.videoUrl] : []);
  const hasVideos = videoUrls.length > 0;

  return (
    <div
      className={
        hasVideos
          ? "mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8"
          : "mx-auto max-w-3xl"
      }
    >
      <div className="min-w-0 lg:max-w-3xl">
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
          <span>
            Key: {displayKey}
            {displayKey !== song.key && (
              <span style={{ opacity: 0.6 }}> (orig {song.key})</span>
            )}
          </span>
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

      {/* Videos: inline on mobile/tablet (preserves current ordering above the score) */}
      {videoUrls.length > 0 && (
        <div className="lg:hidden">
          {videoUrls.map((url, i) => (
            <VideoEmbed key={i} url={url} className="mb-4" />
          ))}
        </div>
      )}

      {song.sheetImage && <SheetImageAccordion src={song.sheetImage} />}

      <div className="my-4">
        <TempoGuide
          content={displayJianpu}
          abc={song.abc}
          tempo={song.tempo}
          title={getTitle(song)}
          keySignature={displayKey}
          timeSignature={song.timeSignature}
          origin={song.origin}
          staffBaseOctave={song.staffBaseOctave}
          staffContent={song.jianpu}
          staffKey={song.key}
          className="notation-card rounded-lg p-4 overflow-x-auto"
          extraControls={
            <div
              className="flex flex-wrap items-center gap-2 text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <span>筒音作 (all-holes-covered):</span>
              <div className="flex gap-1">
                {TONGYIN_OPTIONS.map((opt) => {
                  const active = opt.value === userTongyin;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setUserTongyin(opt.value)}
                      className="rounded px-2 py-0.5 transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: active ? "var(--color-accent-light)" : "transparent",
                        color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                        border: "1px solid var(--color-border)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <span title="Physical dizi this notation is written for. Same fingerings on this flute regardless of which tongyin you select.">
                {diziKey}-key dizi
              </span>
              {sourceTongyin !== "Sol" && (
                <span style={{ opacity: 0.6 }}>
                  (source: 筒音作 {sourceTongyin})
                </span>
              )}
            </div>
          }
        />
      </div>
      </div>

      {videoUrls.length > 0 && (
        <aside className="hidden space-y-4 lg:block">
          <p
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Reference video{videoUrls.length > 1 ? "s" : ""}
          </p>
          {videoUrls.map((url, i) => (
            <VideoEmbed key={i} url={url} />
          ))}
        </aside>
      )}
    </div>
  );
}
