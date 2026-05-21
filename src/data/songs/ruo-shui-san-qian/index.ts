import type { Song } from "@/shared/types";
import sheetImg from "./ruo-shui-san-qian.jpg";

export const song: Song = {
  id: "ruo-shui-san-qian",
  type: "song",
  difficulty: 5,
  titleChinese: "弱水三千",
  titlePinyin: "Ruò Shuǐ Sān Qiān",
  titleEnglish: "Three Thousand Feet of Weak Water",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Ancient-style (古风) Chinese ballad performed by Ruan'er (阮儿). The title is drawn from the idiom 弱水三千，只取一瓢饮 — out of vast waters, one drinks only a single ladle, a metaphor for devoted love. Notation here is a stub — replace with a verified dizi score.",
  origin: "阮儿 Ruan'er",
  videoUrls: ["https://www.youtube.com/watch?v=4fkrMrLuroc"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "弱水三千 笛子",
    "弱水三千 笛子 简谱",
    "弱水三千 竹笛",
    "阮儿 弱水三千 笛子",
    "Ruo Shui San Qian dizi",
    "Three Thousand Weak Water",
    "Ruan'er",
    "Ruany",
    "阮儿",
    "古风",
    "guzhuang",
    "ancient style",
  ],
  sheetImage: sheetImg,
};
