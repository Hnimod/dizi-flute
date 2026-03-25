import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-2-song-2",
  type: "song",
  difficulty: 3,
  titleChinese: "小白菜",
  titleEnglish: "Little White Cabbage",
  key: "D",
  timeSignature: "3/4",
  tempo: 69,
  jianpu: `( 5T 3 ) 3T | 2T - - V | ( 5 3 ) ( [ 3_ 2_ ] ) | 1T - - V | ( 1T 3 ) 2T |
6,T - - V | 2T 1T ( [ 1_T 6,_ ] ) | 5,T - - V | 2T 2T 3T | 2T - - V |
( 5T 3 ) ( [ 3_T 2_ ] ) | 1T - - V | ( 1T 3 ) 2T  | 6,T - - V | ( 2T 1T ) ( [ 1_ 6,_ ] ) |
5,T - - V | 6,T ( [ 1_T 6,_ ] ) 5,T V | 6,T ( [ 1_T 6,_ ] ) 5,T V | 6,T 2T ( [ 1_ 6,_ ] ) | 5,T - - ||`,
  description: "A sorrowful Chinese folk song. Pentatonic \u2014 uses only 1, 2, 3, 5, 6.",
  origin: "Hebei folk song",
  techniques: ["pentatonic-scale", "tonguing"],
};
