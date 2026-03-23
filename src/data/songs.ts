import type { Song } from "@/shared/types";

export const songs: Song[] = [
  // ══════════════════════════════════════════════════════════════════
  // LEVEL 1 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-1-song-1",
    type: "song",
    levelId: 1,
    titleChinese: "\u739B\u4E3D\u6709\u53EA\u5C0F\u7F8A\u7F94",
    titleEnglish: "Mary Had a Little Lamb",
    key: "D",
    timeSignature: "4/4",
    jianpu: `Mary Had a Little Lamb
1=D  4/4

3 2 1 2 | 3 3 3 - | 2 2 2 - | 3 5 5 - |
3 2 1 2 | 3 3 3 3 | 2 2 3 2 | 1 - - - ||`,
    description: "Uses only notes 1-5. Perfect first song.",
  },
  {
    id: "level-1-song-2",
    type: "song",
    levelId: 1,
    titleEnglish: "Hot Cross Buns",
    key: "D",
    timeSignature: "4/4",
    jianpu: `Hot Cross Buns
1=D  4/4

3 2 1 - | 3 2 1 - | 1 1 2 2 | 3 2 1 - ||`,
    description: "Very simple, only 3 notes (1, 2, 3).",
  },
  {
    id: "level-1-song-3",
    type: "song",
    levelId: 1,
    titleEnglish: "Lightly Row",
    key: "D",
    timeSignature: "4/4",
    jianpu: `Lightly Row
1=D  4/4

5 3 3 - | 4 2 2 - | 1 2 3 4 | 5 5 5 - |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 3 - - - |
2 2 2 2 | 2 3 4 - | 3 3 3 3 | 3 4 5 - |
5 3 3 3 | 4 2 2 2 | 1 3 5 5 | 1 - - - ||`,
    description: "A classic beginner melody using notes 1-5.",
  },
  {
    id: "level-1-song-4",
    type: "song",
    levelId: 1,
    titleChinese: "\u627E\u670B\u53CB",
    titleEnglish: "Finding Friends",
    key: "D",
    timeSignature: "2/4",
    jianpu: `\u627E\u670B\u53CB (Finding Friends)
1=D  2/4

1 1 | 1 3 | 5 5 | 5 3 |
4 2 | 3 1 | 2 - | 2 - |
1 1 | 1 3 | 5 5 | 5 3 |
4 2 | 3 1 | 2 1 | 1 - ||`,
    description: "A well-known Chinese children's song.",
    origin: "Chinese children's song",
  },
  {
    id: "level-1-song-5",
    type: "song",
    levelId: 1,
    titleChinese: "\u4E0A\u5B66\u6B4C",
    titleEnglish: "Going to School Song",
    key: "D",
    timeSignature: "2/4",
    jianpu: `\u4E0A\u5B66\u6B4C (Going to School Song)
1=D  2/4

1 2 | 3 1 | 3 4 | 5 - |
5 4 | 3 1 | 2 3 | 1 - |
3 4 | 5 5 | 3 4 | 5 - |
5 4 | 3 1 | 2 3 | 1 - ||`,
    description: "Another Chinese children's classic using notes 1-5.",
    origin: "Chinese children's song",
  },

  // ══════════════════════════════════════════════════════════════════
  // LEVEL 2 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-2-song-1",
    type: "song",
    levelId: 2,
    titleChinese: "\u5C0F\u661F\u661F",
    titleEnglish: "Twinkle Twinkle Little Star",
    key: "D",
    timeSignature: "4/4",
    jianpu: `\u5C0F\u661F\u661F (Twinkle Twinkle Little Star)
1=D  4/4

1 1 5 5 | 6 6 5 - | 4 4 3 3 | 2 2 1 - |
5 5 4 4 | 3 3 2 - | 5 5 4 4 | 3 3 2 - |
1 1 5 5 | 6 6 5 - | 4 4 3 3 | 2 2 1 - ||`,
    description: "The perfect Level 2 starter. Uses notes 1-6.",
  },
  {
    id: "level-2-song-2",
    type: "song",
    levelId: 2,
    titleChinese: "\u5C0F\u767D\u83DC",
    titleEnglish: "Little White Cabbage",
    key: "D",
    timeSignature: "2/4",
    jianpu: `\u5C0F\u767D\u83DC (Little White Cabbage)
1=D  2/4

6 5 | 3 5 | 6 - | 6 5 |
3 2 | 1 - | 2 3 | 5 6 |
5 - | 3 2 | 1 6, | 5, - ||`,
    description:
      "A sorrowful Chinese folk song. Pentatonic \u2014 uses only 1, 2, 3, 5, 6.",
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
    jianpu: `\u4E16\u4E0A\u53EA\u6709\u5988\u5988\u597D (Only Mama is Good)
1=C  4/4

6 5 | 3 5 | 6 - - 0 |
3 5 | 6' 5 | 6 - - 0 |
3 2 | 1 2 | 3 - - 0 |
5 3 | 2 1 | 2 - - 0 |
6 5 | 3 5 | 6 - - 0 |
3 2 | 1 2 | 3 5 | 6 - |
3 2 | 1 2 | 3 5 | 6 - |
5 3 | 2 1 | 6, - - - ||`,
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
    jianpu: `\u4E24\u53EA\u8001\u864E (Two Tigers)
1=D  4/4

||: 1 2 3 1 | 1 2 3 1 | 3 4 5 - | 3 4 5 - |
5 6 5 4 | 3 - 1 - | 5 6 5 4 | 3 - 1 - |
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
    jianpu: `Ode to Joy (\u6B22\u4E50\u9882)
1=D  4/4

3 3 4 5 | 5 4 3 2 | 1 1 2 3 | 3 - 2 - |
3 3 4 5 | 5 4 3 2 | 1 1 2 3 | 2 - 1 - |
2 2 3 1 | 2 3 4 3 1 | 2 3 4 3 2 | 1 2 5, - |
3 3 4 5 | 5 4 3 2 | 1 1 2 3 | 2 - 1 - ||`,
    description:
      "Beethoven. Uses stepwise motion. Good for smooth finger transitions.",
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
    jianpu: `\u65B0\u5E74\u597D (Happy New Year)
1=D  3/4

1 1 1 | 5 - - | 3 3 3 | 1 - - |
1 3 5 | 5 4 3 | 2 - - | 2 3 4 |
4 3 2 | 3 - - | 1 3 2 | 5, - - |
1 3 2 | 5, - - | 1 2 3 | 1 - - ||`,
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
    jianpu: `\u6708\u4EAE\u4EE3\u8868\u6211\u7684\u5FC3 (The Moon Represents My Heart)
1=D  4/4
Andante \u2669=72

1 1 1 - | 3 5 6 - | 6 6 5 - | 5 - - - |
5 5 5 - | 6 5 3 - | 2 2 1 - | 1 - - - |
1 1 1 - | 3 5 6 - | 6 6 5 - | 5 - - - |
5 5 3 - | 2 3 2 - | 1 1 1 - | 1 - - - |
3 - 5 - | 6 - 1' - | 6 - 5 - | 5 - - - |
3 - 5 - | 6 - 1' - | 6 - 5 - | 5 - - - |
1 1 1 - | 3 5 6 - | 6 6 5 - | 5 - - - |
5 5 3 - | 2 3 2 - | 1 1 1 - | 1 - - - ||`,
    description:
      "Teresa Teng (1977). One of the most beloved Chinese songs worldwide.",
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
    jianpu: `\u751C\u871C\u871C (Sweet Honey)
1=D  4/4
Moderato \u2669=96

3 3 5 6 | 5 - - - | 3 3 2 3 | 5 - - - |
6 6 5 6 | 1' - 6 5 | 3 3 2 1 | 2 - - - |
3 3 5 6 | 5 - - - | 3 3 2 3 | 5 - - - |
6 6 5 6 | 1' - 6 5 | 3 2 1 2 | 1 - - - ||`,
    description:
      "Teresa Teng, 1979. Cheerful and instantly recognizable.",
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
    jianpu: `Ch\u00E1u L\u00EAn Ba (Turning Three)
1=C  2/4
Moderato \u2669=100

5 3 5 3 | 5 3 2 1 | 2 3 5 3 | 2 - |
5 3 5 3 | 5 3 2 1 | 2 3 2 1 | 5, - |
6, 6, 1 6, | 5, 5, 3, 5, | 6, 6, 1 2 | 1 - |
5 3 5 3 | 5 3 2 1 | 2 3 2 1 | 5, - ||`,
    description:
      "A beloved Vietnamese children's song. Simple melody, single octave.",
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
    jianpu: `\u0110\u00E0n G\u00E0 Trong S\u00E2n (Chickens in the Yard)
1=C  2/4
Allegretto \u2669=110

1 1 3 3 | 5 5 3 - | 4 4 2 2 | 3 3 1 - |
5 5 3 3 | 2 2 1 - | 5 3 2 1 | 2 3 1 - |
1 1 3 3 | 5 5 3 - | 4 4 2 2 | 3 3 1 - ||`,
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
    jianpu: `Ch\u00FA Voi Con \u1EDE B\u1EA3n \u0110\u00F4n (Baby Elephant)
1=C  2/4
Moderato \u2669=100

5 5 3 5 | 6 - 5 - | 3 3 1 3 | 5 - 3 - |
2 2 3 2 | 1 - 6, - | 1 2 3 5 | 3 - 1 - |
5 5 3 5 | 6 - 5 - | 3 3 1 3 | 5 - 3 - |
2 3 2 1 | 6, - 1 - | 2 3 2 1 | 1 - - - ||`,
    description:
      "By Ph\u1EA1m Tuy\u00EAn. A happy, bouncy melody beloved by Vietnamese children.",
    origin: "Ph\u1EA1m Tuy\u00EAn, Vietnamese",
  },

  // ══════════════════════════════════════════════════════════════════
  // LEVEL 3 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-3-song-1",
    type: "song",
    levelId: 3,
    titleChinese: "\u8309\u8389\u82B1",
    titleEnglish: "Jasmine Flower",
    key: "D",
    timeSignature: "2/4",
    tempo: 72,
    jianpu: `\u8309\u8389\u82B1 (Jasmine Flower)
1=D  2/4
Andante \u2669=72

3 3 | 5 6 1' 6 | 5 - | 5 6 1' 6 |
5 - | 5 3 | 5 6 5 3 | 2 - |
1 6, | 5, 6, 1 - | 2 3 | 2 1 6, 5, |
6, 1 | 2 - | 3 5 | 3 2 1 2 |
3 - | 5 3 | 2 3 5 3 | 2 - |
1 6, | 1 5, | 6, - ||`,
    description:
      "The most famous Chinese folk song. Pentatonic, lyrical, beautiful. Jiangsu version.",
    origin: "Jiangsu folk song",
  },
  {
    id: "level-3-song-2",
    type: "song",
    levelId: 3,
    titleChinese: "\u5EB7\u5B9A\u60C5\u6B4C",
    titleEnglish: "Kangding Love Song",
    key: "G",
    timeSignature: "2/4",
    tempo: 108,
    jianpu: `\u5EB7\u5B9A\u60C5\u6B4C (Kangding Love Song)
1=G  2/4
Moderato \u2669=108

5 5 | 6 5 | 3 5 | 6 1' | 5 - |
3 2 | 3 5 - | 2 1 | 6, 1 | 2 - |
5 5 | 6 5 | 3 5 | 6 1' | 5 - |
3 2 | 1 6, | 5, - - ||`,
    description: "A famous Sichuan folk song about love. Lively and joyful.",
    origin: "Sichuan folk song",
  },
  {
    id: "level-3-song-3",
    type: "song",
    levelId: 3,
    titleChinese: "\u5357\u6CE5\u6E7E",
    titleEnglish: "Nanniwan",
    key: "D",
    timeSignature: "2/4",
    tempo: 100,
    jianpu: `\u5357\u6CE5\u6E7E (Nanniwan)
1=D  2/4
Moderato \u2669=100

0 5 3 | 5 6 | 1' 6 | 5 - | 0 5 3 | 5 6 | 5 - |
3 5 | 6 5 | 3 2 | 1 - | 6, 1 | 2 3 | 2 - |
0 5 3 | 5 6 | 1' 6 | 5 - | 0 5 3 | 5 6 | 5 - |
3 2 | 1 6, | 5, 6, | 1 - - ||`,
    description:
      "A patriotic folk song from the 1940s. Warm and uplifting melody.",
    origin: "Chinese patriotic song, 1940s",
  },
  {
    id: "level-3-song-4",
    type: "song",
    levelId: 3,
    titleEnglish: "Scarborough Fair",
    key: "D",
    timeSignature: "3/4",
    tempo: 80,
    jianpu: `Scarborough Fair
1=D  3/4
Andante \u2669=80

6, - 6, | 3 - 2 | 3 - 1 | 6, - - |
0 - 6, | 5 - 6 | 3 - - | 3 - - |
0 - 6 | 6 - 5 | 3 - 2 | 3 - 1 |
6, - 1 | 2 - 1 | 6, - - | 6, - - ||`,
    description:
      "An English folk ballad that sounds gorgeous on dizi. In 3/4 time.",
    origin: "English folk ballad",
  },
  {
    id: "level-3-song-5",
    type: "song",
    levelId: 3,
    titleChinese: "\u9001\u522B",
    titleEnglish: "Farewell",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `\u9001\u522B (Farewell)
1=D  4/4
Andante \u2669=72

5 3 5 | 1' - - | 6 1' 6 | 5 - - |
5 6, 1 | 2 - 1 | 2 - - | 0 - - |
5 3 5 | 1' - 7 | 6 1' 6 | 5 - - |
5 2 3 | 1 - - | 1 - - | 0 - - ||`,
    description:
      'Based on "Dreaming of Home and Mother" by J.P. Ordway. One of China\'s most cherished songs.',
    origin: "Li Shutong / J.P. Ordway",
  },
  {
    id: "level-3-song-6",
    type: "song",
    levelId: 3,
    titleChinese: "\u5C0F\u71D5\u5B50",
    titleEnglish: "Little Swallow",
    key: "D",
    timeSignature: "2/4",
    jianpu: `\u5C0F\u71D5\u5B50 (Little Swallow)
1=D  2/4

3 5 | 5 - | 3 5 | 1' - |
6 1' | 6 5 | 3 1 | 2 - |
2 3 | 4 3 | 2 - | 5 3 |
4 2 | 1 - ||`,
    description:
      "A classic Chinese children's song from the 1950s film. Very singable melody.",
    origin: "Chinese film song, 1950s",
  },
  {
    id: "level-3-song-7",
    type: "song",
    levelId: 3,
    titleChinese: "\u5F5D\u65CF\u821E\u66F2",
    titleEnglish: "Yi Dance (Simplified)",
    key: "D",
    timeSignature: "3/4",
    jianpu: `\u5F5D\u65CF\u821E\u66F2 (Yi Dance \u2014 Simplified)
1=D  3/4

3 2 1 | 6, - - | 1 2 3 | 2 - - |
3 5 6 | 5 3 2 | 1 6, 1 | 2 - - |
3 2 1 | 6, - 5, | 6, 1 2 | 1 - - ||`,
    description:
      "A simplified version of a Yi ethnic minority melody. Great introduction to ethnic Chinese music.",
    origin: "Yi ethnic minority melody",
  },
  {
    id: "level-3-song-8",
    type: "song",
    levelId: 3,
    titleChinese: "\u4F46\u613F\u4EBA\u957F\u4E45",
    titleVietnamese: "\u0110\u1EA3n Nguy\u1EC7n Nh\u00E2n Tr\u01B0\u1EDDng C\u1EEDu",
    titleEnglish: "Wishing We Last Forever",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u4F46\u613F\u4EBA\u957F\u4E45 (Wishing We Last Forever)
1=D  4/4
Adagio \u2669=66

0 0 0 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
0 0 0 1 | 2 - 3 5 | 5 - 3 2 | 3 - - - |
0 0 0 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
0 0 0 5 | 6 - 1' 6 | 5 - 3 5 | 6 - - - |
1' - 6 5 | 6 - 5 3 | 2 - 3 2 | 1 - - - |
0 0 0 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
0 0 0 5 | 3 - 2 1 | 6, - 1 2 | 1 - - - ||`,
    description:
      "Based on Su Shi's Song dynasty poem. Teresa Teng's 1983 recording made it immortal.",
    origin: "Teresa Teng, 1983 / Su Shi poem",
  },
  {
    id: "level-3-song-9",
    type: "song",
    levelId: 3,
    titleChinese: "\u6545\u4E61\u7684\u539F\u98CE\u666F",
    titleVietnamese: "C\u1ED1 H\u01B0\u01A1ng \u0110\u00EDch Nguy\u00EAn Phong C\u1EA3nh",
    titleEnglish: "Original Scenery of Hometown",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u6545\u4E61\u7684\u539F\u98CE\u666F (Original Scenery of Hometown)
1=D  4/4
Adagio \u2669=66

3 - 5 6 | 5 - - - | 3 - 2 3 | 2 - - - |
6, - 1 2 | 1 - - - | 6, - 5, 6, | 1 - - - |
3 - 5 6 | 5 - - - | 3 - 2 3 | 5 - - - |
6 - 5 3 | 2 - - - | 1 - 6, 1 | 2 - - - |
3 - 5 6 | 5 - - - | 3 - 2 3 | 2 - - - |
6, - 1 2 | 1 - - - | 6, - 5, 6, | 1 - - - ||`,
    description:
      "By Muneyuki Sou. Extremely popular among Vietnamese s\u00E1o tr\u00FAc players. Pentatonic, gentle, melancholic.",
    origin: "Muneyuki Sou (Japanese ocarina)",
  },
  {
    id: "level-3-song-10",
    type: "song",
    levelId: 3,
    titleChinese: "\u6E21\u60C5",
    titleVietnamese: "\u0110\u1ED9 T\u00ECnh",
    titleEnglish: "Crossing Love",
    key: "D",
    timeSignature: "2/4",
    tempo: 108,
    jianpu: `\u6E21\u60C5 (Crossing Love)
1=D  2/4
Moderato \u2669=108

3 5 | 6 5 | 3 2 | 1 - |
6, 1 | 2 3 | 5 3 | 2 - |
2 3 | 5 6 | 5 3 | 2 1 |
6, 1 | 2 1 | 6, 5, | 6, - |
3 5 | 6 5 | 3 2 | 1 - |
6, 1 | 2 3 | 2 1 | 6, - ||`,
    description:
      'Opening theme of "New Legend of White Snake" (1992). Joyful, lively.',
    origin: "New Legend of White Snake TV (1992)",
  },
  {
    id: "level-3-song-11",
    type: "song",
    levelId: 3,
    titleVietnamese: "C\u00F2 L\u1EA3",
    titleEnglish: "The Stork Song",
    key: "C",
    timeSignature: "2/4",
    tempo: 90,
    jianpu: `C\u00F2 L\u1EA3 (The Stork Song)
1=C  2/4
Andante \u2669=90

2 2 3 2 | 1 - 6, - | 1 2 3 5 | 3 - 2 - |
6, 1 2 3 | 2 - 1 - | 6, 1 6, 5, | 6, - - - |
2 2 3 2 | 1 - 6, - | 1 2 3 5 | 3 - 2 - |
6, 1 2 1 | 6, - 5, - | 6, - - - | 0 - - - ||`,
    description:
      "Northern Vietnamese folk song (d\u00E2n ca B\u1EAFc B\u1ED9). An iconic pentatonic melody.",
    origin: "Northern Vietnamese folk song",
  },
  {
    id: "level-3-song-12",
    type: "song",
    levelId: 3,
    titleVietnamese: "B\u00E8o D\u1EA1t M\u00E2y Tr\u00F4i",
    titleEnglish: "Duckweed Drifts, Clouds Float",
    key: "C",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `B\u00E8o D\u1EA1t M\u00E2y Tr\u00F4i (Duckweed Drifts, Clouds Float)
1=C  4/4
Andante \u2669=72

1 1 5 4 | 6 5 5 - | 3 3 3 5 | 1 - - - |
5 3 5 6 | 5 - 3 2 | 1 6, 1 2 | 1 - - - |
1 1 5 4 | 6 5 5 - | 3 3 3 5 | 1 - - - |
5 3 2 1 | 6, - 5, - | 6, 1 2 1 | 6, - - - ||`,
    description:
      "Quan h\u1ECD B\u1EAFc Ninh folk song. UNESCO Intangible Cultural Heritage. Hauntingly lyrical.",
    origin: "Quan h\u1ECD B\u1EAFc Ninh folk song",
  },
  {
    id: "level-3-song-13",
    type: "song",
    levelId: 3,
    titleVietnamese: "L\u00FD C\u00E2y \u0110a",
    titleEnglish: "The Banyan Tree Song",
    key: "C",
    timeSignature: "2/4",
    tempo: 110,
    jianpu: `L\u00FD C\u00E2y \u0110a (The Banyan Tree Song)
1=C  2/4
Allegretto \u2669=110

5 3 2 1 | 2 3 5 - | 6 5 3 2 | 1 - 6, - |
5, 6, 1 2 | 3 5 3 - | 2 1 6, 1 | 2 - - - |
5 3 2 1 | 2 3 5 - | 6 5 3 2 | 1 - 6, - |
5, 6, 1 2 | 1 6, 5, - | 6, - - - | 0 - - - ||`,
    description:
      "Northern Vietnamese folk song. Lively, cheerful, widely known.",
    origin: "Northern Vietnamese folk song",
  },
  {
    id: "level-3-song-14",
    type: "song",
    levelId: 3,
    titleVietnamese: "Tr\u1ED1ng C\u01A1m",
    titleEnglish: "Rice Drum Song",
    key: "D",
    timeSignature: "2/4",
    tempo: 120,
    jianpu: `Tr\u1ED1ng C\u01A1m (Rice Drum Song)
1=D  2/4
Allegro \u2669=120

5 5 6 5 | 3 2 1 - | 2 3 5 6 | 5 3 2 - |
1 2 3 5 | 6 5 3 - | 2 1 6, 1 | 2 - - - |
5 5 6 5 | 3 2 1 - | 2 3 5 6 | 5 3 2 - |
1 6, 5, 6, | 1 2 1 - | 6, - - - | 0 - - - ||`,
    description:
      "Traditional Vietnamese folk song. Fast and cheerful. Great for developing articulation.",
    origin: "Vietnamese traditional folk song",
  },

  // ══════════════════════════════════════════════════════════════════
  // LEVEL 4 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-4-song-1",
    type: "song",
    levelId: 4,
    titleChinese: "\u9F99\u7684\u4F20\u4EBA",
    titleEnglish: "Descendants of the Dragon",
    key: "G",
    timeSignature: "4/4",
    tempo: 96,
    jianpu: `\u9F99\u7684\u4F20\u4EBA (Descendants of the Dragon)
1=G  4/4
Moderato \u2669=96

0 0 3 5 | 6 - 6 6 | 5 6 5 3 | 2 - 0 0 |
0 0 3 2 | 1 - 1 1 | 6, 1 6, 5, | 3, - 0 0 |
0 0 3 5 | 6 - 6 6 | 5 6 5 3 | 2 - 0 0 |
0 0 3 2 | 1 - 1 1 | 6, 1 2 - | 1 - 0 0 |
6 - 1' - | 6 5 3 5 | 6 - - - | 0 0 0 0 |
6 - 1' - | 6 5 3 2 | 1 - - - | 0 0 0 0 ||`,
    description:
      "A powerful anthem by Hou Dejian (1978). Stately and emotional.",
    origin: "Hou Dejian, 1978",
  },
  {
    id: "level-4-song-2",
    type: "song",
    levelId: 4,
    titleChinese: "\u5973\u513F\u60C5",
    titleEnglish: "Daughter's Love",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `\u5973\u513F\u60C5 (Daughter's Love)
1=D  4/4
Andante \u2669=72

0 0 5 6, | 1 1 6, 1 | 2 - - 0 |
0 0 1 2 | 3 3 2 3 | 5 - - 0 |
5 5 3 5 | 6 6 5 6 | 1' - 6 5 |
6 - - 0 | 3 3 2 3 | 5 5 3 2 |
1 1 6, 5, | 6, - - 0 |
0 0 5, 6, | 1 1 6, 1 | 2 - - 0 |
2 2 3 5 | 6 5 3 2 | 1 - - - ||`,
    description:
      'From the 1986 TV series "Journey to the West." Tender and expressive.',
    origin: "Journey to the West TV (1986)",
  },
  {
    id: "level-4-song-3",
    type: "song",
    levelId: 4,
    titleChinese: "\u5F69\u4E91\u8FFD\u6708",
    titleEnglish: "Colorful Clouds Chasing the Moon",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u5F69\u4E91\u8FFD\u6708 (Colorful Clouds Chasing the Moon)
1=D  4/4
Andante \u2669=66

0 0 5 6 | 1' 6 5 6 | 1' - 6 5 | 3 - - 0 |
0 0 3 5 | 6 5 3 5 | 6 - 5 3 | 2 - - 0 |
0 0 2 3 | 5 3 2 3 | 5 - 3 2 | 1 - 6, 1 |
2 - 1 6, | 5, - - - | 0 0 5 6 | 1' 6 5 3 |
5 - 6 5 | 3 - 2 1 | 6, - 1 2 | 1 - - - ||`,
    description:
      "A famous Cantonese music piece by Ren Guang (1935). Elegant and dreamy.",
    origin: "Ren Guang, 1935 (Cantonese)",
  },
  {
    id: "level-4-song-4",
    type: "song",
    levelId: 4,
    titleChinese: "\u7267\u7F8A\u66F2",
    titleEnglish: "Shepherd's Song",
    key: "D",
    timeSignature: "4/4",
    tempo: 76,
    jianpu: `\u7267\u7F8A\u66F2 (Shepherd's Song)
1=D  4/4
Andante \u2669=76

0 0 0 3 | 5 6 1' 6 | 5 - - 3 | 5 3 2 3 |
1 - - 0 | 0 0 0 1 | 2 3 5 3 | 2 - - 6, |
1 6, 5, 6, | 1 - - 0 | 0 0 0 3 | 5 6 1' 6 |
5 - - 3 | 5 3 2 3 | 5 - - 0 | 5 5 3 5 |
6 - - 5 | 3 5 2 3 | 1 - - - | 0 0 0 0 ||`,
    description:
      'From the 1982 film "Shaolin Temple." Pastoral, peaceful melody.',
    origin: "Shaolin Temple film (1982)",
  },
  {
    id: "level-4-song-5",
    type: "song",
    levelId: 4,
    titleChinese: "\u5929\u8DEF",
    titleEnglish: "Road to Heaven",
    key: "D",
    timeSignature: "4/4",
    tempo: 96,
    jianpu: `\u5929\u8DEF (Road to Heaven)
1=D  4/4
Moderato \u2669=96

0 0 1 2 | 3 - 3 2 | 1 - 6, 1 | 2 - - 0 |
0 0 2 3 | 5 - 5 3 | 2 - 1 2 | 3 - - 0 |
0 0 3 5 | 6 - 6 5 | 3 - 2 3 | 5 - - 0 |
6 5 3 5 | 6 - 1' 6 | 5 - 3 2 | 1 - - - ||`,
    description:
      "A Tibetan-influenced melody by Qu Yuan (2001). Sweeping and majestic.",
    origin: "Qu Yuan, 2001",
  },
  {
    id: "level-4-song-6",
    type: "song",
    levelId: 4,
    titleChinese: "\u6CA7\u6D77\u4E00\u58F0\u7B11",
    titleEnglish: "Laughing Across the Ocean",
    key: "D",
    timeSignature: "4/4",
    tempo: 132,
    jianpu: `\u6CA7\u6D77\u4E00\u58F0\u7B11 (Laughing Across the Ocean)
1=D  4/4
Allegro \u2669=132

5 - - - | 3 - - - | 2 - - - | 1 - 6, - |
5, - - - | 0 0 0 0 | 5 - - - | 3 - - - |
2 - - - | 1 - 6, - | 5, - - - | 0 0 0 0 |
5, 6, 1 6, | 5, 6, 1 6, | 5, - - - | 0 0 0 0 |
5, 1 2 1 | 6, 5, 3, 5, | 6, - - - | 0 0 0 0 ||`,
    description:
      'Theme from "Swordsman" film series. Bold, free-spirited, and heroic.',
    origin: "Swordsman film series",
  },
  {
    id: "level-4-song-7",
    type: "song",
    levelId: 4,
    titleChinese: "\u4E00\u526A\u6885",
    titleVietnamese: "Nh\u1EA5t Ti\u1EC5n Mai",
    titleEnglish: "A Spray of Plum Blossom",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `\u4E00\u526A\u6885 (A Spray of Plum Blossom)
1=D  4/4
Andante \u2669=72

0 0 3 5 | 6 - - 5 | 3 - 5 6 | 5 - - - |
0 0 2 3 | 5 - - 3 | 2 - 3 5 | 3 - - - |
0 0 3 5 | 6 - - 5 | 3 - 2 1 | 2 - - - |
0 0 6, 1 | 2 - - 1 | 6, - 1 2 | 1 - - - |
3 5 6 - | 1' 6 5 - | 6 5 3 - | 5 - - - |
3 5 6 - | 1' 6 5 - | 3 2 1 2 | 1 - - - ||`,
    description:
      'From the 1984 TV drama. Went viral in Vietnam ("Xue Hua Piao Piao" meme).',
    origin: "TV drama (1984)",
  },
  {
    id: "level-4-song-8",
    type: "song",
    levelId: 4,
    titleChinese: "\u5343\u5E74\u7B49\u4E00\u56DE",
    titleVietnamese: "Thi\u00EAn Ni\u00EAn \u0110\u1EB3ng Nh\u1EA5t H\u1ED3i",
    titleEnglish: "A Thousand Years of Waiting",
    key: "D",
    timeSignature: "4/4",
    tempo: 88,
    jianpu: `\u5343\u5E74\u7B49\u4E00\u56DE (A Thousand Years of Waiting)
1=D  4/4
Moderato \u2669=88

6, - 1 2 | 3 - 2 1 | 2 - 3 5 | 3 - - - |
6 - 5 3 | 5 - 3 2 | 1 - 6, 1 | 2 - - - |
6, - 1 2 | 3 - 2 1 | 2 - 3 5 | 6 - - - |
5 - 3 5 | 6 - 1' 6 | 5 - 3 2 | 1 - - - |
3 - 5 6 | 1' - 6 5 | 6 - 5 3 | 2 - - - |
1 - 6, 1 | 2 - 3 2 | 1 - - - | 0 - - - ||`,
    description:
      'Main theme of "New Legend of White Snake" (1992). Dramatic and emotional.',
    origin: "New Legend of White Snake TV (1992)",
  },
  {
    id: "level-4-song-9",
    type: "song",
    levelId: 4,
    titleChinese: "\u94C1\u8840\u4E39\u5FC3",
    titleVietnamese: "Thi\u1EBFt Huy\u1EBFt \u0110an T\u00E2m",
    titleEnglish: "Iron Blood, Loyal Heart",
    key: "D",
    timeSignature: "4/4",
    tempo: 80,
    jianpu: `\u94C1\u8840\u4E39\u5FC3 (Iron Blood, Loyal Heart)
1=D  4/4
Andante \u2669=80

5, - 1 2 | 3 - - 2 | 1 - 6, 1 | 2 - - - |
2 - 3 5 | 6 - - 5 | 3 - 2 3 | 5 - - - |
5 - 6 1' | 6 - - 5 | 3 - 5 6 | 5 - - - |
3 - 2 1 | 2 - - 3 | 1 - 6, 5, | 6, - - - |
5, - 1 2 | 3 - - 2 | 1 - 6, 1 | 2 - - - |
2 - 3 5 | 6 - 1' 6 | 5 - 3 2 | 1 - - - ||`,
    description:
      'Theme of "Legend of the Condor Heroes" (1983). The definitive wuxia theme.',
    origin: "Legend of the Condor Heroes TV (1983)",
  },
  {
    id: "level-4-song-10",
    type: "song",
    levelId: 4,
    titleVietnamese: "Di\u1EC5m X\u01B0a",
    titleEnglish: "Beauty of the Past",
    key: "C",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `Di\u1EC5m X\u01B0a (Beauty of the Past)
1=C  4/4
Adagio \u2669=66

0 0 0 3 | 2 - 1 6, | 5, - 6, 1 | 2 - - - |
0 0 0 1 | 6, - 5, 3, | 5, - 6, 5, | 3, - - - |
0 0 0 3 | 2 - 1 6, | 5, - 6, 1 | 2 - - - |
3 - 5 3 | 2 - 1 2 | 3 - 2 1 | 6, - - - |
5, - 6, 1 | 2 - 3 2 | 1 - 6, 5, | 6, - - - ||`,
    description:
      "By Tr\u1ECBnh C\u00F4ng S\u01A1n (1965). THE quintessential nh\u1EA1c Tr\u1ECBnh piece for s\u00E1o tr\u00FAc.",
    origin: "Tr\u1ECBnh C\u00F4ng S\u01A1n, 1965",
  },
  {
    id: "level-4-song-11",
    type: "song",
    levelId: 4,
    titleVietnamese: "Bi\u1EC3n Nh\u1EDB",
    titleEnglish: "Remembering the Sea",
    key: "G",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `Bi\u1EC3n Nh\u1EDB (Remembering the Sea)
1=G  4/4
Adagio \u2669=60

0 0 6, 1 | 2 - 3 2 | 1 - 6, 1 | 2 - - - |
3 - 5 6 | 5 - 3 2 | 1 - 2 1 | 6, - - - |
0 0 6, 1 | 2 - 3 5 | 6 - 5 3 | 5 - - - |
3 - 2 1 | 6, - 1 6, | 5, - 6, 5, | 3, - - - |
5, - 6, 1 | 2 - 3 2 | 1 - 6, 5, | 6, - - - ||`,
    description:
      "By Tr\u1ECBnh C\u00F4ng S\u01A1n. Deep, emotional, spanning two octaves.",
    origin: "Tr\u1ECBnh C\u00F4ng S\u01A1n",
  },
  {
    id: "level-4-song-12",
    type: "song",
    levelId: 4,
    titleVietnamese: "L\u00FD K\u00E9o Ch\u00E0i",
    titleEnglish: "Hauling the Net",
    key: "C",
    timeSignature: "2/4",
    tempo: 108,
    jianpu: `L\u00FD K\u00E9o Ch\u00E0i (Hauling the Net)
1=C  2/4
Moderato \u2669=108

5 6 5 3 | 2 1 2 - | 3 5 6 5 | 3 2 1 - |
6, 1 2 3 | 5 3 2 - | 1 6, 5, 6, | 1 - - - |
5 6 5 3 | 2 1 2 - | 3 5 6 5 | 3 2 1 - |
6, 1 2 1 | 6, 5, 6, - | 1 - - - | 0 - - - ||`,
    description:
      "Southern Vietnamese folk song (d\u00E2n ca Nam B\u1ED9). Energetic fishing song from the Mekong Delta.",
    origin: "Southern Vietnamese folk song",
  },
  {
    id: "level-4-song-13",
    type: "song",
    levelId: 4,
    titleVietnamese: "N\u1ED1i V\u00F2ng Tay L\u1EDBn",
    titleEnglish: "Join Hands in a Great Circle",
    key: "C",
    timeSignature: "4/4",
    tempo: 96,
    jianpu: `N\u1ED1i V\u00F2ng Tay L\u1EDBn (Join Hands in a Great Circle)
1=C  4/4
Moderato \u2669=96

5 - 5 6 | 5 - 3 2 | 1 - 1 2 | 3 - - - |
5 - 5 6 | 5 - 3 5 | 6 - 5 3 | 2 - - - |
1 - 2 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
3 - 5 6 | 1' - 6 5 | 3 - 2 1 | 1 - - - ||`,
    description:
      "By Tr\u1ECBnh C\u00F4ng S\u01A1n \u2014 the unity anthem of Vietnam. Uplifting, powerful.",
    origin: "Tr\u1ECBnh C\u00F4ng S\u01A1n",
  },

  // ══════════════════════════════════════════════════════════════════
  // LEVEL 5 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-5-song-1",
    type: "song",
    levelId: 5,
    titleChinese: "\u59D1\u82CF\u884C",
    titleEnglish: "A Walk in Gusu",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `\u59D1\u82CF\u884C (A Walk in Gusu) \u2014 Introduction
1=D  \u6563\u677F

0 0 0 5, 6, | 1 2 3 5 3 | 2 - - 1 2 |
3 5 6 1' 6 | 5 - - 3 5 |
6 5 3 2 | 1 - 6, 5, | 6, - - - ||

\u59D1\u82CF\u884C \u2014 Slow melody
1=D  4/4
Adagio \u2669=60

6, 1 2 3 | 5 - 3 2 | 1 - - 6, | 5, - - 0 |
6, 1 2 3 | 5 - 6 5 | 3 - 2 1 | 2 - - 0 |
3 5 6 1' | 6 - 5 3 | 5 - 3 2 | 1 - - 0 |
6, 1 2 3 | 2 - 1 6, | 5, - - - | 0 0 0 0 ||

\u59D1\u82CF\u884C \u2014 Fast section
1=D  2/4
Allegro \u2669=132

6, 1 | 2 3 | 5 3 | 2 1 |
6, 1 | 2 3 | 5 6 | 5 3 |
2 3 | 5 6 | 1' 6 | 5 3 |
2 1 | 6, 5, | 6, 1 | 2 - ||`,
    description:
      "THE milestone piece. Grade 5, southern style masterpiece by Jiang Xianwei (1962).",
    origin: "Jiang Xianwei, 1962",
  },
  {
    id: "level-5-song-2",
    type: "song",
    levelId: 5,
    titleChinese: "\u5C0F\u653E\u725B",
    titleEnglish: "Little Cowherd",
    key: "D",
    timeSignature: "2/4",
    tempo: 120,
    jianpu: `\u5C0F\u653E\u725B (Little Cowherd)
1=D  2/4
Allegretto \u2669=120

5 6 | 1' 6 5 3 | 5 - | 3 2 1 2 |
3 - | 5 6 1' 6 | 5 3 2 1 | 6, - |
5, 6, | 1 2 3 5 | 3 2 1 6, | 5, - |
6, 1 | 2 3 5 3 | 2 1 6, 5, | 6, - ||`,
    description:
      "Grade 3-4, northern style. Playful and lively, based on a Hebei folk melody.",
    origin: "Hebei folk melody",
  },
  {
    id: "level-5-song-3",
    type: "song",
    levelId: 5,
    titleChinese: "\u7267\u7B1B",
    titleEnglish: "Shepherd's Flute",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u7267\u7B1B (Shepherd's Flute)
1=D  4/4
Andante \u2669=66

0 0 5, 6, | 1 - 2 3 | 5 3 2 - | 1 2 3 5 |
6 - - 5 | 3 2 1 6, | 5, - - - | 0 0 5, 6, |
1 - 6, 1 | 2 3 5 3 | 2 - 1 2 | 3 5 6 - |
5 3 2 1 | 6, 5, 6, 1 | 2 - 1 6, | 5, - - - ||`,
    description:
      "A lyrical piece by Liu Zhi (1958). Tests tone quality and breath control.",
    origin: "Liu Zhi, 1958",
  },
  {
    id: "level-5-song-4",
    type: "song",
    levelId: 5,
    titleChinese: "\u559C\u76F8\u9022",
    titleEnglish: "Happy Reunion",
    key: "D",
    timeSignature: "4/4",
    tempo: 52,
    jianpu: `\u559C\u76F8\u9022 (Happy Reunion) \u2014 Slow Section
1=D  4/4
Adagio \u2669=52

5, - 6, 1 | 2 - 1 6, | 5, - - - | 6, - 1 2 |
3 - 2 1 | 6, 5, 6, - | 5, - - - | 1 - 2 3 |
5 - 3 2 | 1 - 6, 5, | 6, 1 2 - | 1 - - - ||

\u559C\u76F8\u9022 \u2014 Fast Section
1=D  2/4
Allegro \u2669=144

5, 6, 1 2 | 3 2 1 6, | 5, 6, 1 2 | 3 5 6 5 |
3 2 1 6, | 5, 6, 1 2 | 3 5 3 2 | 1 6, 5, - ||`,
    description:
      "Grade 4-5, northern style by Feng Zicun. Depicts joy of friends reuniting.",
    origin: "Feng Zicun (Inner Mongolian folk melody)",
  },
  {
    id: "level-5-song-5",
    type: "song",
    levelId: 5,
    titleChinese: "\u626C\u97AD\u50AC\u9A6C\u8FD0\u7CAE\u5FD9",
    titleEnglish: "Whipping the Horse to Transport Grain",
    key: "D",
    timeSignature: "2/4",
    tempo: 144,
    jianpu: `\u626C\u97AD\u50AC\u9A6C\u8FD0\u7CAE\u5FD9 \u2014 Opening Theme
1=D  2/4
Allegro \u2669=144

5 5 | 6 5 3 2 | 1 1 | 2 1 6, 5, |
6, 6, | 1 6, 5, 3, | 5, - | 5, 6, 1 2 |
3 3 | 5 3 2 1 | 6, - | 1 2 3 5 |
6 6 | 5 3 2 1 | 6, 5, | 6, - ||`,
    description:
      "Energetic northern piece depicting the busy harvest season. Grade 4-5.",
    origin: "Northern Chinese",
  },
  {
    id: "level-5-song-6",
    type: "song",
    levelId: 5,
    titleChinese: "\u4E2D\u82B1\u516D\u677F",
    titleEnglish: "Zhonghua Liuban",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `\u4E2D\u82B1\u516D\u677F (Zhonghua Liuban) \u2014 Theme
1=D  4/4
Andante \u2669=60

5 - 6 5 | 3 - 2 1 | 2 - 3 2 | 1 - 6, 5, |
6, - 1 6, | 5, - 3, 5, | 6, - 1 2 | 1 - - - |
3 - 5 3 | 2 - 1 2 | 3 - 5 6 | 5 - 3 2 |
1 - 6, 1 | 2 - 1 6, | 5, - - - | 0 - - - ||`,
    description:
      "Traditional Jiangnan silk and bamboo ensemble piece. Elegant southern style.",
    origin: "Jiangnan silk and bamboo (\u6C5F\u5357\u4E1D\u7AF9)",
  },
  {
    id: "level-5-song-7",
    type: "song",
    levelId: 5,
    titleChinese: "\u4E0A\u6D77\u6EE9",
    titleVietnamese: "B\u1EBFn Th\u01B0\u1EE3ng H\u1EA3i",
    titleEnglish: "The Bund",
    key: "D",
    timeSignature: "4/4",
    tempo: 80,
    jianpu: `\u4E0A\u6D77\u6EE9 (The Bund)
1=D  4/4
Andante \u2669=80

0 0 0 5, | 1 - 2 3 | 2 - 1 6, | 1 - - - |
0 0 0 1 | 2 - 3 5 | 5 - 3 2 | 3 - - - |
0 0 0 3 | 5 - 6 1' | 6 - 5 6 | 5 - - - |
0 0 5 6 | 1' - 6 5 | 3 - 2 1 | 2 - - - |
0 0 0 5, | 1 - 2 3 | 2 - 1 6, | 1 - - - |
0 0 0 1 | 3 - 5 6 | 5 - 3 2 | 1 - - - ||`,
    description:
      'Theme of the Hong Kong TVB drama "The Bund." Sweeping, dramatic melody.',
    origin: "TVB drama (1980)",
  },
  {
    id: "level-5-song-8",
    type: "song",
    levelId: 5,
    titleChinese: "\u6789\u51DD\u7709",
    titleVietnamese: "U\u1ED5ng Ng\u01B0ng Mi",
    titleEnglish: "Vain Knitting of Brows",
    key: "D",
    timeSignature: "4/4",
    tempo: 56,
    jianpu: `\u6789\u51DD\u7709 (Vain Knitting of Brows)
1=D  4/4
Adagio \u2669=56

0 0 5, 6, | 1 - 2 3 | 2 - - 1 | 6, - - - |
5, - 6, 1 | 2 - 3 2 | 1 - - 6, | 5, - - - |
6, - 1 2 | 3 - 5 3 | 2 - 1 2 | 3 - - - |
5 - 6 5 | 3 - 2 1 | 6, - 5, 6, | 1 - - - |
1 - 2 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
6, - 1 2 | 1 - 6, 5, | 6, - - - | 0 - - - ||`,
    description:
      'From "Dream of the Red Chamber" TV (1987). Hauntingly beautiful.',
    origin: "Wang Liping, Dream of the Red Chamber TV (1987)",
  },
  {
    id: "level-5-song-9",
    type: "song",
    levelId: 5,
    titleChinese: "\u7435\u7436\u8BED",
    titleVietnamese: "T\u1EF3 B\u00E0 Ng\u1EEF",
    titleEnglish: "Pipa Language",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u7435\u7436\u8BED (Pipa Language)
1=D  4/4
Adagio \u2669=66

0 0 3 5 | 6 - 5 3 | 2 - 3 2 | 1 - - - |
0 0 1 2 | 3 - 2 1 | 6, - 1 6, | 5, - - - |
0 0 5, 6, | 1 - 2 3 | 5 - 3 2 | 3 - - - |
3 - 5 6 | 5 - 3 2 | 1 - 6, 1 | 2 - - - |
0 0 3 5 | 6 - 1' 6 | 5 - 3 5 | 6 - - - |
5 - 3 2 | 1 - 6, 1 | 2 - 1 6, | 5, - - - ||`,
    description:
      "By Lin Hai (2003). Extremely popular among Vietnamese s\u00E1o players.",
    origin: "Lin Hai, 2003",
  },
  {
    id: "level-5-song-10",
    type: "song",
    levelId: 5,
    titleVietnamese: "H\u1EA1 Tr\u1EAFng",
    titleEnglish: "White Summer",
    key: "G",
    timeSignature: "4/4",
    tempo: 58,
    jianpu: `H\u1EA1 Tr\u1EAFng (White Summer)
1=G  4/4
Adagio \u2669=58

0 0 0 5, | 6, - 1 2 | 3 - 2 1 | 6, - - - |
5, - 6, 1 | 2 - 3 5 | 3 - 2 1 | 2 - - - |
3 - 5 6 | 5 - 3 2 | 1 - 6, 1 | 2 - - - |
6, - 1 2 | 1 - 6, 5, | 6, - - - | 0 - - - |
3 - 5 6 | 5 - 3 5 | 6 - 5 3 | 2 - - - |
1 - 2 3 | 2 - 1 6, | 5, - 6, 5, | 3, - - - ||`,
    description:
      "By Tr\u1ECBnh C\u00F4ng S\u01A1n (1961). A complex, dreamy melody evoking the summers of Hu\u1EBF.",
    origin: "Tr\u1ECBnh C\u00F4ng S\u01A1n, 1961",
  },
  {
    id: "level-5-song-11",
    type: "song",
    levelId: 5,
    titleVietnamese: "\u00C1o L\u1EE5a H\u00E0 \u0110\u00F4ng",
    titleEnglish: "Silk Dress of Ha Dong",
    key: "C",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `\u00C1o L\u1EE5a H\u00E0 \u0110\u00F4ng (Silk Dress of H\u00E0 \u0110\u00F4ng)
1=C  4/4
Andante \u2669=72

0 0 0 3 | 5 - 6 5 | 3 - 2 3 | 5 - - - |
6 - 5 3 | 2 - 1 2 | 3 - 2 1 | 6, - - - |
0 0 0 1 | 2 - 3 5 | 6 - 5 3 | 2 - - - |
1 - 2 3 | 5 - 3 2 | 1 - 6, 1 | 2 - - - |
3 - 5 6 | 1' - 6 5 | 3 - 5 6 | 5 - - - |
3 - 2 1 | 6, - 1 2 | 1 - - - | 0 - - - ||`,
    description:
      "By Ng\u00F4 Th\u1EE5y Mi\u00EAn. One of the most elegant Vietnamese romantic songs.",
    origin: "Ng\u00F4 Th\u1EE5y Mi\u00EAn, 1971",
  },
  {
    id: "level-5-song-12",
    type: "song",
    levelId: 5,
    titleVietnamese: "M\u00F9a Thu Cho Em",
    titleEnglish: "Autumn for You",
    key: "G",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `M\u00F9a Thu Cho Em (Autumn for You)
1=G  4/4
Adagio \u2669=66

0 0 0 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
0 0 0 5 | 6 - 1' 6 | 5 - 3 5 | 6 - - - |
5 - 3 2 | 1 - 6, 1 | 2 - 3 2 | 1 - - - |
6, - 1 2 | 3 - 5 3 | 2 - 1 6, | 5, - - - |
6, - 1 2 | 3 - 5 6 | 5 - 3 2 | 3 - - - |
2 - 1 6, | 5, - 6, 1 | 6, - - - | 0 - - - ||`,
    description:
      "By Ng\u00F4 Th\u1EE5y Mi\u00EAn. A lush romantic ballad. One of the masterpieces of nh\u1EA1c ti\u1EC1n chi\u1EBFn.",
    origin: "Ng\u00F4 Th\u1EE5y Mi\u00EAn",
  },

  // ══════════════════════════════════════════════════════════════════
  // LEVEL 6 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-6-song-1",
    type: "song",
    levelId: 6,
    titleChinese: "\u7267\u6C11\u65B0\u6B4C",
    titleEnglish: "Herdsman's New Song",
    key: "D",
    timeSignature: "4/4",
    tempo: 52,
    jianpu: `\u7267\u6C11\u65B0\u6B4C \u2014 Introduction
1=D  \u6563\u677F

0 0 0 3 5 | 6 - - - 5 6 | 1' - - - 6 1' |
2' - - - 1' 6 | 5 - - 3 5 6 | 5 3 2 - 1 2 |
3 - - - - - ||

\u7267\u6C11\u65B0\u6B4C \u2014 Slow Section
1=D  4/4
Adagio \u2669=52

3 - 5 3 | 2 - 1 2 | 3 - 5 6 | 5 - - - |
6 - 1' 6 | 5 - 3 5 | 6 - 5 3 | 2 - - - |
1 - 2 1 | 6, - 5, 6, | 1 - 2 3 | 2 - - - |
3 - 5 3 | 2 - 1 2 | 3 - 5 6 | 5 - - - ||

\u7267\u6C11\u65B0\u6B4C \u2014 Fast Section
1=D  2/4
Vivace \u2669=160

5 3 5 3 | 2 1 2 1 | 6, 1 6, 5, | 6, 1 2 3 |
5 3 5 3 | 2 1 2 1 | 6, 5, 6, 1 | 2 - |
5 6 5 3 | 2 3 2 1 | 6, 1 6, 5, | 6, 1 2 - |
3 5 3 2 | 1 2 1 6, | 5, 6, 5, 3, | 5, - ||`,
    description:
      "Grade 7 masterpiece by Jian Guangyi (1966). The most famous dizi piece.",
    origin: "Jian Guangyi, 1966",
  },
  {
    id: "level-6-song-2",
    type: "song",
    levelId: 6,
    titleChinese: "\u6625\u5230\u6E58\u6C5F",
    titleEnglish: "Spring Arrives at the Xiang River",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u6625\u5230\u6E58\u6C5F \u2014 Opening Cadenza
1=D  \u6563\u677F

0 0 3 5 6 | 1' - - 6 5 | 6 1' 2' 1' 6 5 |
3 5 6 5 3 2 | 1 6, 5, 6, 1 2 | 3 - - - - |

\u6625\u5230\u6E58\u6C5F \u2014 Lyrical Theme
1=D  4/4
Andante \u2669=66

6, 1 2 3 | 5 - 3 2 | 1 - 6, 1 | 2 - - - |
3 5 6 5 | 3 2 1 2 | 3 - 2 1 | 6, - - - |
5, 6, 1 2 | 3 - 5 3 | 2 - 1 6, | 5, - - - |
6, 1 2 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
3 5 6 5 | 3 2 1 6, | 5, - 6, 1 | 6, - - - ||`,
    description:
      "Grade 7-8 by Ning Baosheng (1976). Requires circular breathing for the opening cadenza.",
    origin: "Ning Baosheng, 1976",
  },
  {
    id: "level-6-song-3",
    type: "song",
    levelId: 6,
    titleChinese: "\u9E67\u9E44\u98DE",
    titleEnglish: "Partridge Flying",
    key: "D",
    timeSignature: "4/4",
    tempo: 52,
    jianpu: `\u9E67\u9E44\u98DE \u2014 Main Theme
1=D  4/4
Adagio \u2669=52

5 - - 6 | 1' - 6 5 | 3 - - 2 | 1 - - - |
5 - - 6 | 1' - 6 5 | 6 - - 5 | 3 - - - |
2 - - 3 | 5 - 3 2 | 1 - - 6, | 5, - - - |
6, - - 1 | 2 - 1 6, | 5, - - - | 0 - - - ||

\u9E67\u9E44\u98DE \u2014 Variation
1=D  4/4
Moderato \u2669=60

5 3 5 - 6 | 1' 6 1' - 6 5 | 3 5 3 - 2 | 1 2 1 - - |
5 3 5 - 6 | 1' 6 1' - 6 5 | 6 5 6 - 5 | 3 5 3 - - |
2 1 2 - 3 | 5 3 5 - 3 2 | 1 6, 1 - 6, | 5, 6, 5, - - |
6, 5, 6, - 1 | 2 1 2 - 1 6, | 5, - - - | 0 - - - ||`,
    description:
      "Grade 6-7. Hunan folk tune depicting partridges in flight. Southern style.",
    origin: "Zhao Songting arrangement (Hunan folk tune)",
  },
  {
    id: "level-6-song-4",
    type: "song",
    levelId: 6,
    titleChinese: "\u4E94\u6886\u5B50",
    titleEnglish: "Wu Bangzi (Five Beats)",
    key: "G",
    timeSignature: "2/4",
    tempo: 132,
    jianpu: `\u4E94\u6886\u5B50 \u2014 Main Theme
1=G  2/4
Allegro \u2669=132

5 3 5 6 | 5 3 2 1 | 6, 1 2 3 | 2 1 6, 5, |
6, 1 2 1 | 6, 5, 3, 5, | 6, - | 0 0 |
5 6 1' 6 | 5 3 5 6 | 1' 6 5 3 | 2 1 6, 5, |
6, - | 0 0 ||

\u4E94\u6886\u5B50 \u2014 Development
1=G  2/4
Allegro \u2669=140

5 3 5 3 | 5 6 5 3 | 2 1 2 1 | 2 3 2 1 |
6, 5, 6, 1 | 2 3 5 6 | 5 3 2 1 | 6, - |
5, 6, 1 2 | 3 5 6 5 | 3 2 1 6, | 5, 6, 1 2 |
3 2 1 6, | 5, 3, 5, 6, | 1 - | 0 0 ||`,
    description:
      "Classic northern piece. Bright, energetic, uses the bangdi.",
    origin: "Northern folk melody",
  },
  {
    id: "level-6-song-5",
    type: "song",
    levelId: 6,
    titleChinese: "\u79CB\u6E56\u6708\u591C",
    titleEnglish: "Autumn Lake, Moonlit Night",
    key: "D",
    timeSignature: "4/4",
    tempo: 48,
    jianpu: `\u79CB\u6E56\u6708\u591C \u2014 Opening
1=D  \u6563\u677F

0 0 0 5, | 6, - - 1 | 2 - - 3 2 | 1 - - 6, 5, |
6, - - - | 0 0 0 0 |

\u79CB\u6E56\u6708\u591C \u2014 Main Theme
1=D  4/4
Adagio \u2669=48

5, - 6, - | 1 - 2 1 | 6, - - 5, | 6, - - - |
1 - 2 - | 3 - 5 3 | 2 - 1 6, | 5, - - - |
6, - 1 - | 2 - 3 2 | 1 - 6, 5, | 6, - - - |
1 - 2 3 | 5 - 3 2 | 1 - 6, - | 5, - - - |
6, - - 1 | 2 - - 3 | 2 - 1 6, | 5, - - - ||`,
    description:
      "Grade 6 by Yu Xunfa. Atmospheric, introspective. Showcases tone color and dynamics.",
    origin: "Yu Xunfa",
  },
  {
    id: "level-6-song-6",
    type: "song",
    levelId: 6,
    titleChinese: "\u51C9\u51C9",
    titleVietnamese: "L\u01B0\u01A1ng L\u01B0\u01A1ng",
    titleEnglish: "Cold Cold",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `\u51C9\u51C9 (Cold Cold)
1=D  4/4
Andante \u2669=72

0 0 3 5 | 6 - - 5 | 3 - 2 3 | 5 - - - |
0 0 5 6 | 1' - - 6 | 5 - 6 5 | 3 - - - |
0 0 2 3 | 5 - - 3 | 2 - 1 2 | 3 - - - |
5 - 6 1' | 6 - 5 3 | 2 - 3 2 | 1 - - - |
1' - 2' 1' | 6 - 5 6 | 1' - 6 5 | 6 - - - |
5 - 3 5 | 6 - 5 3 | 2 - 1 6, | 5, - - - |
6, - 1 2 | 3 - 5 3 | 2 - 1 2 | 1 - - - ||`,
    description:
      'Theme of "Eternal Love" (2017). Hugely popular on Vietnamese s\u00E1o channels.',
    origin: "Eternal Love TV drama (2017)",
  },
  {
    id: "level-6-song-7",
    type: "song",
    levelId: 6,
    titleChinese: "\u83CA\u82B1\u53F0",
    titleVietnamese: "C\u00FAc Hoa \u0110\u00E0i",
    titleEnglish: "Chrysanthemum Terrace",
    key: "D",
    timeSignature: "4/4",
    tempo: 76,
    jianpu: `\u83CA\u82B1\u53F0 (Chrysanthemum Terrace)
1=D  4/4
Andante \u2669=76

0 0 0 3 | 5 - 5 6 | 5 - 3 2 | 3 - - - |
0 0 0 2 | 3 - 3 5 | 3 - 2 1 | 2 - - - |
0 0 0 1 | 2 - 2 3 | 2 - 1 6, | 1 - - - |
0 0 0 6, | 1 - 1 2 | 1 - 6, 5, | 6, - - - |
3 - 5 6 | 1' - 6 5 | 6 - 5 3 | 5 - - - |
3 - 5 6 | 1' - 6 5 | 3 - 2 1 | 2 - - - |
6, - 1 2 | 3 - 2 1 | 6, - 5, 6, | 1 - - - ||`,
    description:
      "Jay Chou (2006). The quintessential Chinese-style pop song. Beautiful on dizi.",
    origin: "Jay Chou, 2006",
  },
  {
    id: "level-6-song-8",
    type: "song",
    levelId: 6,
    titleChinese: "\u534A\u58F6\u7EB1",
    titleVietnamese: "B\u00E1n H\u1ED3 Sa",
    titleEnglish: "Half Pot of Gauze",
    key: "D",
    timeSignature: "4/4",
    tempo: 66,
    jianpu: `\u534A\u58F6\u7EB1 (Half Pot of Gauze)
1=D  4/4
Adagio \u2669=66

0 0 5, 6, | 1 - 2 3 | 2 - 1 6, | 1 - - - |
0 0 6, 1 | 2 - 3 5 | 3 - 2 1 | 2 - - - |
0 0 2 3 | 5 - 6 5 | 3 - 2 3 | 5 - - - |
6 - 5 3 | 2 - 1 2 | 3 - 2 1 | 6, - - - |
5, - 6, 1 | 2 - 3 2 | 1 - 6, 5, | 6, - - - |
1 - 2 3 | 5 - 3 2 | 1 - 6, 1 | 2 - 1 6, |
5, - - - | 0 - - - ||`,
    description:
      "By Liu Ke Yi (2015). Chinese-style meditation music. Extremely popular among Vietnamese s\u00E1o players.",
    origin: "Liu Ke Yi, 2015",
  },

  // ══════════════════════════════════════════════════════════════════
  // LEVEL 7 SONGS
  // ══════════════════════════════════════════════════════════════════
  {
    id: "level-7-song-1",
    type: "song",
    levelId: 7,
    titleChinese: "\u5E7D\u5170\u9022\u6625",
    titleEnglish: "Orchid Meets Spring",
    key: "D",
    timeSignature: "4/4",
    tempo: 46,
    jianpu: `\u5E7D\u5170\u9022\u6625 \u2014 \u6563\u677F Introduction
1=D  \u6563\u677F

0 0 0 5, | 6, - - - 1 2 | 3 - - 2 1 6, | 5, - - - |
6, 1 2 3 | 5 - - 3 2 | 1 - - 6, 5, | 6, - - - - |

\u5E7D\u5170\u9022\u6625 \u2014 \u6162\u677F Slow Theme
1=D  4/4
Adagio \u2669=46

6, - 1 2 | 3 - 2 1 | 6, - 5, 6, | 1 - - - |
2 - 3 5 | 6 - 5 3 | 2 - 1 6, | 5, - - - |
6, - 1 2 | 3 - 5 6 | 5 - 3 2 | 3 - - - |
2 - 1 6, | 5, - 6, 1 | 6, - - - | 0 - - - |
5, - 6, 1 | 2 - 3 2 | 1 - 6, 5, | 6, - - - |
1 - 2 3 | 5 - 6 5 | 3 - 2 1 | 2 - - - |
6, - 1 2 | 3 - 2 1 | 6, - 5, - | 6, - - - ||

\u5E7D\u5170\u9022\u6625 \u2014 \u5FEB\u677F Fast Section
1=D  2/4
Allegro \u2669=144

6, 1 2 3 | 5 3 2 1 | 6, 1 2 3 | 5 6 5 3 |
2 3 5 6 | 5 3 2 1 | 6, 5, 6, 1 | 2 - |
3 5 6 5 | 3 2 1 6, | 5, 6, 1 2 | 3 - |
5 3 2 1 | 6, 1 6, 5, | 6, - - - |
2 3 5 6 | 1' 6 5 3 | 5 6 1' 6 | 5 3 2 1 |
6, 1 2 3 | 5 3 2 1 | 6, 5, 6, 1 | 2 - |
3 2 1 6, | 5, 6, 1 2 | 3 5 6 5 | 3 2 1 6, |
5, - 6, - | 1 - - - ||`,
    description:
      "Grade 8-9. By Zhao Songting and Cao Xing (1979). One of the great dizi concertos.",
    origin: "Zhao Songting & Cao Xing, 1979",
  },
  {
    id: "level-7-song-2",
    type: "song",
    levelId: 7,
    titleChinese: "\u4E09\u4E94\u4E03",
    titleEnglish: "San Wu Qi",
    key: "D",
    timeSignature: "2/4",
    tempo: 152,
    jianpu: `\u4E09\u4E94\u4E03 \u2014 Opening (Rhythmic Theme)
1=D  \u6563\u677F\u21922/4

0 5 3 | 2 1 6, 5, 3, | 5, - |
0 5 3 2 1 | 6, 5, 3, 5, 6, | 1 - |
0 5 3 2 1 6, 5, | 3, 5, 6, 1 2 3 5 | 6 - |

\u4E09\u4E94\u4E03 \u2014 Fast Section
1=D  2/4
Vivace \u2669=152

5 3 2 1 | 6, 5, 3, 5, | 6, 1 2 3 | 5 6 5 3 |
2 1 6, 5, | 6, 1 2 1 | 6, 5, 3, 5, | 6, - |
5 6 5 3 | 2 3 2 1 | 6, 1 6, 5, | 3, 5, 6, 1 |
2 3 5 3 | 2 1 6, 5, | 6, 1 2 1 | 6, - |
3, 5, 6, 1 | 2 3 5 6 | 5 3 2 1 | 6, 5, 3, 5, |
6, - | 0 0 ||`,
    description:
      "A Zhejiang opera style piece arranged by Zhao Songting. Named after its rhythmic pattern. Grade 7.",
    origin: "Zhao Songting (Zhejiang opera)",
  },
  {
    id: "level-7-song-3",
    type: "song",
    levelId: 7,
    titleChinese: "\u79E6\u5DDD\u62B4\u6000",
    titleEnglish: "Reflections on Qinchuan",
    key: "D",
    timeSignature: "4/4",
    tempo: 50,
    jianpu: `\u79E6\u5DDD\u62B4\u6000 \u2014 \u6563\u677F
1=D  \u6563\u677F

0 0 2 3 | 5 - - 6 5 | 3 - 2 - | 1 - 6, - |
5, - - - | 6, 1 2 3 | 2 - - - - |
3 5 6 5 | 3 - 2 1 | 6, - 5, - | 6, - - - |
1 2 3 5 | 6 - 5 3 | 2 - - - - ||

\u79E6\u5DDD\u62B4\u6000 \u2014 Lyrical Theme
1=D  4/4
Adagio \u2669=50

2 - 3 5 | 6 - 5 3 | 2 - - 1 | 6, - - - |
5, - 6, 1 | 2 - 3 2 | 1 - 6, 5, | 6, - - - |
2 - 3 5 | 6 - 1' 6 | 5 - 3 2 | 3 - - - |
5 - 6 1' | 6 - 5 3 | 2 - 1 6, | 5, - - - |
6, - 1 2 | 3 - 2 1 | 6, - 5, 6, | 1 - - - |
2 - 3 5 | 6 - 5 3 | 2 - - - | 0 - - - ||

\u79E6\u5DDD\u62B4\u6000 \u2014 \u5FEB\u677F
1=D  2/4
Vivace \u2669=160

2 3 5 6 | 5 3 2 1 | 6, 1 2 3 | 2 1 6, 5, |
6, 1 2 1 | 6, 5, 6, 1 | 2 - | 0 0 |
5 6 5 3 | 2 3 2 1 | 6, 1 6, 5, | 6, 1 2 3 |
5 3 2 1 | 6, 5, 6, 1 | 2 3 5 6 | 5 - |
2 3 5 3 | 2 1 6, 1 | 2 3 2 1 | 6, 5, 6, 1 |
2 - | 0 0 ||`,
    description:
      "By Ma Di. A northern masterpiece evoking the landscapes of Shaanxi province. Grade 8. Uses Shang mode.",
    origin: "Ma Di",
  },
  {
    id: "level-7-song-4",
    type: "song",
    levelId: 7,
    titleChinese: "\u611B\u7A7A\u5C71",
    titleEnglish: "Sorrowful Empty Mountain",
    key: "D",
    timeSignature: "\u6563\u677F",
    jianpu: `\u611B\u7A7A\u5C71 \u2014 Opening (approximate, simplified)
1=D  \u6563\u677F

pp
5, - - - - | 0 0 0 0 | 6, - - - - | 0 0 0 0 |
1 - - - - - | 2 - 1 - 6, - | 5, - - - - - |
0 0 0 0 | 0 0 0 0 |

(gradually emerging)
6, - 1 - | 2 - - 3 | 2 - 1 - | 6, - - - |
5, 6, 1 2 | 3 - 2 1 | 6, - 5, - | 6, - - - - |

(This piece requires the full published score for accurate study.
The notation here is a simplified excerpt for familiarization.)`,
    description:
      "By Guo Wenjing (1992). A contemporary masterwork for dizi and orchestra. Grade 9+.",
    origin: "Guo Wenjing, 1992",
  },
  {
    id: "level-7-song-5",
    type: "song",
    levelId: 7,
    titleChinese: "\u6885\u82B1\u4E09\u5F04",
    titleVietnamese: "Mai Hoa Tam L\u1ED9ng",
    titleEnglish: "Three Variations on Plum Blossom",
    key: "D",
    timeSignature: "4/4",
    tempo: 52,
    jianpu: `\u6885\u82B1\u4E09\u5F04 \u2014 Main Theme (\u4E00\u5F04)
1=D  4/4
Adagio \u2669=52

5, - 6, 1 | 2 - - 3 | 2 - 1 6, | 5, - - - |
6, - 1 2 | 3 - 5 3 | 2 - 1 6, | 1 - - - |
2 - 3 5 | 6 - 5 3 | 5 - 3 2 | 3 - - - |
2 - 1 6, | 5, - 6, 1 | 6, - 5, 6, | 1 - - - |

\u6885\u82B1\u4E09\u5F04 \u2014 Second Variation (\u4E8C\u5F04, one octave higher)
1=D  4/4

5 - 6 1' | 2' - - 3' | 2' - 1' 6 | 5 - - - |
6 - 1' 2' | 3' - 5' 3' | 2' - 1' 6 | 1' - - - |

\u6885\u82B1\u4E09\u5F04 \u2014 Return (\u4E09\u5F04, back to original)
1=D  4/4

5, - 6, 1 | 2 - - 3 | 2 - 1 6, | 5, - - - |
6, - 1 2 | 3 - 5 3 | 2 - 1 6, | 1 - - - ||`,
    description:
      "Ancient guqin piece (~300 AD), adapted for dizi. A classical masterwork.",
    origin: "Jin Dynasty (~300 AD), guqin",
  },
  {
    id: "level-7-song-6",
    type: "song",
    levelId: 7,
    titleChinese: "\u4E8C\u6CC9\u6620\u6708",
    titleVietnamese: "Nh\u1ECB Tuy\u1EC1n \u00C1nh Nguy\u1EC7t",
    titleEnglish: "Moon Reflected in Two Springs",
    key: "D",
    timeSignature: "4/4",
    tempo: 48,
    jianpu: `\u4E8C\u6CC9\u6620\u6708 (Moon Reflected in Two Springs)
1=D  4/4
Adagio \u2669=48

0 0 0 5, | 6, - 1 2 | 1 - 6, 5, | 6, - - - |
1 - 2 3 | 5 - 3 2 | 1 - 6, 1 | 2 - - - |
3 - 5 6 | 5 - 3 2 | 3 - 2 1 | 6, - - - |
5, - 6, 1 | 2 - 1 6, | 5, - 6, 5, | 3, - - - |
5, - 6, 1 | 2 - 3 5 | 3 - 2 1 | 2 - - - |
6, - 1 2 | 3 - 5 6 | 5 - 3 2 | 1 - - - |
6, - 1 2 | 1 - 6, 5, | 6, - - - | 0 - - - ||`,
    description:
      "By Abing (Hua Yanjun), a blind street musician. Originally for erhu. One of China's most famous instrumental pieces.",
    origin: "Abing (Hua Yanjun)",
  },
];
