import { useMemo } from "react";
import { create } from "zustand";
import type { Song, Exercise } from "@/shared/types";
import { fetchSongs, fetchExercises } from "./api";
import { buildLevels } from "./levels";

// Static fallback data
import { songs as staticSongs } from "./songs";
import { exercises as staticExercises } from "./exercises";

interface ContentState {
  songs: Song[];
  exercises: Exercise[];
  loaded: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
  refreshSongs: () => Promise<void>;
  refreshExercises: () => Promise<void>;
}

export const useContentStore = create<ContentState>()((set) => ({
  songs: staticSongs,
  exercises: staticExercises,
  loaded: false,
  error: null,

  fetchContent: async () => {
    try {
      const [songs, exercises] = await Promise.all([
        fetchSongs(),
        fetchExercises(),
      ]);
      set({ songs, exercises, loaded: true, error: null });
    } catch {
      // Fallback to static data — app works without backend
      set({ loaded: true, error: "Using offline data" });
    }
  },

  refreshSongs: async () => {
    try {
      const songs = await fetchSongs();
      set({ songs });
    } catch {
      // Keep existing data
    }
  },

  refreshExercises: async () => {
    try {
      const exercises = await fetchExercises();
      set({ exercises });
    } catch {
      // Keep existing data
    }
  },
}));

// Selectors
export function selectSongsForLevel(levelId: number) {
  return (s: ContentState) =>
    s.songs.filter((song) => song.levelId === levelId);
}

export function selectExercisesForLevel(levelId: number) {
  return (s: ContentState) =>
    s.exercises.filter((ex) => ex.levelId === levelId);
}

export function selectSongById(id: string) {
  return (s: ContentState) => s.songs.find((song) => song.id === id);
}

export function selectExerciseById(id: string) {
  return (s: ContentState) => s.exercises.find((ex) => ex.id === id);
}

export function selectAllSongs() {
  return (s: ContentState) => s.songs;
}

/** Hook that returns levels with dynamically populated songs/exercises from the content store */
export function useLevels() {
  const songs = useContentStore((s) => s.songs);
  const exercises = useContentStore((s) => s.exercises);
  return useMemo(() => buildLevels(songs, exercises), [songs, exercises]);
}
