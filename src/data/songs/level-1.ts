import type { Song } from "@/shared/types";

export const level1Songs: Song[] = [
  {
    id: "level-1-song-1",
    type: "song",
    levelId: 1,
    titleChinese: "\u739B\u4E3D\u6709\u53EA\u5C0F\u7F8A\u7F94",
    titleEnglish: "Mary Had a Little Lamb",
    key: "D",
    timeSignature: "4/4",
    jianpu: `3 2 1 2 | 3 3 3 - V | 2 2 2 - | 3 5 5 - V |
3 2 1 2 | 3 3 3 3 | 2 2 3 2 | 1 - - - ||`,
    description: "Uses only notes 1-5. Perfect first song.",
  },
  {
    id: "level-1-song-2",
    type: "song",
    levelId: 1,
    titleEnglish: "Hot Cross Buns",
    key: "D",
    timeSignature: "4/4",
    jianpu: `3 2 1 - V | 3 2 1 - V | 1 1 2 2 | 3 2 1 - ||`,
    description: "Very simple, only 3 notes (1, 2, 3).",
  },
  {
    id: "level-1-song-3",
    type: "song",
    levelId: 1,
    titleEnglish: "Lightly Row",
    key: "D",
    timeSignature: "4/4",
    jianpu: `5 3 3 - | 4 2 2 - | 1 2 3 4 | 5 5 5 - V |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 3 - - - V |
2 2 2 2 | 2 3 4 - | 3 3 3 3 | 3 4 5 - V |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 1 - - - ||`,
    description: "A classic beginner melody using notes 1-5.",
  },
  {
    id: "level-1-song-4",
    type: "song",
    levelId: 1,
    titleChinese: "\u627E\u670B\u53CB",
    titleEnglish: "Finding Friends",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1 1 | 1 3 | 5 5 | 5 3 V |
4 2 | 3 1 | 2 - | 2 - V |
1 1 | 1 3 | 5 5 | 5 3 V |
4 2 | 3 1 | 2 1 | 1 - ||`,
    description: "A well-known Chinese children's song.",
    origin: "Chinese children's song",
  },
  {
    id: "level-1-song-5",
    type: "song",
    levelId: 1,
    titleChinese: "\u4E0A\u5B66\u6B4C",
    titleEnglish: "Going to School Song",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1 2 | 3 1 | 3 4 | 5 - V |
5 4 | 3 1 | 2 3 | 1 - V |
3 4 | 5 5 | 3 4 | 5 - V |
5 4 | 3 1 | 2 3 | 1 - ||`,
    description: "Another Chinese children's classic using notes 1-5.",
    origin: "Chinese children's song",
  },
];
