import { useCallback, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useContentStore } from "@/data";
import { VideoEmbed, JianpuEditor } from "@/shared/ui";
import { UserVideos } from "@/features/lesson-viewer/UserVideos";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useAuthStore } from "@/features/auth";
import { useSongLibraryStore } from "./store";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

export function SongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const songs = useContentStore((s) => s.songs);
  const userSongs = useSongLibraryStore((s) => s.userSongs);
  const removeSong = useSongLibraryStore((s) => s.removeSong);
  const updateSong = useSongLibraryStore((s) => s.updateSong);

  const song = useMemo(() => {
    return songs.find((s) => s.id === songId) ?? userSongs.find((s) => s.id === songId);
  }, [songId, songs, userSongs]);

  const isAdmin = useAuthStore((s) => s.isAdmin);
  const isUserSong = song?.id.startsWith("user-song-");
  const [editableJianpu, setEditableJianpu] = useState(song?.jianpu ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const hasChanges = editableJianpu !== (song?.jianpu ?? "");

  const handleJianpuChange = useCallback((value: string) => {
    setEditableJianpu(value);
  }, []);

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
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold mb-1 md:text-3xl" style={{ color: "var(--color-text)" }}>
            {getTitle(song)}
          </h1>
          {isAdmin && !isUserSong && (
            <Link
              to={`/admin/song/${song.id}`}
              className="shrink-0 ml-3 flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </Link>
          )}
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

      {(song.videoUrls ?? (song.videoUrl ? [song.videoUrl] : [])).map((url, i) => (
        <VideoEmbed key={i} url={url} className="mb-4" />
      ))}

      {/* Jianpu notation */}
      <div className="my-4">
        {isEditing ? (
          <JianpuEditor
            value={editableJianpu}
            onChange={handleJianpuChange}
            timeSignature={song.timeSignature}
            onEditModeChange={setIsEditing}
            initialEditMode
          />
        ) : (
          <>
            <div className="flex justify-end mb-1">
              <button
                className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={() => setIsEditing(true)}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
            </div>
            <TempoGuide
              content={editableJianpu}
              tempo={song.tempo}
              className="rounded-lg p-4 overflow-x-auto"
              style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
            />
          </>
        )}
        {isEditing && hasChanges && (
          <div className="flex items-center gap-2 mt-3">
            {isUserSong && (
              <button
                onClick={() => updateSong(song.id, { jianpu: editableJianpu })}
                className="px-3 py-1.5 text-sm font-medium rounded-md text-white"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Save changes
              </button>
            )}
            <button
              onClick={() => setEditableJianpu(song.jianpu)}
              className="px-3 py-1.5 text-sm font-medium rounded-md"
              style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      <UserVideos itemId={song.id} />

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
