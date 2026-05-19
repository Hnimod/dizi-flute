import type { Song } from "@/shared/types";
import sheetImg from "./kan-wo-yue-ma-yang-bian.jpg";

export const song: Song = {
  id: "kan-wo-yue-ma-yang-bian",
  type: "song",
  difficulty: 8,
  titleChinese: "看我跃马扬鞭",
  titlePinyin: "Kàn Wǒ Yuè Mǎ Yáng Biān",
  titleEnglish: "Watch Me Gallop and Crack the Whip",
  key: "D",
  timeSignature: "2/4",
  sheetImage: sheetImg,
  videoUrls: [
    "https://www.youtube.com/watch?v=nkwYxWzYxUo&list=PLawfnQAm1OL1hWLTAEeod9iH_81ZW3Ron&index=15",
  ],
  jianpu: `
    |: cue( [ 0 0 ] [ 0 0 ] [ 0 0 ] [ 0 0 ] )cue :| T 5, die 5, [ ~( 6, 1 ~) ] da 1 V | (2)3 da 3 [ ~( 5 bo 6 ~) ] 5 - V | (5)6. die [ 6 ] [ ~( 5 6 ~) ] 3 V |
    [ 2 3 ] [ 5 6 ] bo 1 - V | [ (7,)6, da 6, ] [ die 6, 5, ] [ 6, ~( 1 ] [ 1 ~) 0 ] V | [ (2)3 da 3 ] [ die 3 bo 2 ] [ 1 ~( 2 ] [ 2 ~) 0 ] V | [ T 5 da 5 ] [ T 5 3 ] [ bo 6 ~( 3 ] [ 3 ~) 0 ] V |
    [ (1)2 die 2 ] [ da 2 1 ] [ 3 ~( 5 ] [ 5 ~) 0 ] V | bo 5. [ 3 ] (5)6 da 6 | [ ~( 5. [ 6 ] ] [ 5 4 ~) ] 3 V [ (3)(2)1 2 ] | bo 3. V [ 3 ] [ ~( 2 3 ] [ 5 6 ~) ] | bo 5 - - - V |
    |: bo 1'. [ 7 ] [ ~( 5 6 ~) ] die 6 V | bo 5. [ 3 ] 5 da 5 V | (1)2. [ 3 ] [ ~( 1 bo 7, ~) ] 6, V | (1)2. [ 1 ] ~( die 2 3 ~) |
    da 3 - - - V | (2)3. [ 2 ] die 3 5 | [ ~( 1 bo 3 ] [ 2 1 ~) ] die 2 V [ (1)2 3 ] | 5 (7,)(6,)5, - V [ ~( 6, 1 ~) ] |
    [1. da 1 - - - :| [2. ~( da 1 - - - | 1 ~) - - - ||
  `,
};
