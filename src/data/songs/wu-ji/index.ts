import type { Song } from "@/shared/types";
import sheetImg from "./wu-ji.png";

export const song: Song = {
  id: "wu-ji",
  type: "song",
  difficulty: 4,
  difficultyNote:
    "Vocal melody — diatonic in D, no accidentals, mostly stepwise with slurs and one upper-octave reach to 1̇. Easier than the full Dan Tang dizi arrangement (see videoUrls).",
  titleChinese: "无羁",
  titleEnglish: "Wu Ji (Unrestrained)",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Theme song from the 2019 Chinese xianxia drama The Untamed (陈情令), composed by Lin Hai (林海). Notation here is the verse-1 vocal melody (verified against flutenotes.ph letter notation). For Dan Tang's full dizi arrangement with intro, ornaments, and sixteenth runs, see the linked video scores.",
  origin: "陈情令 The Untamed OST, 林海, 2019",
  videoUrls: [
    "https://www.youtube.com/watch?v=ecR6fCv7Ck4&list=PLawfnQAm1OL1hWLTAEeod9iH_81ZW3Ron&index=2",
  ],
  techniques: ["long-tones", "rhythm-reading"],
  sourceTongyin: "Re",
  sheetImage: sheetImg,
};
