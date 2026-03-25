import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { songs as staticSongs, getTechnique } from "@/data";
import { VideoEmbed } from "@/shared/ui";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useProgressStore } from "@/features/progress-tracking";
import { useSongLibraryStore } from "./store";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

export function SongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const userSongs = useSongLibraryStore((s) => s.userSongs);

  const song = useMemo(() => {
    return staticSongs.find((s) => s.id === songId) ?? userSongs.find((s) => s.id === songId);
  }, [songId, userSongs]);

  const favorited = useProgressStore((s) => song ? !!s.favoritedItems[song.id] : false);
  const completed = useProgressStore((s) => song ? !!s.completedItems[song.id] : false);
  const toggleFavorite = useProgressStore((s) => s.toggleFavorite);
  const toggleItem = useProgressStore((s) => s.toggleItem);

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
            onClick={() => toggleItem(song.id)}
            className="shrink-0 p-1 hover:opacity-70 transition-opacity"
            title={completed ? "Mark incomplete" : "Mark completed"}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill={completed ? "var(--color-accent)" : "none"}
              stroke={completed ? "var(--color-accent)" : "var(--color-text-secondary)"}
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              {completed && <path d="M9 12l2 2 4-4" strokeWidth={2.5} stroke="white" fill="none" />}
            </svg>
          </button>
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
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          <span>Key: {song.key}</span>
          <span>Time: {song.timeSignature}</span>
          {song.tempo && <span>Tempo: {song.tempo} BPM</span>}
          {song.origin && <span>Origin: {song.origin}</span>}
        </div>
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

      <div className="my-4">
        <TempoGuide
          content={song.jianpu}
          tempo={song.tempo}
          className="rounded-lg p-4 overflow-x-auto"
          style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
        />
      </div>
    </div>
  );
}
