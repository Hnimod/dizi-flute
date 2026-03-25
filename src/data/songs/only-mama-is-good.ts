import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-2-song-3",
  type: "song",
  difficulty: 2,
  titleChinese: "世上只有妈妈好",
  titleEnglish: "Only Mama is Good",
  key: "C",
  timeSignature: "4/4",
  jianpu: `( 6 5 ) ( 3 5 ) | 6 - - 0 V | ( 3 5 ) ( 6 5 ) | 6 - - 0 V |
( 3 2 ) ( 1 2 ) | 3 - - 0 V | ( 5 3 ) ( 2 1 ) | 2 - - 0 V |
( 6 5 ) ( 3 5 ) | 6 - - 0 V | ( 3 2 ) ( 1 2 ) | ( 3 5 ) 6 - |
( 3 2 ) ( 1 2 ) | ( 3 5 ) 6 - | ( 5 3 ) ( 2 1 ) | 6, - - - ||`,
  description:
    'One of the most beloved Chinese songs. From the 1960 film "Mom Loves Me Once More."',
  origin: "Chinese film song (1960)",
  techniques: ["pentatonic-scale"],
};
