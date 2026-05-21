import type { Song } from "@/shared/types";
import sheetImg from "./zui-mei-de-qing-yuan.jpg";

export const song: Song = {
  id: "zui-mei-de-qing-yuan",
  type: "song",
  difficulty: 5,
  titleChinese: "最美的情缘",
  titlePinyin: "Zuì Měi De Qíng Yuán",
  titleEnglish: "The Most Beautiful Love Affair",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Mainland Chinese pop ballad by Wang Qi (王琪). Notation here is a stub — replace with a verified dizi score.",
  origin: "王琪",
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "最美的情缘 笛子",
    "最美的情缘 笛子 简谱",
    "最美的情缘 竹笛",
    "王琪 最美的情缘 笛子",
    "Wang Qi dizi", "Most Beautiful Love Affair",
  ],
  videoUrls: ["https://www.youtube.com/watch?v=18tbynOenC4"],
  sheetImage: sheetImg,
};
