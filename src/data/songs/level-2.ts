import type { Song } from "@/shared/types";

export const level2Songs: Song[] = [
  {
    id: "level-2-song-1",
    type: "song",
    levelId: 2,
    titleChinese: "\u5C0F\u661F\u661F",
    titleEnglish: "Twinkle Twinkle Little Star",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 1 5 5 | 6 6 5 - V | 4 4 3 3 | 2 2 1 - V |
5 5 4 4 | 3 3 2 - V | 5 5 4 4 | 3 3 2 - V |
1 1 5 5 | 6 6 5 - V | 4 4 3 3 | 2 2 1 - ||`,
    description: "The perfect Level 2 starter. Uses notes 1-6.",
  },
  {
    id: "level-2-song-2",
    type: "song",
    levelId: 2,
    titleChinese: "\u5C0F\u767D\u83DC",
    titleEnglish: "Little White Cabbage",
    key: "D",
    timeSignature: "3/4",
    tempo: 69,
    jianpu: `( 5T 3 ) 3T | 2T - - V | ( 5 3 ) ( [ 3_ 2_ ] ) | 1T - - V | ( 1T 3 ) 2T |
6,T - - V | 2T 1T ( [ 1_T 6,_ ] ) | 5,T - - V | 2T 2T 3T | 2T - - V |
( 5T 3 ) ( [ 3_T 2_ ] ) | 1T - - V | ( 1T 3 ) 2T  | 6,T - - V | ( 2T 1T ) ( [ 1_ 6,_ ] ) |
5,T - - V | 6,T ( [ 1_T 6,_ ] ) 5,T V | 6,T ( [ 1_T 6,_ ] ) 5,T V | 6,T 2T ( [ 1_ 6,_ ] ) | 5,T - - ||`,
    description: "A sorrowful Chinese folk song. Pentatonic \u2014 uses only 1, 2, 3, 5, 6.",
    origin: "Hebei folk song",
  },
  {
    id: "level-2-song-3",
    type: "song",
    levelId: 2,
    titleChinese: "\u4E16\u4E0A\u53EA\u6709\u5988\u5988\u597D",
    titleEnglish: "Only Mama is Good",
    key: "C",
    timeSignature: "4/4",
    jianpu: `( 6 5 ) ( 3 5 ) | 6 - - 0 V | ( 3 5 ) ( 6 5 ) | 6 - - 0 V |
( 3 2 ) ( 1 2 ) | 3 - - 0 V | ( 5 3 ) ( 2 1 ) | 2 - - 0 V |
( 6 5 ) ( 3 5 ) | 6 - - 0 V | ( 3 2 ) ( 1 2 ) | ( 3 5 ) 6 - |
( 3 2 ) ( 1 2 ) | ( 3 5 ) 6 - | ( 5 3 ) ( 2 1 ) | 6, - - - ||`,
    description:
      'One of the most beloved Chinese songs. From the 1960 film "Mom Loves Me Once More."',
    origin: "Chinese film song (1960)",
  },
  {
    id: "level-2-song-4",
    type: "song",
    levelId: 2,
    titleChinese: "\u4E24\u53EA\u8001\u864E",
    titleEnglish: "Two Tigers",
    key: "D",
    timeSignature: "4/4",
    jianpu: `||: 1 2 3 1 | 1 2 3 1 V | 3 4 5 - | 3 4 5 - V |
[ 5_ 6_ ] [ 5_ 4_ ] | 3 - 1 - | [ 5_ 6_ ] [ 5_ 4_ ] | 3 - 1 - V |
1 5, 1 - | 1 5, 1 - :||`,
    description:
      "A well-known children's song (Fr\u00E8re Jacques). Great for rhythmic confidence.",
  },
  {
    id: "level-2-song-5",
    type: "song",
    levelId: 2,
    titleChinese: "\u6B22\u4E50\u9882",
    titleEnglish: "Ode to Joy",
    key: "D",
    timeSignature: "4/4",
    jianpu: `( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 3 - 2 - V |
( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 2 - 1 - V |
2 2 3 1 | 2 [ 3_ 4_ ] 3 1 | 2 [ 3_ 4_ ] 3 2 | 1 2 5, - V |
( 3 3 4 5 ) | ( 5 4 3 2 ) | ( 1 1 2 3 ) | 2 - 1 - ||`,
    description: "Beethoven. Uses stepwise motion. Good for smooth finger transitions.",
    origin: "Beethoven",
  },
  {
    id: "level-2-song-6",
    type: "song",
    levelId: 2,
    titleChinese: "\u65B0\u5E74\u597D",
    titleEnglish: "Happy New Year",
    key: "D",
    timeSignature: "3/4",
    jianpu: `1 1 1 | 5 - - V | 3 3 3 | 1 - - V |
1 3 5 | 5 4 3 | 2 - - V | 2 3 4 |
4 3 2 | 3 - - V | 1 3 2 | 5, - - V |
1 3 2 | 5, - - V | 1 2 3 | 1 - - ||`,
    description: "Simple and festive. In 3/4 time.",
    origin: "Chinese traditional",
  },
  {
    id: "level-2-song-7",
    type: "song",
    levelId: 2,
    titleChinese: "\u6708\u4EAE\u4EE3\u8868\u6211\u7684\u5FC3",
    titleEnglish: "The Moon Represents My Heart",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `( 1 1 ) 1 - | ( 3 5 ) 6 - | ( 6 6 ) 5 - | 5 - - - V |
( 5 5 ) 5 - | ( 6 5 ) 3 - | ( 2 2 ) 1 - | 1 - - - V |
( 1 1 ) 1 - | ( 3 5 ) 6 - | ( 6 6 ) 5 - | 5 - - - V |
( 5 5 ) 3 - | ( 2 3 ) 2 - | ( 1 1 ) 1 - | 1 - - - V |
3 - 5 - | 6 - 1' - | ( 6 - ) ( 5 - ) | 5 - - - V |
3 - 5 - | 6 - 1' - | ( 6 - ) ( 5 - ) | 5 - - - V |
( 1 1 ) 1 - | ( 3 5 ) 6 - | ( 6 6 ) 5 - | 5 - - - V |
( 5 5 ) 3 - | ( 2 3 ) 2 - | ( 1 1 ) 1 - | 1 - - - ||`,
    description: "Teresa Teng (1977). One of the most beloved Chinese songs worldwide.",
    origin: "Teresa Teng, 1977",
  },
  {
    id: "level-2-song-8",
    type: "song",
    levelId: 2,
    titleChinese: "\u751C\u871C\u871C",
    titleVietnamese: "\u0110i\u1EC1m M\u1EADt M\u1EADt",
    titleEnglish: "Sweet Honey",
    key: "D",
    timeSignature: "4/4",
    tempo: 96,
    jianpu: `( 3 3 ) ( 5 6 ) | 5 - - - V | ( 3 3 ) ( 2 3 ) | 5 - - - V |
( 6 6 ) ( 5 6 ) | 1' - ( 6 5 ) | ( 3 3 ) ( 2 1 ) | 2 - - - V |
( 3 3 ) ( 5 6 ) | 5 - - - V | ( 3 3 ) ( 2 3 ) | 5 - - - V |
( 6 6 ) ( 5 6 ) | 1' - ( 6 5 ) | ( 3 2 ) ( 1 2 ) | 1 - - - V |

5, 1 2 3 | ( 2 1 ) ( 2 3 ) | 5, 1 2 3 | 2 - - - V |
5, 1 2 3 | ( 5 6 ) ( 5 3 ) | ( 2 1 ) ( 2 3 ) | 2 - - - V |

( 3 3 ) ( 5 6 ) | 5 - - - V | ( 3 3 ) ( 2 3 ) | 5 - - - V |
( 6 6 ) ( 5 6 ) | 1' - ( 6 5 ) | ( 3 2 ) ( 1 2 ) | 1 - - - ||`,
    description: "Teresa Teng, 1979. Cheerful and instantly recognizable. Complete with verse 2.",
    origin: "Teresa Teng, 1979",
  },
  {
    id: "level-2-song-9",
    type: "song",
    levelId: 2,
    titleVietnamese: "Ch\u00E1u L\u00EAn Ba",
    titleEnglish: "Turning Three",
    key: "C",
    timeSignature: "2/4",
    tempo: 100,
    jianpu: `[ 5_ 3_ ] [ 5_ 3_ ] | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 5_ 3_ ] | 2 - V |
[ 5_ 3_ ] [ 5_ 3_ ] | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 2_ 1_ ] | 5, - V |
[ 6,_ 6,_ ] [ 1_ 6,_ ] | [ 5,_ 5,_ ] [ 3,_ 5,_ ] | [ 6,_ 6,_ ] [ 1_ 2_ ] | 1 - V |
[ 5_ 3_ ] [ 5_ 3_ ] | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 2_ 1_ ] | 5, - ||`,
    description: "A beloved Vietnamese children's song. Simple melody, single octave.",
    origin: "Vietnamese children's song",
  },
  {
    id: "level-2-song-10",
    type: "song",
    levelId: 2,
    titleVietnamese: "\u0110\u00E0n G\u00E0 Trong S\u00E2n",
    titleEnglish: "Chickens in the Yard",
    key: "C",
    timeSignature: "2/4",
    tempo: 110,
    jianpu: `[ 1_ 1_ ] [ 3_ 3_ ] | [ 5_ 5_ ] [ 3_ -_ ] V | [ 4_ 4_ ] [ 2_ 2_ ] | [ 3_ 3_ ] [ 1_ -_ ] V |
[ 5_ 5_ ] [ 3_ 3_ ] | [ 2_ 2_ ] [ 1_ -_ ] V | [ 5_ 3_ ] [ 2_ 1_ ] | [ 2_ 3_ ] [ 1_ -_ ] V |
[ 1_ 1_ ] [ 3_ 3_ ] | [ 5_ 5_ ] [ 3_ -_ ] V | [ 4_ 4_ ] [ 2_ 2_ ] | [ 3_ 3_ ] [ 1_ -_ ] ||`,
    description:
      "Playful children's song with simple repeating patterns. Every Vietnamese person knows this song.",
    origin: "Vietnamese children's song",
  },
  {
    id: "level-2-song-11",
    type: "song",
    levelId: 2,
    titleVietnamese: "Ch\u00FA Voi Con \u1EDE B\u1EA3n \u0110\u00F4n",
    titleEnglish: "Baby Elephant",
    key: "C",
    timeSignature: "2/4",
    tempo: 100,
    jianpu: `[ 5_ 5_ ] [ 3_ 5_ ] | 6 - 5 - V | [ 3_ 3_ ] [ 1_ 3_ ] | 5 - 3 - V |
[ 2_ 2_ ] [ 3_ 2_ ] | 1 - 6, - V | [ 1_ 2_ ] [ 3_ 5_ ] | 3 - 1 - V |
[ 5_ 5_ ] [ 3_ 5_ ] | 6 - 5 - V | [ 3_ 3_ ] [ 1_ 3_ ] | 5 - 3 - V |
[ 2_ 3_ ] [ 2_ 1_ ] | 6, - 1 - V | [ 2_ 3_ ] [ 2_ 1_ ] | 1 - - - ||`,
    description: "By Ph\u1EA1m Tuy\u00EAn. A happy, bouncy melody beloved by Vietnamese children.",
    origin: "Ph\u1EA1m Tuy\u00EAn, Vietnamese",
  },
];
