import type { Song } from "@/shared/types";

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
[ T:single 5,._ T:single 1__ ] [ T:single 1._ T:single 3__ ] [ orn:vibrato 6._ T:single 3__ ] T:single 5 | [ T:single 5._ T:single 6__ ] [ T:single 5._ T:single 3__ ] [ T:single 4._ T:single 3__ ] T:single 2 | [ T:single 6,._ T:single 2__ ] [ T:single 2._ T:single 4__ ] [ T:single 7._ T:single 7__ ] [ orn:vibrato 6._ T:single 5__ ] | [ T:single 4._ T:single 4__ ] [ T:single 4_ T:single 3_ ] [ T:single 6,_ ~( T:single 7,_ ] [ T:single 7,_ ~) T:single 1_ ] |
T:single 2 - - - | [ T:single 5,._ T:single 1__ ] [ T:single 1._ T:single 3__ ] [ orn:vibrato 6._ T:single 3__ ] T:single 5 | [ T:single 5._ T:single 6__ ] [ T:single 5._ T:single 3__ ] [ T:single 4._ T:single 3__ ] T:single 2 | [ T:single 6,._ T:single 2__ ] [ T:single 2._ T:single 4__ ] [ T:single 7._ T:single 7__ ] [ orn:vibrato 6._ T:single 5__ ] |
[ T:single 4._ T:single 4__ ] [ T:single 4_ T:single 3_ ] T:single 7, T:single 2 | T:single 1 - - - | orn:vibrato 6 [ T:single 6._ T:single 5__ ] ( [ T:single 4__ 5__ 6_ ] ) orn:vibrato 5 | ( [ T:single 2._ 3__ ] ) [ T:single 4._ T:single 2__ ] T:single 5 - |
orn:vibrato 6 orn:vibrato 5 ( [ T:single 2._ 3__ ] ) [ T:single 4._ T:single 2__ ] | T:single 5 - - - | [ orn:vibrato 6_ 0_ ] [ orn:vibrato 5_ 0_ ] T:single 4 0 | T:single 2 [ orn:vibrato 7._ T:single 6__ ] ( [ T:single 5._ 6__ ] ) [ 5_ 4_ ] |
0 ( [ T:single 5_ 6_ ] ) T:single 3. T:single 2_ | T:single 1 - - - ||`,
  description:
    "Theme song from the beloved anime Doraemon. A brisk, lively melody by 菊池俊辅 (Shunsuke Kikuchi), excellent for practicing tonguing and rhythm. Notation by 码农学笛子.",
  origin: "Doraemon OST, 菊池俊辅, 1979",
  techniques: ["tonguing", "step-patterns"],
};
