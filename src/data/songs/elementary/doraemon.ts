import type { Song } from "@/shared/types";
import sheetImg from "./doraemon.png";

export const song: Song = {
  id: "doraemon",
  type: "song",
  difficulty: 4,
  difficultyNote:
    "Brisk tempo (118 BPM), pervasive tonguing throughout, dotted eighth-note rhythms, vibrato ornaments. Great for rhythm and tonguing practice.",
  titleChinese: "哆啦A梦",
  titleEnglish: "Doraemon",
  key: "F",
  timeSignature: "4/4",
  tempo: 118,
  jianpu: `
[ T 5,. T [ 1 ] ] [ T 1. T [ 3 ] ] [ vib 6. T [ 3 ] ] T 5 | [ T 5. T [ 6 ] ] [ T 5. T [ 3 ] ] [ T 4. T [ 3 ] ] T 2 | [ T 6,. T [ 2 ] ] [ T 2. T [ 4 ] ] [ T 7. T [ 7 ] ] [ vib 6. T [ 5 ] ] | [ T 4. T [ 4 ] ] [ T 4 T 3 ] [ T 6, ~( T 7, ] [ T 7, ~) T 1 ] |
T 2 - - - | [ T 5,. T [ 1 ] ] [ T 1. T [ 3 ] ] [ vib 6. T [ 3 ] ] T 5 | [ T 5. T [ 6 ] ] [ T 5. T [ 3 ] ] [ T 4. T [ 3 ] ] T 2 | [ T 6,. T [ 2 ] ] [ T 2. T [ 4 ] ] [ T 7. T [ 7 ] ] [ vib 6. T [ 5 ] ] |
[ T 4. T [ 4 ] ] [ T 4 T 3 ] T 7, T 2 | T 1 - - - | vib 6 [ T 6. T [ 5 ] ] ( [ T [ 4 5 ] 6 ] ) vib 5 | ( [ T 2. [ 3 ] ] ) [ T 4. T [ 2 ] ] T 5 - |
vib 6 vib 5 ( [ T 2. [ 3 ] ] ) [ T 4. T [ 2 ] ] | T 5 - - - | [ vib 6 0 ] [ vib 5 0 ] T 4 0 | T 2 [ vib 7. T [ 6 ] ] ( [ T 5. [ 6 ] ] ) [ 5 4 ] |
0 ( [ T 5 6 ] ) T 3. T [ 2 ] | T 1 - - - ||`,
  description:
    "Theme song from the beloved anime Doraemon. A brisk, lively melody by 菊池俊辅 (Shunsuke Kikuchi), excellent for practicing tonguing and rhythm. Notation by 码农学笛子.",
  origin: "Doraemon OST, 菊池俊辅, 1979",
  techniques: ["tonguing", "step-patterns"],
  sheetImage: sheetImg,
};
