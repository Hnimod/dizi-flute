import type { Exercise } from "@/shared/types";

export const exercises: Exercise[] = [
  // ── Level 0 Exercises ──────────────────────────────────────────────
  {
    id: "level-0-exercise-1",
    type: "exercise",
    levelId: 0,
    title: "Rhythm Clapping: Quarter Notes",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1  1  1  1 | 1  1  1  1 | 1  1  1  1 | 1  1  1  1 ||`,
    description: "Clap on each note to practice reading jianpu rhythm.",
  },
  {
    id: "level-0-exercise-2",
    type: "exercise",
    levelId: 0,
    title: "Rhythm Clapping: Half and Quarter Notes",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1  -  1  1 | 1  1  1  - | 1  -  1  - | 1  -  -  - ||`,
    description: "Practice half notes and quarter notes by clapping.",
  },
  {
    id: "level-0-exercise-3",
    type: "exercise",
    levelId: 0,
    title: "Rhythm Clapping: With Rests",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1  1  0  1 | 1  0  1  1 | 1  -  0  0 | 1  1  1  - ||`,
    description: "Practice rests (silence) within rhythmic patterns.",
  },
  {
    id: "level-0-exercise-4",
    type: "exercise",
    levelId: 0,
    title: "Rhythm Clapping: Reading Different Numbers",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1  2  3  4 | 5  -  5  - | 6  5  4  3 | 2  -  1  - ||`,
    description:
      "Clap the rhythm while saying the numbers out loud. This builds your jianpu reading before adding the complexity of playing.",
  },

  // ── Level 1 Exercises ──────────────────────────────────────────────
  {
    id: "level-1-exercise-1",
    type: "exercise",
    levelId: 1,
    title: "Long Tones on Each Note",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `1 - - - | 1 - - - | 0 0 0 0 |
2 - - - | 2 - - - | 0 0 0 0 |
3 - - - | 3 - - - | 0 0 0 0 |
4 - - - | 4 - - - | 0 0 0 0 |
5 - - - | 5 - - - | 0 0 0 0 ||`,
    description: "Hold each note as long as possible with a steady, even tone.",
    audioPath: "/audio/level-1/01-long-tones.ogg",
  },
  {
    id: "level-1-exercise-2",
    type: "exercise",
    levelId: 1,
    title: "Scale Walk (Ascending)",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `1 - 2 - | 3 - 4 - | 5 - - - | 0 - - - ||`,
    description: "Walk up the scale slowly from Do to Sol.",
    audioPath: "/audio/level-1/02-scale-walk-ascending.ogg",
  },
  {
    id: "level-1-exercise-3",
    type: "exercise",
    levelId: 1,
    title: "Scale Walk (Descending)",
    key: "D",
    timeSignature: "4/4",
    jianpu: `5 - 4 - | 3 - 2 - | 1 - - - | 0 - - - ||`,
    description: "Walk down the scale from Sol to Do.",
    audioPath: "/audio/level-1/03-scale-walk-descending.ogg",
  },
  {
    id: "level-1-exercise-4",
    type: "exercise",
    levelId: 1,
    title: "Scale Up and Down",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 - 2 - | 3 - 4 - | 5 - - - | 0 0 0 0 |
5 - 4 - | 3 - 2 - | 1 - - - | 0 0 0 0 ||`,
    description: "Combine ascending and descending scale practice.",
    audioPath: "/audio/level-1/04-scale-up-and-down.ogg",
  },
  {
    id: "level-1-exercise-5",
    type: "exercise",
    levelId: 1,
    title: "Step Patterns",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 2 1 2 | 3 4 3 4 | 5 4 5 4 | 3 2 3 2 |
1 - - - | 0 0 0 0 ||`,
    description: "Practice stepwise motion between adjacent notes.",
    audioPath: "/audio/level-1/05-step-patterns.ogg",
  },
  {
    id: "level-1-exercise-6",
    type: "exercise",
    levelId: 1,
    title: "Skip Patterns",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 3 1 3 | 2 4 2 4 | 3 5 3 5 | 1 - - - ||`,
    description: "Practice skipping between notes (intervals of a third).",
    audioPath: "/audio/level-1/06-skip-patterns.ogg",
  },
  {
    id: "level-1-exercise-7",
    type: "exercise",
    levelId: 1,
    title: "Simple Tonguing Practice",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 1 1 1 | 2 2 2 2 | 3 3 3 3 | 4 4 4 4 |
5 5 5 5 | 4 4 4 4 | 3 3 3 3 | 2 2 2 2 |
1 - - - ||`,
    description:
      'Single tongue each note with "tu". Start at 60 BPM.',
    audioPath: "/audio/level-1/07-tonguing-practice.ogg",
  },

  // ── Level 2 Exercises ──────────────────────────────────────────────
  {
    id: "level-2-exercise-1",
    type: "exercise",
    levelId: 2,
    title: "Full Scale Long Tones",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `5, - - - | 6, - - - | 7, - - - | 1 - - - |
2 - - - | 3 - - - | 4 - - - | 5 - - - |
6 - - - | 7 - - - | 1' - - - | 0 - - - ||`,
    description: "Long tones through the full scale from low Sol to high Do.",
    audioPath: "/audio/level-2/01-full-scale-long-tones.ogg",
  },
  {
    id: "level-2-exercise-2",
    type: "exercise",
    levelId: 2,
    title: "Pentatonic Scale Patterns",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 2 3 5 | 6 - - - | 6 5 3 2 | 1 - - - |
1 3 5 6 | 5 3 2 1 | 2 3 5 6 | 1 - - - ||`,
    description: "Practice the pentatonic scale in various patterns.",
    audioPath: "/audio/level-2/02-pentatonic-patterns.ogg",
  },
  {
    id: "level-2-exercise-3",
    type: "exercise",
    levelId: 2,
    title: "Octave Jumps",
    key: "D",
    timeSignature: "4/4",
    jianpu: `5, - 5 - | 6, - 6 - | 7, - 7 - | 1 - 1' - |
1' - 1 - | 7 - 7, - | 6 - 6, - | 5 - 5, - ||`,
    description: "Practice jumping between octaves on the same note.",
    audioPath: "/audio/level-2/03-octave-jumps.ogg",
  },
  {
    id: "level-2-exercise-4",
    type: "exercise",
    levelId: 2,
    title: "Tonguing on Eighth Notes",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1 2 | 3 4 | 5 6 | 7 1' |
1' 7 | 6 5 | 4 3 | 2 1 ||`,
    description:
      'Tongue each note with "tu". Two notes per beat.',
    audioPath: "/audio/level-2/04-tonguing-eighth-notes.ogg",
  },

  // ── Level 3 Exercises ──────────────────────────────────────────────
  {
    id: "level-3-exercise-1",
    type: "exercise",
    levelId: 3,
    title: "Dynamic Long Tones",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 - - - - - - - | 2 - - - - - - - |
3 - - - - - - - | 5 - - - - - - - |
6 - - - - - - - ||`,
    description:
      "Play each note: start very soft, grow to loud, return to soft.",
    audioPath: "/audio/level-3/01-dynamic-long-tones.ogg",
  },
  {
    id: "level-3-exercise-2",
    type: "exercise",
    levelId: 3,
    title: "Pentatonic Patterns",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1 2 | 3 5 | 6 5 | 3 2 |
1 3 | 5 6 | 5 3 | 2 1 |
6, 1 | 2 3 | 5 6 | 5 - ||`,
    description: "Practice pentatonic patterns in 2/4 time.",
    audioPath: "/audio/level-3/02-pentatonic-patterns.ogg",
  },
  {
    id: "level-3-exercise-3",
    type: "exercise",
    levelId: 3,
    title: "Two-Octave Scale Run",
    key: "D",
    timeSignature: "4/4",
    jianpu: `5, 6, 7, 1 | 2 3 4 5 | 6 7 1' - | 0 0 0 0 |
1' 7 6 5 | 4 3 2 1 | 7, 6, 5, - | 0 0 0 0 ||`,
    description: "Full two-octave scale ascending and descending.",
    audioPath: "/audio/level-3/03-two-octave-scale.ogg",
  },
  {
    id: "level-3-exercise-4",
    type: "exercise",
    levelId: 3,
    title: "Dotted Rhythm Patterns",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1. 2 | 3. 5 | 6. 5 | 3 - |
5. 6 | 5. 3 | 2. 1 | 6, - ||`,
    description:
      'Practice dotted rhythms creating a "long-short" swing feel.',
    audioPath: "/audio/level-3/04-dotted-rhythms.ogg",
  },
  {
    id: "level-3-exercise-5",
    type: "exercise",
    levelId: 3,
    title: "Grace Note Practice",
    key: "D",
    timeSignature: "4/4",
    jianpu: `(2)1 - - - | (1)2 - - - | (2)3 - - - | (3)2 - - - |
(6)5 - - - | (5)6 - - - | (2)1 - - - ||`,
    description:
      "Numbers in parentheses are grace notes -- play them very quickly before the main note.",
    audioPath: "/audio/level-3/05-grace-notes.ogg",
  },

  // ── Level 4 Exercises ──────────────────────────────────────────────
  {
    id: "level-4-exercise-1",
    type: "exercise",
    levelId: 4,
    title: "Vibrato Long Tones",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 - - - - - - - | 2 - - - - - - - |
3 - - - - - - - | 5 - - - - - - - |
6 - - - - - - - | 1' - - - - - - - ||`,
    description:
      "Start each note plain for the first beat, then add vibrato for the remaining 7 beats.",
    audioPath: "/audio/level-4/01-vibrato-long-tones.ogg",
  },
  {
    id: "level-4-exercise-2",
    type: "exercise",
    levelId: 4,
    title: "Double Tonguing Drill",
    key: "D",
    timeSignature: "4/4",
    tempo: 80,
    jianpu: `1 1 1 1 | 2 2 2 2 | 3 3 3 3 | 5 5 5 5 |
6 6 6 6 | 5 5 5 5 | 3 3 3 3 | 2 2 2 2 |
1 1 1 1 | 1 - - - ||`,
    description:
      'Each note tongued with alternating tu-ku. Make "ku" as clear as "tu."',
    audioPath: "/audio/level-4/02-double-tonguing.ogg",
  },
  {
    id: "level-4-exercise-3",
    type: "exercise",
    levelId: 4,
    title: "Trill Practice",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 tr - - | 2 tr - - | 3 tr - - | 5 tr - - |
6 tr - - | 5 tr - - | 3 tr - - | 1 tr - - ||`,
    description:
      "Hold each trill for 3 beats. Start with slow trills and increase speed.",
    audioPath: "/audio/level-4/03-trill-practice.ogg",
  },
  {
    id: "level-4-exercise-4",
    type: "exercise",
    levelId: 4,
    title: "Ornament Combinations",
    key: "D",
    timeSignature: "2/4",
    jianpu: `(d)1 - | (d)2 - | (d)3 - | (d)5 - |
(da)6 5 | (da)5 3 | (da)3 2 | (da)1 - ||`,
    description:
      "First half: practice \u53E0\u97F3 on held notes. Second half: practice \u6253\u97F3 on moving passages.",
    audioPath: "/audio/level-4/04-ornament-combinations.ogg",
  },
  {
    id: "level-4-exercise-5",
    type: "exercise",
    levelId: 4,
    title: "Sixteenth Note Patterns",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1 2 3 2 | 1 - | 3 5 6 5 | 3 - |
5 6 1' 6 | 5 3 | 2 3 5 3 | 2 - ||`,
    description:
      "Groups of four sixteenth notes per beat. Keep fingers close to the holes for speed.",
    audioPath: "/audio/level-4/05-sixteenth-notes.ogg",
  },

  // ── Level 5 Exercises ──────────────────────────────────────────────
  {
    id: "level-5-exercise-1",
    type: "exercise",
    levelId: 5,
    title: "Triple Tonguing Drill",
    key: "D",
    timeSignature: "2/4",
    jianpu: `1 1 1  2 2 2 | 3 3 3  5 5 5 | 6 6 6  5 5 5 | 3 3 3  2 2 2 |
1 1 1  1 - ||`,
    description: "Practice the tu-tu-ku pattern on triplet groupings.",
    audioPath: "/audio/level-5/triple-tonguing-drill.ogg",
  },
  {
    id: "level-5-exercise-2",
    type: "exercise",
    levelId: 5,
    title: "Slide Practice",
    key: "D",
    timeSignature: "4/4",
    jianpu: `1 - \u21973 - | 3 - \u21975 - | 5 - \u21976 - | 6 - \u21985 - |
5 - \u21983 - | 3 - \u21981 - ||`,
    description: "Practice upward and downward slides between notes.",
    audioPath: "/audio/level-5/slide-practice.ogg",
  },
  {
    id: "level-5-exercise-3",
    type: "exercise",
    levelId: 5,
    title: "\u6563\u677F Free Time Exercise",
    key: "D",
    timeSignature: "\u6563\u677F",
    jianpu: `5, - - 6, 1 | 2 3 - - - | 5 - 6 5 3 | 2 - - - |
1 - - - 6, | 5, - - - - ||`,
    description:
      "No metronome. Feel each note. Breathe naturally.",
    audioPath: "/audio/level-5/sanban-free-time.ogg",
  },
];
