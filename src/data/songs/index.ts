import type { Song } from "@/shared/types";

// Beginner (difficulty 1-2)
import { song as hotCrossBuns } from "./beginner/hot-cross-buns";
import { song as maryHadALittleLamb } from "./beginner/mary-had-a-little-lamb";
import { song as lightlyRow } from "./beginner/lightly-row";
import { song as twinkleTwinkleLittleStar } from "./beginner/twinkle-twinkle-little-star";
import { song as onlyMamaIsGood } from "./beginner/only-mama-is-good";
import { song as odeToJoy } from "./beginner/ode-to-joy";

// Elementary (difficulty 3-4)
import { song as littleWhiteCabbage } from "./elementary/little-white-cabbage";
import { song as theMoonRepresentsMyHeart } from "./elementary/the-moon-represents-my-heart";
import { song as sweetHoney } from "./elementary/sweet-honey";

// Advanced (difficulty 7+)
import { song as fuGuang } from "./advanced/fu-guang";

export const songs: Song[] = [
  hotCrossBuns,
  maryHadALittleLamb,
  lightlyRow,
  twinkleTwinkleLittleStar,
  onlyMamaIsGood,
  odeToJoy,
  littleWhiteCabbage,
  theMoonRepresentsMyHeart,
  sweetHoney,
  fuGuang,
];
