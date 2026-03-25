import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { levels, useSongs } from "@/data";
import { SongListSkeleton } from "@/shared/ui";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useAuthStore } from "@/features/auth";
import { useProgressStore } from "@/features/progress-tracking";
import { useSongLibraryStore } from "./store";
import { AddSongForm } from "./AddSongForm";
import { reviewSongs as staticReviewSongs } from "@/data/songs/review";
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

// ─── Heart Icon ───

function HeartButton({ songId }: { songId: string }) {
  const favorited = useProgressStore((s) => !!s.favoritedItems[songId]);
  const toggleFavorite = useProgressStore((s) => s.toggleFavorite);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(songId);
      }}
      className="shrink-0 p-1 hover:opacity-70 transition-opacity"
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill={favorited ? "var(--color-accent)" : "none"}
        stroke={favorited ? "var(--color-accent)" : "var(--color-text-secondary)"}
        strokeWidth={2}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

// ─── Check Icon ───

function CheckButton({ songId }: { songId: string }) {
  const completed = useProgressStore((s) => !!s.completedItems[songId]);
  const toggleItem = useProgressStore((s) => s.toggleItem);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleItem(songId);
      }}
      className="shrink-0 p-1 hover:opacity-70 transition-opacity"
      title={completed ? "Mark incomplete" : "Mark completed"}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill={completed ? "var(--color-accent)" : "none"}
        stroke={completed ? "var(--color-accent)" : "var(--color-text-secondary)"}
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        {completed && <path d="M9 12l2 2 4-4" strokeWidth={2.5} stroke="white" fill="none" />}
      </svg>
    </button>
  );
}

// ─── Level Dropdown ───

