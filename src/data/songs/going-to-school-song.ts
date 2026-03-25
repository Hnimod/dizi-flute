import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-1-song-5",
  type: "song",
  levelId: 1,
  titleChinese: "上学歌",
  titleEnglish: "Going to School Song",
  key: "D",
  timeSignature: "2/4",
  jianpu: `1 2 | 3 1 | 3 4 | 5 - V |
5 4 | 3 1 | 2 3 | 1 - V |
3 4 | 5 5 | 3 4 | 5 - V |
5 4 | 3 1 | 2 3 | 1 - ||`,
  description: "Another Chinese children's classic using notes 1-5.",
  origin: "Chinese children's song",
  techniques: ["tonguing", "step-patterns"],
};
