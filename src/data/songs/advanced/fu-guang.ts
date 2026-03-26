import type { Song } from "@/shared/types";
import sheetImg from "./fu-guang.png";

export const song: Song = {
  id: "fu-guang",
  type: "song",
  difficulty: 7,
  difficultyNote:
    "Fork fingering, double grace notes, ornament combos, sharp notes, 3/4 at 123 BPM, volta repeats.",
  titleChinese: "浮光",
  titleEnglish: "Fu Guang (The History)",
  key: "bD",
  timeSignature: "3/4",
  tempo: 123,
  jianpu: `
(2)3 fork 6 5 | (2)3 - [ (4)(3)2_ 3_ ] | 6, - (2)3 | (4)(3)2 - - | (2)3 fork 6 5 | (2)3 - [ (4)(3)2_ 3_ ] |
6, - (2)3 | fork 5 - - | (2)3 fork 6 5 | (2)3 - [ (4)(3)2_ 3_ ] | 6, - (2)3 | (4)(3)2 - - |
[1. 2T fork 5 fork 2 | fork 3 - - | #3  2 fork 5 | fork 3 - - :| [2. 2T 7, 5, |
( (6,)7, - - | 7, ) 1 7, | 5, - - ||`,
  origin: "Jannik",
  description:
    "Climax section. Play on A\u266D dizi. Features fork fingering (\u53C9\u53E3) technique.",
  techniques: ["fork-fingering", "grace-note", "ornament-combo"],
  sheetImage: sheetImg,
};
