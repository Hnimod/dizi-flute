import type { Song } from "@/shared/types";
import sheetImg from "./lao-liu-ban.png";

export const song: Song = {
  id: "level-2-song-3",
  type: "song",
  difficulty: 2,
  difficultyNote: "Pentatonic melody, notes 1-6 with lower 5, 6,. Good for die yin practice.",
  titleChinese: "老六板",
  titleEnglish: "Old Six Beats",
  key: "C",
  timeSignature: "2/4",
  jianpu: `
( [ 3_ orn:fork 3_ ] [ 6,_ 2_ ]  | 1 ) ( [ 5,_ 6,_ ] | 1 ) ( [ 6,_ 1 ] | [ orn:fork 1 3 ] 2 ) ||`,
  description:
    "Classic folk piece for practicing overlapping tones (叠音). Pentatonic melody with smooth stepwise motion.",
  origin: "Traditional Chinese folk music (江南丝竹)",
  techniques: ["die-yin", "fork-fingering", "scale-walk"],
  sheetImage: sheetImg,
  videoUrls: ["https://www.youtube.com/watch?v=NbD_t8uZi-Y"],
};
