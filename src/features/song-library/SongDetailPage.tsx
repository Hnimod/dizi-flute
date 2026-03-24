import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useSongs } from "@/data";
import { VideoEmbed, SongDetailSkeleton } from "@/shared/ui";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useAuthStore } from "@/features/auth";
import { useProgressStore } from "@/features/progress-tracking";
import { SongEditor } from "@/features/admin";
import { useSongLibraryStore } from "./store";
import type { Song } from "@/shared/types";

function getTitle(song: Song): string {
  return [song.titleChinese, song.titleVietnamese, song.titleEnglish].filter(Boolean).join(" / ");
}

export function SongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { data: songs = [], isLoading } = useSongs();
  const userSongs = useSongLibraryStore((s) => s.userSongs);
  const removeSong = useSongLibraryStore((s) => s.removeSong);

  const song = useMemo(() => {
    return songs.find((s) => s.id === songId) ?? userSongs.find((s) => s.id === songId);
  }, [songId, songs, userSongs]);

  const isAdmin = useAuthStore((s) => s.isAdmin);
  const isUserSong = song?.id.startsWith("user-song-");
  const favorited = useProgressStore((s) => song ? !!s.favoritedItems[song.id] : false);
  const completed = useProgressStore((s) => song ? !!s.completedItems[song.id] : false);
  const toggleFavorite = useProgressStore((s) => s.toggleFavorite);
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const [editing, setEditing] = useState(false);

  if (isLoading) return <SongDetailSkeleton />;

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
    <>
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
            {isAdmin && !isUserSong && (
              <button
                onClick={() => setEditing(true)}
                className="shrink-0 ml-3 flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
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

        <div className="my-4">
          <TempoGuide
            content={song.jianpu}
            tempo={song.tempo}
            className="rounded-lg p-4 overflow-x-auto"
            style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          />
        </div>

        {isAdmin && isUserSong && (
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

      {/* Song editor modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setEditing(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl p-5 pb-24 md:pb-5"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <SongEditor song={song} onClose={() => setEditing(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
