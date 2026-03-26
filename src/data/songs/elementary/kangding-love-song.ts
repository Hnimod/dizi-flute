import type { Song } from "@/shared/types";
import sheetImg from "./kangding-love-song.png";

export const song: Song = {
  id: "kangding-love-song",
  type: "song",
  difficulty: 3,
  difficultyNote:
    "Mixed eighth/sixteenth rhythms, dotted quarter patterns, pentatonic melody in moderate tempo.",
  titleChinese: "康定情歌",
  titleEnglish: "Kangding Love Song",
  key: "G",
  timeSignature: "2/4",
  tempo: 88,
  jianpu: `
( [ 3 5 ] [ 6 [ [ 6 5 ] ] ] | [ 6. [ 3 ] ] 2 ) V | ( [ 3 5 ] [ 6 [ [ 6 5 ] ] ] | 6 3. ) | ( [ 3 5 ] [ 6 [ [ 6 5 ] ] ] | [ 6. [ 3 ] ] 2 ) V | ( [ 5 3 ] [ [ 2 3 2 1 ] ] | 2_ 6,. ) V |
( [ 5 3 ] [ [ 2 3 2 1 ] ] ) [1. | ( 2_ 6,. ) :| [2. | ( 2_ 6. ) ||`,
  description:
    "One of China's most beloved folk songs, from the Kangding region of Sichuan. A lyrical love song with a flowing pentatonic melody. Great for practicing dotted rhythms and eighth-sixteenth beam patterns.",
  origin: "四川民歌 (Sichuan folk song)",
  techniques: ["pentatonic-scale"],
  sheetImage: sheetImg,
  videoUrls: ["https://www.youtube.com/watch?v=PSg8idfJoDI"],
};
