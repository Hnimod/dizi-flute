import type { Song } from "@/shared/types";
import sheetImg from "./cang-hai-yi-sheng-xiao.jpg";

export const song: Song = {
  id: "cang-hai-yi-sheng-xiao",
  type: "song",
  difficulty: 4,
  titleChinese: "沧海一声笑",
  titlePinyin: "Cāng Hǎi Yī Shēng Xiào",
  titleEnglish: "Laugh over the Vast Sea",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Iconic wuxia theme from the 1990 film Swordsman (笑傲江湖), composed by James Wong (黄霑). Pentatonic melody often arranged for dizi. Notation here is a stub — replace with a verified dizi score.",
  origin: "笑傲江湖 Swordsman OST, 黄霑 James Wong, 1990",
  videoUrls: ["https://www.youtube.com/watch?v=wyrRLi6zABA"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "沧海一声笑 笛子",
    "沧海一声笑 笛子 简谱",
    "沧海一声笑 竹笛",
    "笑傲江湖 笛子",
    "Cang Hai Yi Sheng Xiao dizi",
    "Laugh Vast Sea",
    "Swordsman OST",
    "James Wong",
    "黄霑",
    "wuxia",
  ],
  sheetImage: sheetImg,
};
