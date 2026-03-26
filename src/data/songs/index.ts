import type { Song } from "@/shared/types";

// Beginner (difficulty 1-2)
import { song as hotCrossBuns } from "./beginner/hot-cross-buns";
import { song as lightlyRow } from "./beginner/lightly-row";
import { song as maryHadALittleLamb } from "./beginner/mary-had-a-little-lamb";
import { song as twinkleTwinkleLittleStar } from "./beginner/twinkle-twinkle-little-star";
import { song as laoLiuBan } from "./beginner/lao-liu-ban";

// Elementary (difficulty 3-4)
import { song as doraemon } from "./elementary/doraemon";
import { song as littleWhiteCabbage } from "./elementary/little-white-cabbage";
import { song as sweetHoney } from "./elementary/sweet-honey";
import { song as theMoonRepresentsMyHeart } from "./elementary/the-moon-represents-my-heart";

// Intermediate (difficulty 5-6)
import { song as beautifulMyth } from "./intermediate/beautiful-myth";
import { song as blueAndWhitePorcelain } from "./intermediate/blue-and-white-porcelain";
import { song as daughtersLove } from "./intermediate/daughters-love";
import { song as chiQingZhong } from "./intermediate/chi-qing-zhong";

// Advanced (difficulty 7+)
import { song as fuGuang } from "./advanced/fu-guang";

export const songs: Song[] = [
  hotCrossBuns,
  maryHadALittleLamb,
  lightlyRow,
  twinkleTwinkleLittleStar,
  laoLiuBan,
  doraemon,
  littleWhiteCabbage,
  theMoonRepresentsMyHeart,
  sweetHoney,
  daughtersLove,
  blueAndWhitePorcelain,
  beautifulMyth,
  chiQingZhong,
  fuGuang,
];
