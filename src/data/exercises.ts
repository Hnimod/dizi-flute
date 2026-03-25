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
  },

  // ── Level 3 New Exercises ─────────────────────────────────────────
  {
    id: "level-3-exercise-6",
    type: "exercise",
    levelId: 3,
    title: "叠音 (Dié Yīn) — Stacked Grace Note",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `orn:die 1 - - - | orn:die 2 - - - | orn:die 3 - - - | orn:die 5 - - - |
orn:die 1 - orn:die 2 - | orn:die 3 - orn:die 5 - | orn:die 6 - orn:die 5 - | orn:die 3 - - - ||`,
    description:
      "叠音: Flick the finger ONE hole ABOVE the main note, then return. No tongue — finger only. The grace note is so quick it barely sounds. This re-articulates the note without tonguing. Practice slowly: hold the note, then do a single quick flick up and back.",
  },
  {
    id: "level-3-exercise-7",
    type: "exercise",
    levelId: 3,
    title: "打音 (Dǎ Yīn) — Struck Grace Note",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `orn:da 2 - - - | orn:da 3 - - - | orn:da 5 - - - | orn:da 6 - - - |
orn:da 2 - orn:da 3 - | orn:da 5 - orn:da 6 - | orn:da 5 - orn:da 3 - | orn:da 2 - - - ||`,
    description:
      "打音: Strike the finger ONE hole BELOW the main note, then release. No tongue — finger only. Like 叠音 but from below instead of above. Used to re-articulate repeated notes cleanly. Practice: hold a note, quickly tap the hole below, then release.",
  },

  // ── Level 4 New Exercises ─────────────────────────────────────────
  {
    id: "level-4-exercise-6",
    type: "exercise",
    levelId: 4,
    title: "赠音 (Zèng Yīn) — Trailing Gift Note",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `1 - - orn:zeng 1 | 2 - - orn:zeng 2 | 3 - - orn:zeng 3 | 5 - - orn:zeng 5 |
6 - - orn:zeng 6 | 5 - - orn:zeng 5 | 3 - - orn:zeng 3 | 1 - - - ||`,
    description:
      "赠音: At the end of a held note, release a finger as your breath stops. The residual air creates a faint trailing 'gift' note. Practice: hold a long tone for 3 beats, then on beat 4 gently lift one finger as you stop blowing. The effect is a soft, vanishing ornamental note.",
  },
  {
    id: "level-4-exercise-7",
    type: "exercise",
    levelId: 4,
    title: "波音 (Bō Yīn) — Mordent",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `orn:bo 1 - - - | orn:bo 2 - - - | orn:bo 3 - - - | orn:bo 5 - - - |
orn:bo 1 - orn:bo 3 - | orn:bo 5 - orn:bo 6 - | orn:bo 5 - orn:bo 3 - | orn:bo 1 - - - ||`,
    description:
      "波音: A single rapid flick to the upper neighbor and back — like a one-cycle trill. Differs from trill (颤音) which repeats many times. Practice: hold a note, do ONE quick up-down finger movement, then sustain. The 波 should be barely noticeable — a subtle 'wave' in the sound.",
  },
  {
    id: "level-4-exercise-8",
    type: "exercise",
    levelId: 4,
    title: "花舌 (Huā Shé) — Flutter Tongue",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `orn:flutter 3 - - - | orn:flutter 5 - - - | orn:flutter 6 - - - | orn:flutter 5 - - - |
orn:flutter 3 - orn:flutter 5 - | orn:flutter 6 - orn:flutter 5 - | orn:flutter 3 - - - | 3 - - - ||`,
    description:
      "花舌: Roll your tongue (like a rolled 'R' in Spanish) while blowing into the dizi. Creates a buzzing, tremolo-like effect. Step 1: Practice rolling your tongue without the dizi. Step 2: Try it while blowing a long tone on middle register notes (3, 5, 6). Start with easy notes and sustain the flutter for the full duration.",
  },

  // ── Level 5 New Exercises ─────────────────────────────────────────
  {
    id: "level-5-exercise-4",
    type: "exercise",
    levelId: 5,
    title: "历音 (Lì Yīn) — Glissando Runs",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `5, 6, 1 2 | 3 5 6 1' | 2' - - - | 2' 1' 6 5 | 3 2 1 6, | 5, - - - |
5, 6, 1 2 | 3 5 6 1' | 1' 6 5 3 | 2 1 6, 5, | 5, - - - ||`,
    description:
      "历音: Rapid sequential runs through multiple notes — like a cascade or waterfall of sound. Practice ascending (low→high) and descending (high→low) separately. Start slowly, ensuring each note sounds clearly, then gradually increase speed until the notes blur together into a smooth glissando effect.",
  },
  {
    id: "level-5-exercise-5",
    type: "exercise",
    levelId: 5,
    title: "剁音 (Duò Yīn) — Chopped Note",
    key: "D",
    timeSignature: "2/4",
    tempo: 80,
    jianpu: `1' 1 | 1' 2 | 1' 3 | 1' 5 |
1' 1 | 1' 6, | 1' 5, | 1 - ||`,
    description:
      "剁音: A dramatic northern-style attack. Start with all holes open (high pitch), then tongue and slam all fingers down to the target note simultaneously. The effect is a sharp downward 'chop'. Practice: start from the highest note, then drop to each target note. Focus on the coordination of tongue attack + finger slam happening at exactly the same instant.",
  },

  // ── Level 6 New Exercises ─────────────────────────────────────────
  {
    id: "level-6-exercise-1",
    type: "exercise",
    levelId: 6,
    title: "循环换气 (Circular Breathing) Steps",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `1 - - - | 1 - - - | 1 - - - | 1 - - - |
1 - - - | 1 - - - | 1 - - - | 1 - - - ||`,
    description:
      "循环换气: Breathe in through your nose while maintaining airflow from your mouth. Practice in 3 stages:\n\nStage 1 (no dizi): Puff cheeks with air. Breathe in through nose while holding cheeks puffed.\n\nStage 2 (no dizi): Puff cheeks, slowly release air through a small lip opening while simultaneously breathing in through nose.\n\nStage 3 (with dizi): Sustain a long tone on note 1. When running low on air, puff cheeks and switch to cheek air while nose-inhaling. The goal is an unbroken tone across the breath switch. Start with note 1 (easiest embouchure).",
  },
  {
    id: "level-6-exercise-2",
    type: "exercise",
    levelId: 6,
    title: "半孔 (Half-Holing) Chromatic Scale",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `5, - #5, - | 6, - b7, - | 7, - 1 - | #1 - 2 - |
#2 - 3 - | #4 - 5 - | #5 - 6 - | b7 - 7 - | 1' - - - ||`,
    description:
      "半孔: Partially cover a hole to produce notes between the standard scale degrees. Slide your finger to cover roughly half the hole. Practice each chromatic note slowly, checking intonation. Sharp notes (#1, #2, #4, #5) require half-covering specific holes. Listen carefully for pitch accuracy — half-holing is subtle and requires fine finger control.",
  },
  {
    id: "level-6-exercise-3",
    type: "exercise",
    levelId: 6,
    title: "泛音 (Harmonics) Practice",
    key: "D",
    timeSignature: "4/4",
    tempo: 60,
    jianpu: `1 - 1' - | 2 - 2' - | 3 - 3' - | 5 - 5' - |
1' - - - | 2' - - - | 3' - - - ||`,
    description:
      "泛音: Overtone pitches produced by overblowing with specific fingerings. Using the SAME fingering as the lower note, increase air speed and tighten embouchure to produce the note one octave above. Practice: play middle 1, then without changing fingers, overblow to reach high 1'. The transition should be smooth. This develops embouchure control for the upper register.",
  },
  {
    id: "level-6-exercise-4",
    type: "exercise",
    levelId: 6,
    title: "飞指 (Flying Fingers) Practice",
    key: "D",
    timeSignature: "4/4",
    tempo: 72,
    jianpu: `1 - - - | 2 - - - | 3 - - - | 5 - - - |
6 - - - | 5 - - - | 3 - - - | 1 - - - ||`,
    description:
      "飞指: Rapid lateral finger movement across holes while sustaining a note, creating a shimmering, vibrating effect. Practice: hold a long tone, then rapidly wave your fingers across the open holes (not closing them fully, just brushing over). Start slowly and increase speed. The result should be a sparkling, tremolo-like shimmer — different from trill (which alternates between two specific notes).",
  },
];
