import { useMemo, useState } from "react";
import { Link } from "react-router";
import { songs, levels } from "@/data";
import { VideoEmbed } from "@/shared/ui";
import { UserVideos } from "@/features/lesson-viewer/UserVideos";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useSongLibraryStore } from "./store";
import { AddSongForm } from "./AddSongForm";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

function SongRow({ song, canDelete }: { song: Song; canDelete?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const removeSong = useSongLibraryStore((s) => s.removeSong);

  return (
    <div
      className="rounded-xl transition-colors"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
            {getTitle(song)}
          </div>
          <div className="mt-0.5 flex flex-wrap gap-x-3 text-[11px] text-(--color-text-secondary)">
            <span>Key: {song.key}</span>
            <span>Time: {song.timeSignature}</span>
            {song.tempo && <span>{song.tempo} BPM</span>}
            {song.origin && <span>{song.origin}</span>}
          </div>
        </div>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform text-(--color-text-secondary) ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-(--color-border) px-4 py-3">
          {song.description && (
            <p className="text-sm mb-3 leading-relaxed text-(--color-text-secondary)">
              {song.description}
            </p>
          )}
          {song.videoUrl && <VideoEmbed url={song.videoUrl} className="mb-3" />}
          <UserVideos itemId={song.id} />
          <TempoGuide
            content={song.jianpu}
            tempo={song.tempo}
            className="rounded-lg p-4 overflow-x-auto"
            style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
          />
          <div className="mt-3 flex items-center gap-4">
            <Link
              to={`/library/${song.id}`}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              Go to details &rarr;
            </Link>
            {canDelete && (
              <button
                onClick={() => removeSong(song.id)}
                className="text-sm font-medium text-red-500 hover:opacity-70 transition-opacity"
              >
                Remove song
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SongLibraryPage() {
  const userSongs = useSongLibraryStore((s) => s.userSongs);
  const [showForm, setShowForm] = useState(false);

  const songsByLevel = useMemo(() => {
    const grouped = new Map<number, Song[]>();
    for (const song of songs) {
      const list = grouped.get(song.levelId) ?? [];
      list.push(song);
      grouped.set(song.levelId, list);
    }
    return grouped;
  }, []);

  const levelTitles = useMemo(() => {
    const map = new Map<number, string>();
    for (const level of levels) {
      map.set(level.id, level.title);
    }
    return map;
  }, []);

  const sortedLevelIds = useMemo(() => [...songsByLevel.keys()].sort((a, b) => a - b), [songsByLevel]);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold mb-1 md:text-3xl" style={{ color: "var(--color-text)" }}>
          Song Library
        </h1>
        <p className="text-base md:text-lg" style={{ color: "var(--color-text-secondary)" }}>
          All songs across every level, plus your own additions.
        </p>
      </header>

      {/* User songs section */}
      {(userSongs.length > 0 || showForm) && (
        <section className="mb-8">
          <h2
            className="text-xl font-bold mb-3 pb-2 md:text-2xl"
            style={{ color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}
          >
            My Songs
          </h2>
          <div className="space-y-2">
            {userSongs.map((song) => (
              <SongRow key={song.id} song={song} canDelete />
            ))}
          </div>
          {showForm && (
            <div
              className="mt-3 rounded-xl p-4"
              style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
            >
              <AddSongForm onClose={() => setShowForm(false)} />
            </div>
          )}
        </section>
      )}

      {/* Add song button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Song
        </button>
      )}

      {/* Built-in songs by level */}
      {sortedLevelIds.map((levelId) => (
        <section key={levelId} className="mb-8">
          <h2
            className="text-xl font-bold mb-3 pb-2 md:text-2xl"
            style={{ color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}
          >
            Level {levelId} — {levelTitles.get(levelId) ?? ""}
          </h2>
          <div className="space-y-2">
            {songsByLevel.get(levelId)!.map((song) => (
              <SongRow key={song.id} song={song} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
