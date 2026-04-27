import type { Song } from "@/shared/types";

export const song: Song = {
  id: "wu-ji",
  type: "song",
  difficulty: 5,
  difficultyNote:
    "Wide range (lower 7̣ to upper 1̇), dotted-eighth + sixteenth rhythms, ties across bar lines. Diatonic in D — no accidentals.",
  titleChinese: "无羁",
  titleEnglish: "Wu Ji (Unrestrained)",
  key: "D",
  timeSignature: "4/4",
  jianpu: `
6 - 4 2 | 3 1 6 - | 2 [ 3_ 4_ ] 5 1 | 2 - - - |
6 - 4 2 | 3 [ 2._ 2__ ] 1 [ 7,_ 1_ ] | 2 - - [ 5__ 4__ 3__ 2__ ] | [ 2_ 3_ ] 3 - [ 4_ 5_ ] |
6. [ 5__ 4__ 3__ 2__ ] | 3 [ 2._ 2__ ] 1' - | [ 4_ 5_ ] 5 6 - | 4 [ 0_ 3_ ] [ 4_ 6_ ] |
2 - [ 0_ 1_ ] [ 1_ 6_ ] | 4. [ 5__ 6__ 5__ 6__ ] 1' | 2 - [ 0_ 5_ ] [ 6_ 1'_ ] | 4' 3 [ 2._ 2__ ] 1 |
[ 6_ 5_ ] 6 - [ 2_ 3_ ] [ 4_ 2_ ] [ 3_ 2_ ] | 1 6 - [ 0_ 5_ ] [ 6_ 1'_ ] | 4' 3 [ 2._ 2__ ] 1 | [ 6_ 5_ ] [ 6_ 3_ ] 2 [ 2_ 1_ ] [ 2_ 4_ ] [ 3_ 1_ ] |
2 - - - | 0 2, 0 0 0 ||
`,
  description:
    "Theme song from the 2019 Chinese xianxia drama The Untamed (陈情令). A sweeping, melancholic melody by Lin Hai (林海), widely covered on dizi. Notation transcribed from Dan Tang's notation book — please proofread rhythms.",
  origin: "陈情令 The Untamed OST, 林海, 2019",
  techniques: ["long-tones", "rhythm-reading"],
};
