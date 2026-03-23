import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { songs } from "@/data";
import { VideoEmbed } from "@/shared/ui";
import { UserVideos } from "@/features/lesson-viewer/UserVideos";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useSongLibraryStore } from "./store";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

export function SongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const userSongs = useSongLibraryStore((s) => s.userSongs);
  const removeSong = useSongLibraryStore((s) => s.removeSong);

  const song = useMemo(() => {
    return songs.find((s) => s.id === songId) ?? userSongs.find((s) => s.id === songId);
  }, [songId, userSongs]);

  const isUserSong = song?.id.startsWith("user-song-");

  if (!song) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Song not found
        </h1>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
          There is no song with id "{songId}".
        </p>
        <Link to="/library" className="underline hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          Back to Song Library
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
        <h1 className="text-2xl font-bold mb-1 md:text-3xl" style={{ color: "var(--color-text)" }}>
          {getTitle(song)}
        </h1>
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

      {song.videoUrl && <VideoEmbed url={song.videoUrl} className="mb-4" />}

      <UserVideos itemId={song.id} />

      <TempoGuide
        content={song.jianpu}
        tempo={song.tempo}
        className="rounded-lg p-4 overflow-x-auto my-4"
        style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
      />

      {isUserSong && (
        <button
          onClick={() => {
            removeSong(song.id);
            navigate("/library");
          }}
          className="mt-2 text-sm font-medium text-red-500 hover:opacity-70 transition-opacity"
        >
          Remove song
        </button>
      )}
    </div>
  );
}
