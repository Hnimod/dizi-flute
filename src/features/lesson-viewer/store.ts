import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VideoLinksState {
  videoLinks: Record<string, string[]>;
  addVideo: (itemId: string, url: string) => void;
  removeVideo: (itemId: string, url: string) => void;
}

export const useVideoLinksStore = create<VideoLinksState>()(
  persist(
    (set) => ({
      videoLinks: {},
      addVideo: (itemId, url) =>
        set((state) => {
          const existing = state.videoLinks[itemId] ?? [];
          if (existing.includes(url)) return state;
          return {
            videoLinks: {
              ...state.videoLinks,
              [itemId]: [...existing, url],
            },
          };
        }),
      removeVideo: (itemId, url) =>
        set((state) => {
          const existing = state.videoLinks[itemId] ?? [];
          const filtered = existing.filter((v) => v !== url);
          return {
            videoLinks: {
              ...state.videoLinks,
              [itemId]: filtered,
            },
          };
        }),
    }),
    { name: "dizi-video-links" },
  ),
);

const EMPTY: string[] = [];

export function selectVideos(itemId: string) {
  return (s: VideoLinksState) => s.videoLinks[itemId] ?? EMPTY;
}
