import type { Song } from "@/shared/types";
import sheetImg from "./da-yu.jpg";

export const song: Song = {
  id: "da-yu",
  type: "song",
  difficulty: 5,
  titleChinese: "大鱼",
  titlePinyin: "Dà Yú",
  titleEnglish: "Big Fish",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Theme song from the 2016 Chinese animated film Big Fish & Begonia (大鱼海棠), composed by Qian Lei (钱雷) with lyrics by Yin Yue (尹约), performed by Zhou Shen (周深). Notation here is a stub — replace with a verified dizi score.",
  origin: "大鱼海棠 Big Fish & Begonia OST, 钱雷 Qian Lei, 2016",
  videoUrls: ["https://www.youtube.com/watch?v=5pqPEta-J20"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "大鱼 笛子",
    "大鱼 笛子 简谱",
    "大鱼 竹笛",
    "大鱼海棠 笛子",
    "周深 大鱼 笛子",
    "Da Yu dizi",
    "Big Fish dizi",
    "Big Fish Begonia dizi",
    "Zhou Shen",
    "周深",
    "Qian Lei",
    "钱雷",
    "animated film",
  ],
  sheetImage: sheetImg,
};
