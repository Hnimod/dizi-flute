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
[ T 5,._ T 1__ ] [ T 1._ T 3__ ] [ vib 6._ T 3__ ] T 5 | [ T 5._ T 6__ ] [ T 5._ T 3__ ] [ T 4._ T 3__ ] T 2 | [ T 6,._ T 2__ ] [ T 2._ T 4__ ] [ T 7._ T 7__ ] [ vib 6._ T 5__ ] | [ T 4._ T 4__ ] [ T 4_ T 3_ ] [ T 6,_ ~( T 7,_ ] [ T 7,_ ~) T 1_ ] |
T 2 - - - | [ T 5,._ T 1__ ] [ T 1._ T 3__ ] [ vib 6._ T 3__ ] T 5 | [ T 5._ T 6__ ] [ T 5._ T 3__ ] [ T 4._ T 3__ ] T 2 | [ T 6,._ T 2__ ] [ T 2._ T 4__ ] [ T 7._ T 7__ ] [ vib 6._ T 5__ ] |
[ T 4._ T 4__ ] [ T 4_ T 3_ ] T 7, T 2 | T 1 - - - | vib 6 [ T 6._ T 5__ ] ( [ T 4__ 5__ 6_ ] ) vib 5 | ( [ T 2._ 3__ ] ) [ T 4._ T 2__ ] T 5 - |
vib 6 vib 5 ( [ T 2._ 3__ ] ) [ T 4._ T 2__ ] | T 5 - - - | [ vib 6_ 0_ ] [ vib 5_ 0_ ] T 4 0 | T 2 [ vib 7._ T 6__ ] ( [ T 5._ 6__ ] ) [ 5_ 4_ ] |
0 ( [ T 5_ 6_ ] ) T 3. T 2_ | T 1 - - - ||`,
  description:
    "Theme song from the beloved anime Doraemon. A brisk, lively melody by 菊池俊辅 (Shunsuke Kikuchi), excellent for practicing tonguing and rhythm. Notation by 码农学笛子.",
  origin: "Doraemon OST, 菊池俊辅, 1979",
  techniques: ["tonguing", "step-patterns"],
  sheetImage: sheetImg,
};
