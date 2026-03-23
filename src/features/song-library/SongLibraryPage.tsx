import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
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

function matchesSearch(song: Song, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    (song.titleChinese?.toLowerCase().includes(q) ?? false) ||
    (song.titleVietnamese?.toLowerCase().includes(q) ?? false) ||
    song.titleEnglish.toLowerCase().includes(q) ||
    (song.origin?.toLowerCase().includes(q) ?? false)
  );
}

// ─── Song Row ───

function SongRow({ song, canDelete }: { song: Song; canDelete?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const removeSong = useSongLibraryStore((s) => s.removeSong);

  return (
    <div className="rounded-xl transition-colors" style={{ border: "1px solid var(--color-border)" }}>
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

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-(--color-border) px-4 py-3">
              {song.description && (
                <p className="text-sm mb-3 leading-relaxed text-(--color-text-secondary)">
                  {song.description}
                </p>
              )}
              <TempoGuide
                content={song.jianpu}
                tempo={song.tempo}
                className="rounded-lg p-4 overflow-x-auto"
                style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              />
              {song.videoUrl && <VideoEmbed url={song.videoUrl} className="mt-3" />}
              <UserVideos itemId={song.id} />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ───

export function SongLibraryPage() {
  const userSongs = useSongLibraryStore((s) => s.userSongs);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState<"all" | "my" | number>("all");
  const [collapsedLevels, setCollapsedLevels] = useState<Set<number | "my">>(() => {
    try {
      const saved = localStorage.getItem("dizi-library-collapsed");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  const sectionRefs = useRef<Map<number | "my", HTMLElement>>(new Map());

  useEffect(() => {
    localStorage.setItem("dizi-library-collapsed", JSON.stringify([...collapsedLevels]));
  }, [collapsedLevels]);

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

  const isSearching = searchQuery.trim().length > 0;

  const filteredUserSongs = useMemo(
    () => userSongs.filter((s) => matchesSearch(s, searchQuery)),
    [userSongs, searchQuery],
  );

  const filteredSongsByLevel = useMemo(() => {
    const map = new Map<number, Song[]>();
    for (const [levelId, levelSongs] of songsByLevel) {
      const filtered = levelSongs.filter((s) => matchesSearch(s, searchQuery));
      if (filtered.length > 0) map.set(levelId, filtered);
    }
    return map;
  }, [songsByLevel, searchQuery]);

  const toggleLevel = useCallback((id: number | "my") => {
    setCollapsedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const scrollToLevel = useCallback((id: number | "my") => {
    setActiveLevel(id);
    // Expand the section
    setCollapsedLevels((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    // Scroll after render
    requestAnimationFrame(() => {
      sectionRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const pillStyle = (active: boolean) => ({
    backgroundColor: active ? "var(--color-accent)" : "var(--color-bg-tertiary)",
    color: active ? "white" : "var(--color-text-secondary)",
    border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border)"}`,
  });

  const showUserSection =
    (activeLevel === "all" || activeLevel === "my") &&
    (filteredUserSongs.length > 0 || showForm);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Sticky search + level pills */}
      <div
        className="sticky -top-5 z-10 -mx-4 -mt-5 px-4 pt-5 pb-3 mb-4 bg-(--color-bg) border-b border-(--color-border)"
      >
        {/* Search bar */}
        <div className="relative mb-2">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="var(--color-text-secondary)"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs..."
            className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={() => setSearchQuery("")}
            >
              Clear
            </button>
          )}
        </div>

        {/* Level filter pills */}
        {!isSearching && (
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            <button
              className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all"
              style={pillStyle(activeLevel === "all")}
              onClick={() => { setActiveLevel("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              All
            </button>
            {userSongs.length > 0 && (
              <button
                className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all"
                style={pillStyle(activeLevel === "my")}
                onClick={() => scrollToLevel("my")}
              >
                My Songs
              </button>
            )}
            {sortedLevelIds.map((id) => (
              <button
                key={id}
                className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all"
                style={pillStyle(activeLevel === id)}
                onClick={() => scrollToLevel(id)}
              >
                Lv.{id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search results count */}
      {isSearching && (
        <p className="text-xs mb-3" style={{ color: "var(--color-text-secondary)" }}>
          {filteredUserSongs.length + [...filteredSongsByLevel.values()].reduce((sum, s) => sum + s.length, 0)} results
        </p>
      )}

      {/* Add song button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Song
        </button>
      )}

      {/* Add song form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="mb-4 rounded-xl p-4"
              style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
            >
              <AddSongForm onClose={() => setShowForm(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User songs section */}
      {showUserSection && (
        <section
          className="mb-6"
          ref={(el) => { if (el) sectionRefs.current.set("my", el); }}
        >
          <button
            onClick={() => toggleLevel("my")}
            className="flex w-full items-center gap-2 text-left mb-2"
          >
            <svg
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${collapsedLevels.has("my") ? "" : "rotate-90"}`}
              fill="var(--color-text-secondary)"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <h2 className="text-base font-bold" style={{ color: "var(--color-text)" }}>
              My Songs
            </h2>
            <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              ({filteredUserSongs.length})
            </span>
          </button>
          {!collapsedLevels.has("my") && (
            <div className="space-y-2">
              {filteredUserSongs.map((song) => (
                <SongRow key={song.id} song={song} canDelete />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Built-in songs by level */}
      {(isSearching ? [...filteredSongsByLevel.keys()].sort((a, b) => a - b) : sortedLevelIds)
        .filter((id) => !isSearching || filteredSongsByLevel.has(id))
        .filter((id) => activeLevel === "all" || activeLevel === id || isSearching)
        .map((levelId) => {
          const levelSongs = isSearching
            ? filteredSongsByLevel.get(levelId)!
            : songsByLevel.get(levelId)!;
          const isCollapsed = collapsedLevels.has(levelId);

          return (
            <section
              key={levelId}
              className="mb-6"
              ref={(el) => { if (el) sectionRefs.current.set(levelId, el); }}
            >
              <button
                onClick={() => toggleLevel(levelId)}
                className="flex w-full items-center gap-2 text-left mb-2"
              >
                <svg
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
                  fill="var(--color-text-secondary)"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <h2 className="text-base font-bold" style={{ color: "var(--color-text)" }}>
                  Level {levelId} — {levelTitles.get(levelId) ?? ""}
                </h2>
                <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  ({levelSongs.length})
                </span>
              </button>
              {!isCollapsed && (
                <div className="space-y-2">
                  {levelSongs.map((song) => (
                    <SongRow key={song.id} song={song} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

      {/* No results */}
      {isSearching &&
        filteredUserSongs.length === 0 &&
        filteredSongsByLevel.size === 0 && (
          <p className="text-sm text-center py-12" style={{ color: "var(--color-text-secondary)" }}>
            No songs found for "{searchQuery}"
          </p>
        )}
    </div>
  );
}
