import type { Song } from "@/shared/types";

// Beginner (difficulty 1-2)
import { song as hotCrossBuns } from "./beginner/hot-cross-buns";
import { song as laoLiuBan } from "./beginner/lao-liu-ban";
import { song as lightlyRow } from "./beginner/lightly-row";
import { song as maryHadALittleLamb } from "./beginner/mary-had-a-little-lamb";
import { song as twinkleTwinkleLittleStar } from "./beginner/twinkle-twinkle-little-star";

// Elementary (difficulty 3-4)
import { song as doraemon } from "./elementary/doraemon";
import { song as kangdingLoveSong } from "./elementary/kangding-love-song";
import { song as littleWhiteCabbage } from "./elementary/little-white-cabbage";

// Intermediate (difficulty 5-6)
import { song as beautifulMyth } from "./intermediate/beautiful-myth";
import { song as chiQingZhong } from "./intermediate/chi-qing-zhong";
import { song as daughtersLove } from "./intermediate/daughters-love";

// Advanced (difficulty 7+)
import { song as fuGuang } from "./advanced/fu-guang";

export const songs: Song[] = [
  hotCrossBuns,
  maryHadALittleLamb,
  lightlyRow,
  twinkleTwinkleLittleStar,
  laoLiuBan,
  doraemon,
  kangdingLoveSong,
  littleWhiteCabbage,
  daughtersLove,
  beautifulMyth,
  chiQingZhong,
  fuGuang,
];
