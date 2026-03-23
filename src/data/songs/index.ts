import { level1Songs } from "./level-1";
import { level2Songs } from "./level-2";
import { level3Songs } from "./level-3";
import { level4Songs } from "./level-4";
import { level5Songs } from "./level-5";
import { level6Songs } from "./level-6";
import { level7Songs } from "./level-7";
import { testRendererSongs } from "./test-renderer";

export const songs = [
  ...testRendererSongs,
  ...level1Songs,
  ...level2Songs,
  ...level3Songs,
  ...level4Songs,
  ...level5Songs,
  ...level6Songs,
  ...level7Songs,
];
