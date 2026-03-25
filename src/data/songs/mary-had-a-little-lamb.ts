import type { Song } from "@/shared/types";

export const song: Song = {
  id: "level-1-song-1",
  type: "song",
  difficulty: 1,
  titleChinese: "玛丽有只小羊羔",
  titleEnglish: "Mary Had a Little Lamb",
  key: "D",
  timeSignature: "4/4",
  jianpu: `3 2 1 2 | 3 3 3 - V | 2 2 2 - | 3 5 5 - V |
3 2 1 2 | 3 3 3 3 | 2 2 3 2 | 1 - - - ||`,
  description: "Uses only notes 1-5. Perfect first song.",
  techniques: ["scale-walk", "tonguing"],
};
