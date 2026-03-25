import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-1-song-3",
  type: "song",
  levelId: 1,
  titleEnglish: "Lightly Row",
  key: "D",
  timeSignature: "4/4",
  jianpu: `5 3 3 - | 4 2 2 - | 1 2 3 4 | 5 5 5 - V |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 3 - - - V |
2 2 2 2 | 2 3 4 - | 3 3 3 3 | 3 4 5 - V |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 1 - - - ||`,
  description: "A classic beginner melody using notes 1-5.",
  techniques: ["scale-walk", "step-patterns", "tonguing"],
};
