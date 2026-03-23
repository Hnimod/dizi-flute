import type { Song } from "@/shared/types";

const base = {
  type: "song" as const,
  levelId: 0,
  key: "D",
  timeSignature: "4/4",
  tempo: 60,
  origin: "Test",
};

export const testRendererSongs: Song[] = [
  {
    ...base,
    id: "test-01-notes-octaves",
    titleEnglish: "Test 01 — Notes & Octaves",
    jianpu: `Test 01 — Notes & Octaves
1=D  4/4
♩=60

1 2 3 4 | 5 6 7 1' | 2' 1' 7 6 | 5 4 3 2 |
1 - - - | 5, 6, 7, 1 | 2 3 5 6 | 1' 2' 1' - ||`,
    description: "Basic notes 1-7, octave up ('), octave down (,)",
  },
  {
    ...base,
    id: "test-02-beams-eighth",
    titleEnglish: "Test 02 — Eighth Note Beams",
    jianpu: `Test 02 — Eighth Note Beams
1=D  4/4
♩=60

[ 1_ 2_ ] [ 3_ 5_ ] 6 5 | [ 6_ 5_ ] [ 3_ 2_ ] 1 - |
[ 1_ 2_ 3_ ] 5 - - | 6 [ 3_ 2_ 1_ ] - - |
[ 1_ 2_ 3_ 5_ ] - - - | [ 6_ 5_ 3_ 2_ ] - - - |
[ 1_ 2_ 3_ 5_ 6_ 1'_ ] - | [ 6,_ 6,_ ] [ 1_ 6,_ ] [ 5,_ 3,_ ] 1 ||`,
    description: "2/3/4/6-note beam groups with eighth notes",
  },
  {
    ...base,
    id: "test-03-beams-sixteenth",
    titleEnglish: "Test 03 — Sixteenth & Mixed Beams",
    jianpu: `Test 03 — Sixteenth & Mixed Beams
1=D  4/4
♩=60

[ 1__ 2__ 3__ 5__ ] - - - | [ 1__ 2__ ] [ 3__ 5__ ] - - |
[ 6_ 6,__ 1_ ] - - - | [ 3_ 6__ 1__ 5_ ] - - - |
[ 1__ 2__ 3_ ] - - - | [ 5_ 6__ 1'__ ] - - - |
[ 3__ 6__ 1__ 5__ ] [ 6_ 5_ ] - - ||`,
    description: "Double beams (sixteenth), mixed eighth+sixteenth in same group",
  },
  {
    ...base,
    id: "test-04-slurs",
    titleEnglish: "Test 04 — Slurs & Arcs",
    jianpu: `Test 04 — Slurs & Arcs
1=D  4/4
♩=60

( 5 3 ) 2 1 | ( 6 5 ) ( 3 2 ) |
( 5 3 ) ( 2 1 ) | ( 1 2 3 ) - |
( [ 1_ 2_ ] ) ( [ 3_ 5_ ] ) 6 - | ( [ 6,_ 5,_ ] ) 1 - - ||`,
    description: "Slur arcs over note pairs, slurs with nested beams",
  },
  {
    ...base,
    id: "test-05-accidentals",
    titleEnglish: "Test 05 — Accidentals",
    jianpu: `Test 05 — Accidentals
1=D  4/4
♩=60

#4 5 b7 6 | #1' 2' b3' 1' |
#5 - b6 - | #2 b3 5 6 ||`,
    description: "Sharp (#) and flat (b) accidentals",
  },
  {
    ...base,
    id: "test-06-articulations",
    titleEnglish: "Test 06 — Articulations",
    jianpu: `Test 06 — Articulations
1=D  4/4
♩=60

3^ - - - | 5; 5; 3; 3; |
6> 5> 3> 2> | tr5 - - - ||`,
    description: "Fermata (^), staccato (;), accent (>), trill (tr)",
  },
  {
    ...base,
    id: "test-07-tonguing-breath",
    titleEnglish: "Test 07 — Tonguing & Breath",
    jianpu: `Test 07 — Tonguing & Breath
1=D  4/4
♩=60

1T 2T 3T 5T | ( 5 3 ) 2T - |
6,T - 5,T - | [ 1,_ 6,_ ] 5,T - - |
5 3 - - V | 2 - - - V | 1 - - - ||`,
    description: "Per-note tonguing (T suffix), breath marks (V above bar)",
  },
  {
    ...base,
    id: "test-08-annotations",
    titleEnglish: "Test 08 — Group Annotations",
    jianpu: `Test 08 — Group Annotations
1=D  4/4
♩=60

T:single [ 1_ 2_ 3_ 5_ ] - - | T:double [ 3_ 5_ 3_ 5_ ] - - |
orn:vibrato 6 - - - | orn:slide-up 5 - - - ||`,
    description: "T:single, T:double group annotations, orn:vibrato, orn:slide-up",
  },
  {
    ...base,
    id: "test-09-ties-holds",
    titleEnglish: "Test 09 — Ties & Holds",
    jianpu: `Test 09 — Ties & Holds
1=D  4/4
♩=60

5 ~ 5 - - | 3 - 2 - |
1 2 3 - | 5 - - - ||`,
    description: "Ties (~) connecting same-pitch notes, holds (-)",
  },
  {
    ...base,
    id: "test-10-rests",
    titleEnglish: "Test 10 — Rests",
    jianpu: `Test 10 — Rests
1=D  4/4
♩=60

0 - 5 6 | 1' 0 0 5 |
0 0 5 6 | 0 0 0 0 ||`,
    description: "Rests (0) in various positions",
  },
];
