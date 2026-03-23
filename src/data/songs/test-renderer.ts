import type { Song } from "@/shared/types";

export const testRendererSong: Song = {
  id: "test-renderer",
  type: "song",
  levelId: 0,
  titleEnglish: "Renderer Test — All Features",
  titleChinese: "渲染测试",
  key: "D",
  timeSignature: "4/4",
  tempo: 80,
  jianpu: `Renderer Test — All Features (渲染测试)
1=D  4/4
♩=80

1 2 3 4 | 5 6 7 1' | 1' 7 6 5 | 4 3 2 1 |
5, 6, 7, 1 | 2 3 5 6 | 1' 2' 1' 6 | 5 - - - |
[ 1_ 2_ ] [ 3_ 5_ ] 6 5 | [ 6_ 5_ ] [ 3_ 2_ ] 1 - | [ 1_ 2_ 3_ 5_ ] 6 - | [ 6_ 5_ 3_ 2_ ] 1 - |
[ 1__ 2__ 3__ 5__ ] [ 6__ 5__ 3__ 2__ ] | [ 1__ 2__ ] [ 3__ 5__ ] [ 6__ 5__ ] [ 3__ 2__ ] | [ 1_ 2_ 3_ ] 5 - | 6 [ 3_ 2_ 1_ ] - |
[ 6,_ 6,_ ] [ 1_ 6,_ ] [ 5,_ 3,_ ] 1 | [ 1'_ 2'_ ] [ 3'_ 1'_ ] 6 - | [ 1_ 2_ ] 3 [ 5_ 6_ ] 5 | [ 1_ 2_ 3_ 5_ 6_ 1'_ ] - - |
[ 6_ 6,__ 1_ ] [ 3_ 6__ 1__ 5_ ] | [ 1__ 2__ 3_ ] [ 5_ 6__ 1'__ ] | [ 6_ 6,__ ] [ 1__ 6,_ ] 5 - | [ 3__ 6__ 1__ 5__ ] [ 6_ 5_ ] - |
( 5 3 ) 2T 1T | ( 6 5 ) ( 3 2 ) | ( 1 2 3 5 ) 6 - | ( [ 1_ 2_ ] ) ( [ 3_ 5_ ] ) 6 - |
#4 5 b7 6 | #1' 2' b3' 1' | #5 - b6 - | 5 - - - |
3^ - - - | 5; 5; 3; 3; | 6> 5> 3> 2> | tr5 - - - |
1T 2T 3T 5T | ( 5 3 ) 2T - | 6,T - 5,T - | [ 1,_ 6,_ ] 5,T - - |
T:single [ 1_ 2_ 3_ 5_ ] | T:double [ 3_ 5_ 3_ 5_ ] | orn:vibrato 6 - - - | orn:slide-up 5 - - |
0 - 5 6 | 1' 0 0 5 | 0_ [ 1_ 2_ ] 3 - | 0 0 0 0 |
5 ~ 5 - - | 3 - 2 - | 1 2 3 - | 5 - - - |
5 3 - V | 2 - - V | ( 5 3 ) 2T V | 1 - - - ||`,
  description:
    "Test song exercising every renderer feature: octave up/down, beams, slurs, accidentals, articulations, tonguing, ornaments, ties, breath marks, rests, holds, double bar.",
  origin: "Test",
};
