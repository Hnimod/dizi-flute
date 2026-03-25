import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-2-song-1",
  type: "song",
  levelId: 2,
  titleChinese: "小星星",
  titleEnglish: "Twinkle Twinkle Little Star",
  key: "D",
  timeSignature: "4/4",
  jianpu: `1 1 5 5 | 6 6 5 - V | 4 4 3 3 | 2 2 1 - V |
5 5 4 4 | 3 3 2 - V | 5 5 4 4 | 3 3 2 - V |
1 1 5 5 | 6 6 5 - V | 4 4 3 3 | 2 2 1 - ||`,
  description: "The perfect Level 2 starter. Uses notes 1-6.",
  techniques: ["scale-walk", "tonguing"],
};