function LevelDropdown({
  levelIds,
  levelTitles,
  selected,
  onChange,
}: {
  levelIds: number[];
  levelTitles: Map<number, string>;
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
}) {
  const [open, setOpen] = useState(false);

  const label =
    selected.size === 0
      ? "All Levels"
      : [...selected].sort((a, b) => a - b).map((id) => `Lv.${id}`).join(", ");

  function toggle(id: number) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
        style={{
          backgroundColor: selected.size > 0 ? "var(--color-accent)" : "var(--color-bg-tertiary)",
          color: selected.size > 0 ? "white" : "var(--color-text-secondary)",
          border: `1px solid ${selected.size > 0 ? "var(--color-accent)" : "var(--color-border)"}`,
        }}
      >
        <span className="truncate max-w-[120px]">{label}</span>
        <svg
          className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 z-50 rounded-xl p-2 shadow-lg min-w-[160px]"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            {selected.size > 0 && (
              <button
                onClick={() => { onChange(new Set()); setOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:opacity-70 mb-1"
                style={{ color: "var(--color-accent)" }}
              >
                Clear all
              </button>
            )}
            {levelIds.map((id) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors"
                style={{ color: "var(--color-text)" }}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" strokeWidth={2}>
                  {selected.has(id) ? (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--color-accent)" stroke="var(--color-accent)" />
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ) : (
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="var(--color-border)" />
                  )}
                </svg>
                <span>Lv.{id} — {levelTitles.get(id) ?? ""}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Song Row ───

function SongRow({ song }: { song: Song }) {
  const [expanded, setExpanded] = useState(false);

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
        <CheckButton songId={song.id} />
        <HeartButton songId={song.id} />
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
              <TempoGuide
                content={song.jianpu}
                tempo={song.tempo}
                className="rounded-lg p-4 overflow-x-auto"
                style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              />
              <div className="mt-3">
                <Link
                  to={`/library/${song.id}`}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-accent)" }}
                >
                  Go to details &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ───

type FilterMode = "all" | "favorites" | "completed";

export function SongLibraryPage() {
  const { data: songs = [], isLoading } = useSongs();
  const userSongs = useSongLibraryStore((s) => s.userSongs);
  const reviewSongs = useSongLibraryStore((s) => s.reviewSongs);
  const addReviewSong = useSongLibraryStore((s) => s.addReviewSong);
  const removeReviewSong = useSongLibraryStore((s) => s.removeReviewSong);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  // Load static review songs into store on mount
  useEffect(() => {
    for (const song of staticReviewSongs) {
      addReviewSong(song);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const completedItems = useProgressStore((s) => s.completedItems);
  const favoritedItems = useProgressStore((s) => s.favoritedItems);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedLevels, setSelectedLevels] = useState<Set<number>>(new Set());
  const [collapsedLevels, setCollapsedLevels] = useState<Set<number | "my" | "fav" | "review">>(() => {
    try {
      const saved = localStorage.getItem("dizi-library-collapsed");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem("dizi-library-collapsed", JSON.stringify([...collapsedLevels]));
  }, [collapsedLevels]);

  // Apply status filter + search to a song list, sort favorites to top
  const applyFilters = useCallback((list: Song[]) => {
    let filtered = list.filter((s) => matchesSearch(s, searchQuery));
    if (filterMode === "favorites") {
      filtered = filtered.filter((s) => favoritedItems[s.id]);
    } else if (filterMode === "completed") {
      filtered = filtered.filter((s) => completedItems[s.id]);
    }
    return filtered.sort((a, b) => {
      const aFav = favoritedItems[a.id] ? 1 : 0;
      const bFav = favoritedItems[b.id] ? 1 : 0;
      return bFav - aFav;
    });
  }, [searchQuery, filterMode, favoritedItems, completedItems]);

  const songsByLevel = useMemo(() => {
    const grouped = new Map<number, Song[]>();
    for (const song of songs) {
      const list = grouped.get(song.levelId) ?? [];
      list.push(song);
      grouped.set(song.levelId, list);
    }
    return grouped;
  }, [songs]);

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
    () => applyFilters(userSongs),
    [userSongs, applyFilters],
  );

  const filteredSongsByLevel = useMemo(() => {
    const map = new Map<number, Song[]>();
    for (const [levelId, levelSongs] of songsByLevel) {
      if (selectedLevels.size > 0 && !selectedLevels.has(levelId)) continue;
      const filtered = applyFilters(levelSongs);
      if (filtered.length > 0) map.set(levelId, filtered);
    }
    return map;
  }, [songsByLevel, applyFilters, selectedLevels]);

  // All favorited songs (across all levels + user songs), filtered by search + level
  const favoriteSongs = useMemo(() => {
    const allSongs = [...songs, ...userSongs];
    return allSongs
      .filter((s) => favoritedItems[s.id])
      .filter((s) => matchesSearch(s, searchQuery))
      .filter((s) => selectedLevels.size === 0 || selectedLevels.has(s.levelId));
  }, [songs, userSongs, favoritedItems, searchQuery, selectedLevels]);

  const toggleLevel = useCallback((id: number | "my" | "fav" | "review") => {
    setCollapsedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const pillStyle = (active: boolean) => ({
    backgroundColor: active ? "var(--color-accent)" : "var(--color-bg-tertiary)",
    color: active ? "white" : "var(--color-text-secondary)",
    border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border)"}`,
  });

  const showUserSection =
    selectedLevels.size === 0 &&
    (filteredUserSongs.length > 0 || showForm);

  const totalFiltered = filteredUserSongs.length + [...filteredSongsByLevel.values()].reduce((sum, s) => sum + s.length, 0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Sticky search + filters */}
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

        {/* Status pills + Level dropdown */}
        <div className="flex items-center gap-1.5">
          <button
            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all"
            style={pillStyle(filterMode === "all")}
            onClick={() => setFilterMode("all")}
          >
            All
          </button>
          <button
            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all"
            style={pillStyle(filterMode === "favorites")}
            onClick={() => setFilterMode(filterMode === "favorites" ? "all" : "favorites")}
          >
            Favorites
          </button>
          <button
            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all"
            style={pillStyle(filterMode === "completed")}
            onClick={() => setFilterMode(filterMode === "completed" ? "all" : "completed")}
          >
            Completed
          </button>
          <div className="flex-1" />
          <LevelDropdown
            levelIds={sortedLevelIds}
            levelTitles={levelTitles}
            selected={selectedLevels}
            onChange={setSelectedLevels}
          />
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && <SongListSkeleton />}

      {/* Results count when filtering */}
      {(isSearching || filterMode !== "all" || selectedLevels.size > 0) && (
        <p className="text-xs mb-3" style={{ color: "var(--color-text-secondary)" }}>
          {totalFiltered} {filterMode === "favorites" ? "favorite" : filterMode === "completed" ? "completed" : ""} result{totalFiltered !== 1 ? "s" : ""}
        </p>
      )}

      {/* Add song button (admin only) */}
      {isAdmin && !showForm && (
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

      {/* Add song form (admin only) */}
      <AnimatePresence>
        {isAdmin && showForm && (
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

      {/* Review section */}
      {reviewSongs.length > 0 && (
        <section className="mb-6">
          <button
            onClick={() => toggleLevel("review")}
            className="flex w-full items-center gap-2 text-left mb-2"
          >
            <svg
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${collapsedLevels.has("review") ? "" : "rotate-90"}`}
              fill="var(--color-text-secondary)"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
              style={{ backgroundColor: "var(--color-warning, #f59e0b)", color: "white" }}
            >
              Review
            </span>
            <h2 className="text-base font-bold" style={{ color: "var(--color-text)" }}>
              New Songs
            </h2>
            <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              ({reviewSongs.length})
            </span>
          </button>
          {!collapsedLevels.has("review") && (
            <div className="space-y-2">
              {reviewSongs.map((song) => (
                <div key={song.id} className="relative">
                  <SongRow song={song} />
                  <button
                    onClick={() => removeReviewSong(song.id)}
                    className="absolute top-2 right-2 rounded-md px-2 py-1 text-[10px] font-medium transition-opacity hover:opacity-70"
                    style={{ backgroundColor: "var(--color-bg-tertiary)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
                  >
                    Discard
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Favorites section */}
      <AnimatePresence>
        {favoriteSongs.length > 0 && (
          <motion.section
            className="mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <button
              onClick={() => toggleLevel("fav")}
              className="flex w-full items-center gap-2 text-left mb-2"
            >
              <svg
                className={`h-3.5 w-3.5 shrink-0 transition-transform ${collapsedLevels.has("fav") ? "" : "rotate-90"}`}
                fill="var(--color-text-secondary)"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="var(--color-accent)" strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h2 className="text-base font-bold" style={{ color: "var(--color-text)" }}>
                Favorites
              </h2>
              <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                ({favoriteSongs.length})
              </span>
            </button>
            {!collapsedLevels.has("fav") && (
              <div className="space-y-2">
                {favoriteSongs.map((song) => (
                  <SongRow key={song.id} song={song} />
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* User songs section */}
      {showUserSection && (
        <section className="mb-6">
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
                <SongRow key={song.id} song={song} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Built-in songs by level */}
      {[...filteredSongsByLevel.keys()].sort((a, b) => a - b)
        .map((levelId) => {
          const levelSongs = filteredSongsByLevel.get(levelId)!;
          const isCollapsed = collapsedLevels.has(levelId);

          return (
            <section key={levelId} className="mb-6">
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
      {!isLoading && totalFiltered === 0 && (
        <p className="text-sm text-center py-12" style={{ color: "var(--color-text-secondary)" }}>
          {isSearching
            ? `No songs found for "${searchQuery}"`
            : filterMode === "favorites"
              ? "No favorite songs yet"
              : filterMode === "completed"
                ? "No completed songs yet"
                : "No songs available"}
        </p>
      )}
    </div>
  );
}
