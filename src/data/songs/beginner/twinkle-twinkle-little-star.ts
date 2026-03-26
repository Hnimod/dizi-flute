import type { Song } from "@/shared/types";
import sheetImg from "./twinkle-twinkle-little-star.png";

export const song: Song = {
  id: "level-2-song-1",
  type: "song",
  difficulty: 2,
  difficultyNote: "Notes 1-6, octave jump to 6, repeated patterns.",
  titleChinese: "小星星",
  titleEnglish: "Twinkle Twinkle Little Star",
  key: "C",
  timeSignature: "2/4",
  jianpu: `1 1 | 5 5 | 6 6 | 5 - V |
4 4 | 3 3 | 2 2 | 1 - V |
5 5 | 4 4 | 3 3 | 2 - V |
5 5 | 4 4 | 3 3 | 2 - V |
1 1 | 5 5 | 6 6 | 5 - V |
4 4 | 3 3 | 2 2 | 1 - ||`,
  description: "The perfect Level 2 starter. Uses notes 1-6.",
  techniques: ["scale-walk", "tonguing"],
  sheetImage: sheetImg,
};
