import type { Song } from "@/shared/types";

// Beginner (difficulty 1-2)
import { song as hotCrossBuns } from "./beginner/hot-cross-buns";
import { song as lightlyRow } from "./beginner/lightly-row";
import { song as maryHadALittleLamb } from "./beginner/mary-had-a-little-lamb";
import { song as twinkleTwinkleLittleStar } from "./beginner/twinkle-twinkle-little-star";

// Elementary (difficulty 3-4)
import { song as littleWhiteCabbage } from "./elementary/little-white-cabbage";
import { song as sweetHoney } from "./elementary/sweet-honey";
import { song as theMoonRepresentsMyHeart } from "./elementary/the-moon-represents-my-heart";

// Advanced (difficulty 7+)
import { song as fuGuang } from "./advanced/fu-guang";

export const songs: Song[] = [
  hotCrossBuns,
  maryHadALittleLamb,
  lightlyRow,
  twinkleTwinkleLittleStar,
  littleWhiteCabbage,
  theMoonRepresentsMyHeart,
  sweetHoney,
  fuGuang,
];
