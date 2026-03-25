import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-2-song-5",
  type: "song",
  levelId: 2,
  titleChinese: "欢乐颂",
  titleEnglish: "Ode to Joy",
  key: "D",
  timeSignature: "4/4",
  jianpu: `( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 3 - 2 - V |
( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 2 - 1 - V |
2 2 3 1 | 2 [ 3_ 4_ ] 3 1 | 2 [ 3_ 4_ ] 3 2 | 1 2 5, - V |
( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 2 - 1 - ||`,
  description: "Beethoven. Uses stepwise motion. Good for smooth finger transitions.",
  origin: "Beethoven",
  techniques: ["scale-walk", "step-patterns"],
};
