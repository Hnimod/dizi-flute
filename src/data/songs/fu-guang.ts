import type { Song } from "@/shared/types";

export const song: Song = {
  id: "fu-guang",
  type: "song",
  levelId: 4,
  titleChinese: "浮光",
  titleEnglish: "Fu Guang (The History)",
  key: "bD",
  timeSignature: "3/4",
  tempo: 123,
  jianpu: `
(2)3 orn:fork 6 5 | (2)3 - [ (4)(3)2_ 3_ ] | 6, - (2)3 | (4)(3)2 - - | (2)3 orn:fork 6 5 | (2)3 - [ (4)(3)2_ 3_ ] |
6, - (2)3 | orn:fork 5 - - | (2)3 orn:fork 6 5 | (2)3 - [ (4)(3)2_ 3_ ] | 6, - (2)3 | (4)(3)2 - - |
[1. 2T orn:fork 5 orn:fork 2 | orn:fork 3 - - | #3  2 orn:fork 5 | orn:fork 3 - - :|
[2. 2T 7, 5, | ( (6,)7, - - | 7, ) 1 7, | 5, - - ||`,
  origin: "Jannik",
  description: "Climax section. Play on A\u266D dizi. Features fork fingering (\u53C9\u53E3) technique.",
  techniques: ["fork-fingering", "grace-note", "ornament-combo"],
};
