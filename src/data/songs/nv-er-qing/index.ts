import type { Song } from "@/shared/types";
import sheetPage1 from "./nv-er-qing-1.png";
import sheetPage2 from "./nv-er-qing-2.png";

export const song: Song = {
  id: "nv-er-qing",
  type: "song",
  difficulty: 5,
  difficultyNote:
    "Dense ornamental runs (又音, tonguing), dotted rhythms, sixteenth-note passages, wide register, repeat structure with volta brackets.",
  titleChinese: "女儿情",
  titlePinyin: "Nǚ Ér Qíng",
  titleEnglish: "Maiden's Love",
  key: "bE",
  timeSignature: "4/4",
  tempo: 70,
  jianpu: ``,
  description:
    "Theme from the 1986 TV series Journey to the West (西游记). A tender, lyrical melody by 许镜清, beloved across generations and recently trending on Douyin/TikTok for dizi covers. Notation by 码农学笛子.",
  origin: "西游记 OST, 许镜清, 1986",
  techniques: ["long-tones", "pentatonic-scale"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "女儿情 笛子",
    "女儿情 笛子 简谱",
    "女儿情 竹笛",
    "西游记 女儿情 笛子",
    "许镜清 女儿情 笛子",
    "Nv Er Qing dizi",
    "Maiden's Love dizi",
    "Daughter's Love dizi",
    "Journey to the West",
    "Xu Jingqing",
    "许镜清",
    "西游记",
  ],
  videoUrls: [
    "https://www.youtube.com/watch?v=Z61ewYYC3y4&list=PLawfnQAm1OL1hWLTAEeod9iH_81ZW3Ron&index=17&pp=iAQB8AUBsAgC",
  ],
  sheetImage: [sheetPage1, sheetPage2],
};
