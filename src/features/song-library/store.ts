import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Song } from "@/shared/types";

interface UserSongInput {
  titleEnglish: string;
  titleChinese?: string;
  titleVietnamese?: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  origin?: string;
}

interface SongLibraryState {
  userSongs: Song[];
  reviewSongs: Song[];
  addSong: (input: UserSongInput) => void;
  updateSong: (id: string, updates: Partial<UserSongInput>) => void;
  removeSong: (id: string) => void;
  addReviewSong: (song: Song) => void;
  removeReviewSong: (id: string) => void;
  promoteReviewSong: (id: string, levelId: number) => void;
}

export const useSongLibraryStore = create<SongLibraryState>()(
  persist(
    (set) => ({
      userSongs: [],
      reviewSongs: [],
      addSong: (input) =>
        set((state) => ({
          userSongs: [
            ...state.userSongs,
            {
              ...input,
              id: `user-song-${Date.now()}`,
              type: "song" as const,
              levelId: 0,
            },
          ],
        })),
      updateSong: (id, updates) =>
        set((state) => ({
          userSongs: state.userSongs.map((s) =>
            s.id === id ? { ...s, ...updates } : s,
          ),
        })),
      removeSong: (id) =>
        set((state) => ({
          userSongs: state.userSongs.filter((s) => s.id !== id),
        })),
      addReviewSong: (song) =>
        set((state) => ({
          reviewSongs: state.reviewSongs.some((s) => s.id === song.id)
            ? state.reviewSongs
            : [...state.reviewSongs, song],
        })),
      removeReviewSong: (id) =>
        set((state) => ({
          reviewSongs: state.reviewSongs.filter((s) => s.id !== id),
        })),
      promoteReviewSong: (id, levelId) =>
        set((state) => {
          const song = state.reviewSongs.find((s) => s.id === id);
          if (!song) return state;
          return {
            reviewSongs: state.reviewSongs.filter((s) => s.id !== id),
            userSongs: [...state.userSongs, { ...song, levelId }],
          };
        }),
    }),
    {
      name: "dizi-user-songs",
      partialize: (state) => ({ userSongs: state.userSongs }),
    },
  ),
);
