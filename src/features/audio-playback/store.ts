import { create } from "zustand";

interface AudioState {
  currentTrack: string | null;
  isPlaying: boolean;
  playbackRate: number;
  play: (src: string) => void;
  pause: () => void;
  stop: () => void;
  setPlaybackRate: (rate: number) => void;
}

export const useAudioStore = create<AudioState>()((set) => ({
  currentTrack: null,
  isPlaying: false,
  playbackRate: 1,
  play: (src) => set({ currentTrack: src, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  stop: () => set({ currentTrack: null, isPlaying: false }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
}));
