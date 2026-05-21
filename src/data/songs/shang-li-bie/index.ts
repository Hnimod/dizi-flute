import type { Song } from "@/shared/types";
import sheetImg from "./shang-li-bie.jpg";

export const song: Song = {
  id: "shang-li-bie",
  type: "song",
  difficulty: 5,
  titleChinese: "殇离别",
  titlePinyin: "Shāng Lí Bié",
  titleEnglish: "The Sorrow of Parting",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Chinese ancient-style (古风) ballad. Notation here is a stub — replace with a verified dizi score.",
  videoUrls: ["https://www.youtube.com/watch?v=41c9fkO94pU"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "殇离别 笛子",
    "殇离别 笛子 简谱",
    "殇离别 竹笛",
    "古风 殇离别 笛子",
    "Shang Li Bie dizi", "Sorrow of Parting", "guzhuang",
  ],
  sheetImage: sheetImg,
};
