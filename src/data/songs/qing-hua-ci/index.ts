import type { Song } from "@/shared/types";
import sheetImg from "./qing-hua-ci.jpg";

export const song: Song = {
  id: "qing-hua-ci",
  type: "song",
  difficulty: 5,
  titleChinese: "青花瓷",
  titlePinyin: "Qīng Huā Cí",
  titleEnglish: "Blue and White Porcelain",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Mandopop classic by Jay Chou (周杰伦) from his 2007 album On the Run! (我很忙); lyrics by Vincent Fang (方文山). Often arranged for dizi thanks to its zhongguofeng (Chinese-style) aesthetic. Notation here is a stub — replace with a verified dizi score.",
  origin: "我很忙 On the Run!, 周杰伦 Jay Chou, 2007",
  videoUrls: ["https://www.bilibili.com/video/BV1iL4y1Y7yR/"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "青花瓷 笛子",
    "青花瓷 笛子 简谱",
    "青花瓷 竹笛",
    "周杰伦 青花瓷 笛子",
    "Qing Hua Ci dizi",
    "Blue White Porcelain dizi",
    "Jay Chou",
    "周杰伦",
    "Vincent Fang",
    "方文山",
    "zhongguofeng",
    "中国风",
  ],
  sheetImage: sheetImg,
};
