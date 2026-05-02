import type { Song } from "@/shared/types";

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
  jianpu: `
6 [ 4_ 2_ ] 3 1 | 6, - - - |
2 ( 3_ 4_ ) 5 1 | 2 - - - |
( 5 6 ) 4 2 | 3 ( 2 1 ) - |
6, 1 2 - | 2 5 4 3 |
4 3 - - | 4 5 6 - |
5 4 3 [ 4_ 2_ ] | [ 2_ 3_ ] ( 1' 2' ) 1' |
4 5 6 7' | 1' - 5 6 ||
`,
  description:
    "Theme song from the 2019 Chinese xianxia drama The Untamed (陈情令), composed by Lin Hai (林海). Notation here is the verse-1 vocal melody (verified against flutenotes.ph letter notation). For Dan Tang's full dizi arrangement with intro, ornaments, and sixteenth runs, see the linked video scores.",
  origin: "陈情令 The Untamed OST, 林海, 2019",
  videoUrls: [
    "https://www.youtube.com/watch?v=0AOZIF1XjgI",
    "https://www.youtube.com/watch?v=r9Ipna7nMIY",
    "https://www.youtube.com/watch?v=Gxoyrju2SbM",
  ],
  techniques: ["long-tones", "rhythm-reading"],
};
