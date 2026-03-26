import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { difficultyLabels, songs as staticSongs } from "@/data";
import { SectionDivider } from "@/shared/ui/SectionDivider";
import { TempoGuide } from "@/features/lesson-viewer/TempoGuide";
import { useProgressStore } from "@/features/progress-tracking";
import { useSongLibraryStore } from "./store";
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

// ─── Difficulty Dropdown ───

function DifficultyDropdown({
  difficulties,
  selected,
  onChange,
}: {
  difficulties: number[];
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
}) {
  const [open, setOpen] = useState(false);

  const label =
    selected.size === 0
      ? "All"
      : [...selected].sort((a, b) => a - b).map((d) => `${d}`).join(", ");

  function toggle(d: number) {
    const next = new Set(selected);
    if (next.has(d)) next.delete(d);
    else next.add(d);
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
        <span className="truncate max-w-[120px]">{selected.size > 0 ? `Diff: ${label}` : "Difficulty"}</span>
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
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => toggle(d)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors"
                style={{ color: "var(--color-text)" }}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" strokeWidth={2}>
                  {selected.has(d) ? (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--color-accent)" stroke="var(--color-accent)" />
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ) : (
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="var(--color-border)" />
                  )}
                </svg>
                <span>{d} — {difficultyLabels[d] ?? ""}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Song Row ───

function SongRow({ song, expanded, onToggle }: { song: Song; expanded: boolean; onToggle: () => void }) {

  return (
    <div className="rounded-xl transition-colors" style={{ border: "1px solid var(--color-border)" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        className="flex w-full items-center gap-3 px-4 py-3 text-left cursor-pointer"
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
      </div>

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
                title={getTitle(song)}
                keySignature={song.key}
                timeSignature={song.timeSignature}
                origin={song.origin}
                className="rounded-lg p-4 overflow-x-auto"
                style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              />
              <div className="mt-3">
                <Link
                  to={`/song/${song.id}`}
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

type FilterMode = "all" | "favorites";

export function SongLibraryPage() {
  const songs = staticSongs;
  const userSongs = useSongLibraryStore((s) => s.userSongs);

  const favoritedItems = useProgressStore((s) => s.favoritedItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<number>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<number | "my" | "fav">>(() => {
    try {
      const saved = localStorage.getItem("dizi-library-collapsed");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  const [expandedSongs, setExpandedSongs] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("dizi-library-expanded-songs");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem("dizi-library-collapsed", JSON.stringify([...collapsedGroups]));
  }, [collapsedGroups]);

  useEffect(() => {
    localStorage.setItem("dizi-library-expanded-songs", JSON.stringify([...expandedSongs]));
  }, [expandedSongs]);

  const applyFilters = useCallback((list: Song[]) => {
    let filtered = list.filter((s) => matchesSearch(s, searchQuery));
    if (filterMode === "favorites") {
      filtered = filtered.filter((s) => favoritedItems[s.id]);
    }
    return filtered.sort((a, b) => {
      const aFav = favoritedItems[a.id] ? 1 : 0;
      const bFav = favoritedItems[b.id] ? 1 : 0;
      return bFav - aFav;
    });
  }, [searchQuery, filterMode, favoritedItems]);

  const songsByDifficulty = useMemo(() => {
    const grouped = new Map<number, Song[]>();
    for (const song of songs) {
      const list = grouped.get(song.difficulty) ?? [];
      list.push(song);
      grouped.set(song.difficulty, list);
    }
    return grouped;
  }, [songs]);

  const sortedDifficulties = useMemo(() => [...songsByDifficulty.keys()].sort((a, b) => a - b), [songsByDifficulty]);

  const isSearching = searchQuery.trim().length > 0;

  const filteredUserSongs = useMemo(
    () => applyFilters(userSongs),
    [userSongs, applyFilters],
  );

  const filteredSongsByDifficulty = useMemo(() => {
    const map = new Map<number, Song[]>();
    for (const [diff, diffSongs] of songsByDifficulty) {
      if (selectedDifficulties.size > 0 && !selectedDifficulties.has(diff)) continue;
      const filtered = applyFilters(diffSongs);
      if (filtered.length > 0) map.set(diff, filtered);
    }
    return map;
  }, [songsByDifficulty, applyFilters, selectedDifficulties]);

  const favoriteSongs = useMemo(() => {
    const allSongs = [...songs, ...userSongs];
    return allSongs
      .filter((s) => favoritedItems[s.id])
      .filter((s) => matchesSearch(s, searchQuery))
      .filter((s) => selectedDifficulties.size === 0 || selectedDifficulties.has(s.difficulty));
  }, [songs, userSongs, favoritedItems, searchQuery, selectedDifficulties]);

  const toggleSong = useCallback((id: string) => {
    setExpandedSongs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleGroup = useCallback((id: number | "my" | "fav") => {
    setCollapsedGroups((prev) => {
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
    selectedDifficulties.size === 0 &&
    filteredUserSongs.length > 0;

  const totalFiltered = filteredUserSongs.length + [...filteredSongsByDifficulty.values()].reduce((sum, s) => sum + s.length, 0);

  const allVisibleSongIds = useMemo(() => {
    const ids: string[] = [];
    for (const diffSongs of filteredSongsByDifficulty.values()) {
      for (const s of diffSongs) ids.push(s.id);
    }
    for (const s of filteredUserSongs) ids.push(s.id);
    for (const s of favoriteSongs) ids.push(s.id);
    return ids;
  }, [filteredSongsByDifficulty, filteredUserSongs, favoriteSongs]);

  const anyExpanded = allVisibleSongIds.some((id) => expandedSongs.has(id));

  const toggleAll = useCallback(() => {
    if (anyExpanded) {
      setExpandedSongs(new Set());
    } else {
      setExpandedSongs(new Set(allVisibleSongIds));
    }
  }, [anyExpanded, allVisibleSongIds]);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <h1
          className="text-2xl font-bold md:text-3xl"
          style={{ color: "var(--color-text)" }}
        >
          Songs
        </h1>
        <button
          onClick={toggleAll}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-secondary)" }}
          title={anyExpanded ? "Collapse all" : "Expand all"}
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {anyExpanded ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8l7-4 7 4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 16l7 4 7-4" />
              </>
            )}
          </svg>
          {anyExpanded ? "Collapse all" : "Expand all"}
        </button>
      </header>

      {/* Sticky search + filters */}
      <div
        className="sticky -top-5 z-10 -mx-4 px-4 pt-2 pb-3 mb-4 bg-(--color-bg) border-b border-(--color-border)"
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

        {/* Status pills + Difficulty dropdown */}
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
          <div className="flex-1" />
          <DifficultyDropdown
            difficulties={sortedDifficulties}
            selected={selectedDifficulties}
            onChange={setSelectedDifficulties}
          />
        </div>
      </div>

      {/* Results count when filtering */}
      {(isSearching || filterMode !== "all" || selectedDifficulties.size > 0) && (
        <p className="text-xs mb-3" style={{ color: "var(--color-text-secondary)" }}>
          {totalFiltered} {filterMode === "favorites" ? "favorite " : ""}result{totalFiltered !== 1 ? "s" : ""}
        </p>
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
            <SectionDivider
              label="Favorites"
              count={favoriteSongs.length}
              collapsed={collapsedGroups.has("fav")}
              onToggle={() => toggleGroup("fav")}
              icon={
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="var(--color-accent)" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
            >
              <div className="space-y-2">
                {favoriteSongs.map((song) => (
                  <SongRow key={song.id} song={song} expanded={expandedSongs.has(song.id)} onToggle={() => toggleSong(song.id)} />
                ))}
              </div>
            </SectionDivider>
          </motion.section>
        )}
      </AnimatePresence>

      {/* User songs section */}
      {showUserSection && (
        <section className="mb-6">
          <SectionDivider
            label="My Songs"
            count={filteredUserSongs.length}
            collapsed={collapsedGroups.has("my")}
            onToggle={() => toggleGroup("my")}
          >
            <div className="space-y-2">
              {filteredUserSongs.map((song) => (
                <SongRow key={song.id} song={song} expanded={expandedSongs.has(song.id)} onToggle={() => toggleSong(song.id)} />
              ))}
            </div>
          </SectionDivider>
        </section>
      )}

      {/* Songs by difficulty */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          .filter((diff) => selectedDifficulties.size === 0 || selectedDifficulties.has(diff))
          .map((diff) => {
            const diffSongs = filteredSongsByDifficulty.get(diff) ?? [];
            const isCollapsed = collapsedGroups.has(diff);
            return (
              <div key={diff}>
                <SectionDivider
                  label={`${difficultyLabels[diff] ?? ""} · ${diff}/10`}
                  count={diffSongs.length}
                  collapsed={isCollapsed}
                  onToggle={() => toggleGroup(diff)}
                >
                  {diffSongs.map((song) => (
                    <div key={song.id} className="mb-2">
                      <SongRow song={song} expanded={expandedSongs.has(song.id)} onToggle={() => toggleSong(song.id)} />
                    </div>
                  ))}
                </SectionDivider>
              </div>
            );
          })}
      </div>

      {/* No results */}
      {totalFiltered === 0 && (
        <p className="text-sm text-center py-12" style={{ color: "var(--color-text-secondary)" }}>
          {isSearching
            ? `No songs found for "${searchQuery}"`
            : filterMode === "favorites"
              ? "No favorite songs yet"
              : "No songs available"}
        </p>
      )}
    </div>
  );
}
