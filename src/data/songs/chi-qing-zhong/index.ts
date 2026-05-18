import type { Song } from "@/shared/types";
import sheetImg from "./chi-qing-zhong.jpg";

export const song: Song = {
  id: "chi-qing-zhong",
  type: "song",
  difficulty: 6,
  difficultyNote:
    "Wide register across octaves, accidentals (#4, #3), dense ornamental runs, complex structure with D.S. and 3 volta endings.",
  titleChinese: "痴情冢",
  titlePinyin: "Chī Qíng Zhǒng",
  titleEnglish: "Grave of Infatuation",
  key: "C",
  timeSignature: "4/4",
  tempo: 72,
  jianpu: `
    cue( (5)6 [ 1' 3' ] 2' [ 1' 7 ] | 6 [ 6 5 ] 3 [ 3 5 ] | 6 1' 7 5 | ~( 6, - - - | 6, ~) - - - )cue |
    |: (5,)6, [ ~( 1 (2)3 ~) ] 2 [ ~( 1 7, ~) ] | 6, [ ~( die 6, 5, ~) ] 3, - | [ 0 (5,)6, ] [ 7, 1 ] 7, [ 6, ~( 5, ] | [ 5, ~) ~( (5,)6, ] 6, ~) - - | (5,)6, [ ~( 1 (2)3 ~) ] 2 [ ~( 1 2 ~) ] |
    die 3 [ ~( 5 3 ~) ] da 3 - | [ 0 (5,)6, ] [ 7, 1 ] 7, [ 6, ~( 5, ] | [ 5, ~) ~( (5,)6, ] 6, ~) - - segno | (5)6 [ ~( (7)(6)5 6 ~) ] 3 [ ~( (#4)(3)2 1 ~) ] | 2 [ ~( da 2 die 3 ~) ] (5,)6, - |
    [ 2 die 3 ] [ 1 6, ] 2 [ ~( die 3 5 ~) ] | bo 3 - - - | (5)6 [ ~( (7)(6)5 6 ~) ] 3 [ ~( (#4)(3)2 1 ~) ] | 2 [ ~( da 2 die 3 ~) ] (5,)6, - | [ 2 die 3 ] [ 1 6, ] 5, [ ~( (6,)(5,)3, 5, ~) ] |
    [1. (5,)6, - - 0 | 0 0 0 0 :| [2. (5,)6, - 0 0 DS || [3. (5,)6, - - - | cue( 6 [ 3 5 ] [ 6 5 ] 6 |
    [ 6 5 ] 6 3 [ 2 1 ] | 2 3 6, - | [ 2 3 ] [ 1 6, ] 2 [ 3 5 ] | 3 - - - | 6 [ 5 6 ] 3 [ 2 1 ] |
    2 [ 2 3 ] 6, - | [ 2 3 ] [ 1 6, ] 5, [ 3, 5, ] | ~( 6, - - - | ~~ 6, - - - | 6, ~) - - - )cue ||
   `,
  description:
    "Insert song from the 2003 TV series Demi-Gods and Semi-Devils (天龙八部). A haunting, melancholic melody by Lin Hai (林海). Notation by 码农学笛子.",
  origin: "天龙八部 OST, 林海, 2003",
  techniques: ["long-tones", "pentatonic-scale"],
  sourceTongyin: "Re",
  staffBaseOctave: 5,
  sheetImage: sheetImg,
  videoUrls: [
    "https://www.youtube.com/watch?v=qjjROCqCfys&list=RDUMDTDFETGaQ&index=26",
    "https://www.youtube.com/watch?v=48OFA3uX4J8",
  ],
};
