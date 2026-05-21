import type { Song } from "@/shared/types";
import sheetImg from "./bu-ran.jpg";

export const song: Song = {
  id: "bu-ran",
  type: "song",
  difficulty: 5,
  titleChinese: "不染",
  titlePinyin: "Bù Rǎn",
  titleEnglish: "Bu Ran (Unsullied)",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Theme song from the 2018 Chinese xianxia drama Ashes of Love (香蜜沉沉烬如霜), performed by Mao Buyi (毛不易). Notation here is a stub — replace with a verified score.",
  origin: "香蜜沉沉烬如霜 Ashes of Love OST, 毛不易, 2018",
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "不染 笛子",
    "不染 笛子 简谱",
    "不染 竹笛",
    "香蜜沉沉烬如霜 笛子",
    "Ashes of Love dizi",
    "Mao Buyi", "毛不易", "Unsullied", "xianxia",
  ],
  videoUrls: [
    "https://www.youtube.com/watch?v=H8RY2ZXYD6Y&list=PLawfnQAm1OL1hWLTAEeod9iH_81ZW3Ron&index=3",
  ],
  sheetImage: sheetImg,
};
