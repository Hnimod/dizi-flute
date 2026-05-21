import type { Song } from "@/shared/types";
import sheetImg from "./to-loves-end.jpg";

export const song: Song = {
  id: "to-loves-end",
  type: "song",
  difficulty: 5,
  titleEnglish: "To Love's End",
  key: "D",
  timeSignature: "4/4",
  jianpu: ``,
  description:
    "Instrumental piece from the Inuyasha (犬夜叉) anime OST, composed by Kaoru Wada (和田薫). Melancholic flute-led theme widely covered on dizi. Notation here is a stub — replace with a verified dizi score.",
  origin: "犬夜叉 Inuyasha OST, 和田薫 Kaoru Wada",
  videoUrls: ["https://www.youtube.com/watch?v=Kb_mfQZNIyE"],
  // Copy-paste these into Baidu / Bilibili / YouTube to find dizi recordings.
  searchKeywords: [
    "To Love's End 笛子",
    "犬夜叉 笛子",
    "犬夜叉 笛子 简谱",
    "犬夜叉 To Love's End 竹笛",
    "Inuyasha dizi",
    "Inuyasha bamboo flute",
    "Kaoru Wada",
    "和田薫",
    "anime OST",
  ],
  sheetImage: sheetImg,
};
