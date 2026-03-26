import type { Technique } from "@/shared/types";

export const techniques: Technique[] = [
  // ── Fundamentals ──
  {
    id: "rhythm-reading",
    name: "Rhythm Reading",
    category: "fundamentals",
    level: 0,
    description: "Reading jianpu rhythm by clapping. Foundation for all playing.",
    referenceSlug: "jianpu-guide",
    content: `## What is Rhythm Reading?

Before playing any notes, you need to internalize rhythm. Jianpu (numbered notation) uses dashes and underlines to show note duration:

- **Quarter note:** a single number (e.g., \`5\`) = 1 beat
- **Half note:** number + dash (\`5 -\`) = 2 beats
- **Whole note:** number + 3 dashes (\`5 - - -\`) = 4 beats
- **Eighth note:** underlined number (\`5_\`) = half a beat
- **Sixteenth note:** double underlined (\`5__\`) = quarter of a beat

## How to Practice

1. **Clap** the rhythm before picking up the dizi
2. Count out loud: "1 and 2 and 3 and 4 and"
3. Start with simple patterns (quarters and halves)
4. Add eighth notes only after quarters feel natural
5. Use a metronome — start at 60 BPM

## In Notation

Rests use \`0\` with the same duration rules: \`0\` (quarter rest), \`0 -\` (half rest), \`0_\` (eighth rest).`,
    notationExample: "5 5 5 5 | 5 - 5 - | 5 5 5_ 5_ 5 | 5 - - - ||",
  },
  {
    id: "long-tones",
    name: "Long Tones (长音)",
    category: "fundamentals",
    level: 1,
    description: "Sustaining each note with steady, even tone. Builds breath control and embouchure stability.",
    content: `## What are Long Tones?

Long tones (长音, cháng yīn) are sustained notes held for several beats. This is the single most important exercise for developing a beautiful tone on the dizi.

## How to Do It

1. Take a deep diaphragmatic breath (belly expands, not chest)
2. Start the note with a gentle "tu" attack
3. Hold the note as long as possible with **even volume and pitch**
4. Listen for wobbles, cracks, or thinning — these indicate embouchure issues
5. The tone should be full, round, and steady from start to finish

## How to Practice

- Start with middle register notes (5, 6, 1', 2') — these are easiest
- Hold each note for 8-12 beats at 60 BPM
- Focus on one thing at a time: first steadiness, then volume, then tone color
- Practice piano (soft) long tones — these are harder and build more control
- Gradually extend to low register (1, 2, 3) and high register (5', 6')

## Common Mistakes

- Puffing cheeks (keep them firm)
- Shoulders rising during breath (breathe with the belly)
- Squeezing tighter as air runs out (relax and let the diaphragm do the work)`,
    notationExample: "5 - - - | 6 - - - | 1' - - - | 2' - - - ||",
  },
  {
    id: "scale-walk",
    name: "Scale Walking",
    category: "fundamentals",
    level: 1,
    description: "Walking up and down the scale stepwise. Builds finger coordination and note transitions.",
    referenceSlug: "fingering-charts",
    content: `## What is Scale Walking?

Walking through the scale note by note — ascending and descending. This builds the foundation for all finger movement on the dizi.

## How to Do It

1. Start from the lowest note your dizi can play (usually low 5 or 1)
2. Play each note in order going up: 1 2 3 4 5 6 7 1'
3. Then come back down: 1' 7 6 5 4 3 2 1
4. Each note should be clear and even — no rushing between notes

## How to Practice

- **Slow first:** Quarter notes at 60 BPM, one note per beat
- **Listen** for clean transitions — no gaps or overlapping between notes
- **Lift fingers just enough** — large movements waste time and cause clumsiness
- Keep unused fingers hovering close to their holes
- Once smooth, increase tempo in steps of 10 BPM

## In Notation

Scale exercises are simply ascending and descending note sequences.`,
    notationExample: "1 2 3 4 | 5 6 7 1' | 1' 7 6 5 | 4 3 2 1 ||",
  },
  {
    id: "step-patterns",
    name: "Step Patterns",
    category: "fundamentals",
    level: 1,
    description: "Stepwise motion between adjacent notes. Develops smooth finger transitions.",
    content: `## What are Step Patterns?

Step patterns practice moving between neighboring notes in various combinations — not just up-down scales, but patterns like 1-2-1, 2-3-2, or 1-2-3-2-1.

## How to Do It

1. Pick a simple pattern (e.g., go up two, back one)
2. Apply it starting from each scale degree
3. Keep all notes even in volume and duration
4. Focus on the **transition** between notes, not the notes themselves

## How to Practice

- Pattern: up 2, back 1 → 1 2 | 2 3 | 3 4 | 4 5 ...
- Pattern: neighbor tones → 1 2 1 | 2 3 2 | 3 4 3 ...
- Start at 60 BPM, increase only when smooth
- Apply to real song passages that give you trouble`,
    notationExample: "1 2 1 - | 2 3 2 - | 3 4 3 - | 4 5 4 - ||",
  },
  {
    id: "skip-patterns",
    name: "Skip Patterns (Intervals)",
    category: "fundamentals",
    level: 1,
    description: "Skipping between notes (intervals of a third). Builds finger independence.",
    content: `## What are Skip Patterns?

Skip patterns involve jumping over a note (thirds) rather than stepping. For example: 1-3, 2-4, 3-5. This requires lifting/pressing multiple fingers simultaneously.

## How to Do It

1. Play 1, then skip to 3 (skip over 2)
2. The fingers for 2 must lift at the same time you move to 3
3. Both notes should sound clean — no intermediate "ghost" notes

## How to Practice

- Thirds ascending: 1 3 | 2 4 | 3 5 | 4 6 ...
- Thirds descending: 6 4 | 5 3 | 4 2 | 3 1
- Mix: 1 3 2 4 | 3 5 4 6 ...
- This is harder than step patterns — take it slower
- Listen for any "scooping" between notes — fingers should move together

## Why It Matters

Most melodies combine steps and skips. Skip patterns prepare you for the leaps found in real songs.`,
    notationExample: "1 3 2 4 | 3 5 4 6 | 5 3 6 4 | 5 3 2 1 ||",
  },

  // ── Articulation ──
  {
    id: "tonguing",
    name: "Single Tonguing (吐音)",
    category: "articulation",
    level: 1,
    description: "Articulating each note with 'tu'. The basic attack for starting notes cleanly.",
    content: `## What is Single Tonguing?

Single tonguing (吐音, tǔ yīn) is the most fundamental articulation on the dizi. Every note that needs a clear beginning uses tonguing.

## How to Do It

1. Place your tongue tip behind your upper front teeth
2. Say "tu" (吐) while blowing into the dizi
3. The tongue briefly blocks then releases the airflow — like a valve
4. The air should be continuous; the tongue just interrupts it momentarily

## How to Practice

- Start with a single note (middle 5) — tongue it slowly and evenly
- Say "tu tu tu tu" away from the dizi first to feel the motion
- Each "tu" should produce the same volume and tone
- Gradually move through the scale, tonguing every note
- Increase speed only after each attack is clean and even

## In Notation

Tonguing is marked with **T** above the note.

## Common Mistakes

- Tonguing too hard (the tongue should be light, not percussive)
- Stopping airflow between notes (air should be continuous — tongue only interrupts)
- Using the middle of the tongue instead of the tip`,
    notationExample: "T:single 5 T:single 5 T:single 5 T:single 5 | T:single 1 T:single 2 T:single 3 T:single 4 | T:single 5 T:single 6 T:single 7 T:single 1' ||",
  },
  {
    id: "double-tonguing",
    name: "Double Tonguing (双吐)",
    category: "articulation",
    level: 4,
    description: "Alternating 'tu-ku' for faster passages. Essential for rapid articulation.",
    content: `## What is Double Tonguing?

Double tonguing (双吐, shuāng tǔ) alternates between "tu" (tongue tip) and "ku" (back of tongue). This doubles your articulation speed compared to single tonguing.

## How to Do It

1. Say "tu" — tongue tip touches behind upper teeth (same as single tonguing)
2. Say "ku" — back of tongue touches the soft palate
3. Alternate rapidly: "tu-ku-tu-ku"
4. Both syllables should produce **equal** volume and clarity

## How to Practice

- Away from dizi: say "tu-ku-tu-ku" evenly, then speed up
- On the dizi: start very slowly on one note (e.g., 5)
- The "ku" will be weaker at first — this is normal. Focus on making it match "tu"
- Practice at 60 BPM (two attacks per beat), then gradually increase
- Apply to scales: tu-ku on ascending, ku-tu on descending

## In Notation

Double tonguing is marked with **TK** above the note.`,
    notationExample: "T:double 5 T:double 5 T:double 5 T:double 5 | T:double 1 T:double 2 T:double 3 T:double 5 ||",
  },
  {
    id: "triple-tonguing",
    name: "Triple Tonguing (三吐)",
    category: "articulation",
    level: 5,
    description: "'Tu-tu-ku' pattern for triplet groupings. Used in fast triple-meter passages.",
    content: `## What is Triple Tonguing?

Triple tonguing (三吐, sān tǔ) uses the pattern "tu-tu-ku" for groups of three notes. Essential for fast passages in 3/4 or 6/8 time, or any triplet figures.

## How to Do It

1. Combine single and double tonguing: **tu-tu-ku**
2. The first two "tu"s use the tongue tip, the "ku" uses the back of tongue
3. The three syllables must be perfectly even in timing and volume
4. Alternative pattern: "tu-ku-tu" — some players prefer this

## How to Practice

- Speak "tu-tu-ku" rhythmically away from the dizi
- On one note at 60 BPM: three attacks per beat
- Practice both patterns (tu-tu-ku and tu-ku-tu) — use whichever feels more natural
- Apply to triplet passages in songs

## In Notation

Triple tonguing is marked with **TTK** above the note.`,
    notationExample: "T:triple 5 T:triple 5 T:triple 5 | T:triple 6 T:triple 6 T:triple 6 | T:triple 5 - - ||",
  },
  {
    id: "duo-yin",
    name: "剁音 (Chopped Note)",
    category: "articulation",
    level: 5,
    description: "Dramatic northern-style attack: tongue + slam all fingers from open to target note simultaneously.",
    content: `## What is 剁音?

剁音 (duò yīn, "chopped note") is a dramatic, percussive articulation used in northern Chinese dizi music. It combines a hard tongue attack with a simultaneous finger slam.

## How to Do It

1. Start with all holes open (or a different fingering than the target)
2. Simultaneously: tongue hard ("tu!") AND slam fingers down to the target note
3. The combined impact creates a sharp, explosive sound
4. The note should "pop" out — much more aggressive than normal tonguing

## How to Practice

- Start with middle register notes where you can slam 2-3 fingers at once
- Practice the coordination: tongue and fingers must land at exactly the same moment
- Start slowly — the timing is the hard part
- Listen to northern dizi masters (e.g., 冯子存, Feng Zicun) for the characteristic sound

## When to Use

剁音 appears primarily in northern Chinese folk music and Beijing opera styles. It conveys energy, drama, and excitement.`,
  },

  // ── Ornaments ──
  {
    id: "grace-note",
    name: "Grace Notes (装饰音)",
    category: "ornaments",
    level: 3,
    description: "Quick ornamental notes before the main note. Adds characteristic Chinese flavor to dizi playing.",
    content: `## What are Grace Notes?

Grace notes (装饰音, zhuāngshì yīn) are very short notes played just before the main note. They add color and expressiveness — a plain melody becomes characteristically "Chinese" with grace notes.

## How to Do It

1. The grace note is played as quickly as possible — it has no real rhythmic value
2. Immediately transition to the main note, which gets the full beat
3. The grace note should be heard but not dwelled on
4. Common patterns: one note above or below the main note

## Types

- **Single grace note:** one quick note → main note. Written as \`(2)3\` = quick 2, then 3
- **Double grace note:** two quick notes → main note. Written as \`(2)(3)5\` = quick 2, quick 3, then 5

## How to Practice

- Start by playing the main note normally, then add the grace note
- The grace note finger should "flick" — fast on, fast off
- Practice slowly at first, gradually making the grace note shorter
- Apply to real songs: add grace notes to melody notes that feel plain

## In Notation

Grace notes appear as small numbers in parentheses before the main note.`,
    notationExample: "(2)3 - (5)6 - | (2)(3)5 - - - ||",
  },
  {
    id: "die-yin",
    name: "叠音 (Stacked Grace)",
    category: "ornaments",
    level: 3,
    description: "Flick finger one hole above the main note and return. Re-articulates without tonguing.",
    content: `## What is 叠音?

叠音 (dié yīn, "stacked sound") is a grace note from **above**. You briefly flick the finger for one note higher than the target, then immediately return. It re-starts a note without using the tongue.

## How to Do It

1. While holding the main note, quickly lift the finger for the note **above**
2. Immediately put it back down
3. The motion is: main note → brief upper note → back to main note
4. The whole ornament takes a fraction of a beat

## How to Practice

- Hold note 3, then flick the 4 finger up and back
- The flick should be as fast as possible — almost instantaneous
- Practice on every scale degree: 1→2→1, 2→3→2, 3→4→3, etc.
- Use it to re-articulate repeated notes without tonguing

## In Notation

叠音 is marked with **叠** above the note. In notation: \`orn:die\` before the note.`,
    notationExample: "orn:die 3 - orn:die 3 - | orn:die 5 - orn:die 5 - ||",
  },
  {
    id: "da-yin",
    name: "打音 (Struck Grace)",
    category: "ornaments",
    level: 3,
    description: "Strike finger one hole below the main note and release. Like 叠音 but from below.",
    content: `## What is 打音?

打音 (dǎ yīn, "struck sound") is a grace note from **below**. You briefly strike the finger for one note lower, then release. The opposite direction of 叠音.

## How to Do It

1. While holding the main note, quickly press the finger for the note **below**
2. Immediately release it
3. The motion is: main note → brief lower note → back to main note
4. The strike should be quick and percussive

## How to Practice

- Hold note 5, strike the 4 finger down and release
- The finger should "bounce" off the hole
- Practice: 2→1→2, 3→2→3, 5→4→5, 6→5→6
- Compare with 叠音 — learn to use both directions musically

## In Notation

打音 is marked with **打** above the note. In notation: \`orn:da\` before the note.`,
    notationExample: "orn:da 5 - orn:da 5 - | orn:da 3 - orn:da 3 - ||",
  },
  {
    id: "zeng-yin",
    name: "赠音 (Trailing Note)",
    category: "ornaments",
    level: 4,
    description: "At the end of a held note, release a finger as breath stops. Creates a faint trailing 'gift' note.",
    content: `## What is 赠音?

赠音 (zèng yīn, "gift sound") is a faint note that appears at the **end** of a held note. As your breath fades, you release a finger to create a soft, trailing ornament.

## How to Do It

1. Hold the main note normally
2. Just as your breath is ending, lift one finger (usually the one above)
3. The trailing note should be very soft — barely audible
4. It creates a gentle "fade-out" effect rather than an abrupt ending

## How to Practice

- Hold note 5 for 4 beats, then lift the 6 finger as you stop blowing
- The "gift" note (6) should be whisper-quiet
- Practice on long notes in slow passages
- This is a subtlety — overdoing it sounds unnatural

## In Notation

赠音 is marked with **赠** above the note. In notation: \`orn:zeng\` before the note.`,
    notationExample: "5 - - orn:zeng 5 | 3 - - orn:zeng 3 ||",
  },
  {
    id: "bo-yin",
    name: "波音 (Mordent)",
    category: "ornaments",
    level: 4,
    description: "A single rapid flick to the upper neighbor and back — like a one-cycle trill.",
    content: `## What is 波音?

波音 (bō yīn, "wave sound") is a single rapid oscillation to the upper neighbor note and back. Think of it as a trill that only goes around once.

## How to Do It

1. Play the main note
2. Quickly flick to the note above and immediately return
3. It's like 叠音 but performed at the **beginning** of the note rather than mid-note
4. The whole ornament: main → upper → main, all in one quick motion

## How to Practice

- On note 5: play 5-6-5 as fast as possible, making it sound like one decorated note
- The "6" in the middle should be barely perceptible
- Practice on each scale degree
- Compare with trill (tr) — 波音 is just one cycle, trill is many

## In Notation

波音 is marked with **波** above the note. In notation: \`orn:bo\` before the note.`,
    notationExample: "orn:bo 5 - - - | orn:bo 3 - orn:bo 6 - ||",
  },
  {
    id: "trill",
    name: "Trill (颤音)",
    category: "ornaments",
    level: 4,
    description: "Rapid alternation between two adjacent notes. Repeated many times unlike 波音.",
    content: `## What is a Trill?

A trill (颤音, chàn yīn) is a rapid, continuous alternation between the main note and the note above. Unlike 波音 (single cycle), a trill sustains the oscillation for the full duration.

## How to Do It

1. Finger the main note
2. Rapidly flick the next-higher finger up and down repeatedly
3. Keep the oscillation even and controlled
4. The speed should be fast but not frantic

## How to Practice

- Start slow: alternate 5-6-5-6 at a comfortable speed
- Gradually increase speed while maintaining evenness
- The finger should move from the knuckle, not the whole hand
- Keep the flicking finger relaxed — tension kills speed
- Practice trills on every note: 1-2, 2-3, 3-4, 5-6, 6-7

## In Notation

Trills are marked with **tr** above the note. In notation: \`tr\` as a prefix.`,
    notationExample: "tr5 - - - | tr3 - tr6 - ||",
  },
  {
    id: "ornament-combo",
    name: "Ornament Combinations",
    category: "ornaments",
    level: 4,
    description: "Combining 叠音 and 打音 in musical context. Practice switching between ornament types.",
    content: `## What are Ornament Combinations?

Real dizi music rarely uses just one ornament type. Skilled players mix 叠音, 打音, grace notes, and 波音 fluidly. The key is knowing **when** to use each.

## Guidelines

- **叠音 (from above):** Use when approaching a note from above, or to re-articulate gently
- **打音 (from below):** Use when approaching from below, or for a more percussive re-articulation
- **Grace notes:** Use at the start of important melody notes
- **波音:** Use on long held notes to add shimmer at the beginning

## How to Practice

1. Take a simple melody you know well
2. First play it plain — no ornaments
3. Add 叠音 on repeated notes
4. Add grace notes on downbeats
5. Experiment with 打音 on ascending passages
6. Listen to recordings of dizi masters and imitate their ornament choices

## Key Principle

Ornaments should enhance the music, not clutter it. Less is more — a well-placed ornament is worth more than a dozen random ones.`,
    notationExample: "(2)3 orn:die 5 orn:da 3 - | orn:bo 6 - (5)6 orn:die 5 ||",
  },

  // ── Breathing ──
  {
    id: "dynamics",
    name: "Dynamic Control (力度)",
    category: "breathing",
    level: 3,
    description: "Controlling volume from very soft to very loud. Builds breath support and air control.",
    content: `## What is Dynamic Control?

Dynamics (力度, lì dù) means controlling the volume of your sound from pianissimo (very soft) to fortissimo (very loud). This is what turns notes into music.

## How to Do It

- **Louder:** Increase air speed and pressure from the diaphragm
- **Softer:** Decrease air speed while maintaining support (don't just stop blowing)
- The embouchure angle may need slight adjustment for different volumes
- Soft playing requires MORE control than loud playing

## How to Practice

1. **Crescendo exercise:** Start a long tone very soft, gradually get louder over 8 beats
2. **Decrescendo:** Start loud, gradually get softer over 8 beats
3. **Messa di voce:** Soft → loud → soft on one breath (the ultimate control exercise)
4. Practice at different pitch levels — low notes respond differently than high notes
5. **Echo exercise:** Play a phrase loud, then immediately repeat it soft

## Common Mistakes

- Getting sharp when playing loud (too much pressure)
- Losing tone quality when playing soft (not enough support)
- Confusing air speed with air volume`,
    notationExample: "5 5 5 5 | 5 - - - | 5 5 5 5 | 5 - - - ||",
  },
  {
    id: "vibrato",
    name: "Breath Vibrato (气震音)",
    category: "breathing",
    level: 4,
    description: "THE signature expressive technique of dizi. Gently pulse diaphragm to make notes shimmer.",
    content: `## What is Breath Vibrato?

Breath vibrato (气震音, qì zhèn yīn) is the signature expressive technique of the dizi. By gently pulsing your diaphragm, the pitch and volume oscillate slightly, creating a warm, shimmering sound.

## How to Do It

1. Play a steady long tone
2. Begin gently pulsing your abdominal muscles — like a slow laugh "ha-ha-ha"
3. The pulses should be small and even — the pitch wavers just slightly
4. Speed: typically 4-6 oscillations per second
5. Start with wide, slow oscillations and gradually make them faster and narrower

## How to Practice

- Start WITHOUT the dizi: breathe out steadily, then add belly pulses
- On the dizi: hold note 5, add vibrato after 2 beats of steady tone
- Practice controlling vibrato speed: slow it down, speed it up
- Practice controlling vibrato width: wide expressive vibrato vs. narrow subtle vibrato
- Apply to long notes in songs — vibrato brings held notes to life

## In Notation

Vibrato is marked with a wavy line **∿** above the note. In notation: \`orn:vibrato\` before the note.

## Styles

- **Southern style:** Gentle, narrow vibrato — subtle and refined
- **Northern style:** Wider, more pronounced vibrato — dramatic and passionate`,
    notationExample: "orn:vibrato 5 - - - | orn:vibrato 3 - orn:vibrato 6 - ||",
  },
  {
    id: "circular-breathing",
    name: "循环换气 (Circular Breathing)",
    category: "breathing",
    level: 6,
    description: "Breathe in through nose while maintaining airflow from mouth. Enables unbroken phrases.",
    content: `## What is Circular Breathing?

Circular breathing (循环换气, xúnhuán huànqì) allows you to play indefinitely without stopping for a breath. You inhale through your nose while simultaneously pushing air out from your cheeks.

## How to Do It

1. Fill your cheeks with air (like a chipmunk)
2. While squeezing cheek air out through the dizi, quickly inhale through your nose
3. Before the cheek air runs out, resume normal diaphragm-powered blowing
4. The switch between cheek air and lung air must be seamless — no audible gap

## How to Practice

1. **Water straw exercise:** Blow bubbles through a straw in water. Keep bubbles going while breathing in through nose
2. **Cheek squeeze:** Practice just the cheek-squeeze → nose-inhale → resume cycle without the dizi
3. **On the dizi:** Start on an easy note (middle 5). Play normally, puff cheeks, switch to cheek air, inhale, resume
4. The transition is the hardest part — it takes weeks to months to smooth out

## When to Use

Circular breathing is used for extremely long phrases or as a showpiece technique. Many professional pieces require it. However, learning proper breath planning (when to breathe) is more important for beginners.`,
  },

  // ── Fingering ──
  {
    id: "pentatonic-scale",
    name: "Pentatonic Scale (五声)",
    category: "fingering",
    level: 2,
    description: "The 5-note scale (1 2 3 5 6) — the foundation of Chinese music for over 2,500 years.",
    referenceSlug: "fingering-charts",
    content: `## What is the Pentatonic Scale?

The pentatonic scale (五声音阶, wǔ shēng yīn jiē) uses 5 notes: **1 2 3 5 6** (do re mi sol la). It's the foundation of Chinese music — and most traditional dizi melodies use only these 5 notes.

## Why No 4 and 7?

The notes 4 and 7 create half-step intervals that sound tense. By skipping them, the pentatonic scale sounds naturally harmonious — every note sounds good with every other note.

## The 5 Modes

Each starting note creates a different mood:
- **宫 (gōng):** Start on 1 → bright, major feel
- **商 (shāng):** Start on 2 → slightly plaintive
- **角 (jué):** Start on 3 → gentle, lyrical
- **徵 (zhǐ):** Start on 5 → open, expansive
- **羽 (yǔ):** Start on 6 → melancholic, minor feel

## How to Practice

- Play 1 2 3 5 6 ascending, then 6 5 3 2 1 descending
- Notice: no 4 and no 7
- Improvise using only these 5 notes — everything you play will sound "Chinese"
- Learn to recognize pentatonic melodies by ear`,
    notationExample: "1 2 3 5 | 6 5 3 2 | 1 - - - ||",
  },
  {
    id: "octave-jumps",
    name: "Octave Jumps",
    category: "fingering",
    level: 2,
    description: "Jumping between octaves on the same note. Develops embouchure flexibility and air control.",
    content: `## What are Octave Jumps?

Playing the same note in two different octaves (e.g., low 5 → high 5'). On the dizi, higher octaves require faster air speed and a tighter embouchure.

## How to Do It

1. Play low 5 with relaxed embouchure and gentle air
2. To jump to high 5': tighten lips slightly, increase air speed, direct air slightly more downward
3. The fingering is the SAME — only the embouchure and air change
4. The jump should be clean — no sliding between octaves

## How to Practice

- Start with the easiest jumps: 5 → 5', then 6 → 6'
- Play quarter notes: low-high-low-high
- Focus on landing cleanly on the upper note without "scooping" up to it
- Gradually try harder jumps: 1 → 1', 2 → 2'
- Low to high is usually easier than high to low`,
    notationExample: "5 5' 5 5' | 6 6' 6 6' | 1 1' 1 1' | 2 2' 2 2' ||",
  },
  {
    id: "two-octave-range",
    name: "Two-Octave Range",
    category: "fingering",
    level: 3,
    description: "Full two-octave scale ascending and descending. Extends your usable range.",
    content: `## What is Two-Octave Range?

Extending from the lowest to the highest notes your dizi can produce — typically from low 5 up to high 5' or beyond (about 2 octaves).

## How to Do It

- **Low register:** Relaxed embouchure, gentle air, full tone holes covered
- **Middle register:** Standard embouchure, moderate air
- **High register:** Tighter embouchure, faster air, possible half-holing for highest notes
- Each register has a different "feel" — practice the transitions

## How to Practice

1. Start from your lowest comfortable note
2. Ascend chromatically or by scale to the highest note you can produce cleanly
3. Come back down
4. Note where the "breaks" are (where you need to adjust embouchure) — these are the hard spots
5. Practice the transitions around each break point separately

## Common Challenges

- Low register tends to be breathy
- Transition from first to second octave can crack
- High register can be shrill if over-blown`,
    notationExample: "5, 6, 7, 1 | 2 3 4 5 | 6 7 1' 2' | 3' 2' 1' 7 | 6 5 4 3 | 2 1 7, 6, | 5, - - - ||",
  },
  {
    id: "fork-fingering",
    name: "叉口 (Fork Fingering)",
    category: "fingering",
    level: 4,
    description: "Non-standard fingerings where open holes sit between closed ones. Used for special tonal colors.",
    referenceSlug: "fingering-charts",
    content: `## What is Fork Fingering?

Fork fingering (叉口, chā kǒu) means having an open hole between two closed holes — like the tines of a fork. Standard fingerings go "all closed from bottom up," but fork fingerings break this pattern.

## How to Do It

1. Instead of the standard fingering for a note, use an alternate fingering with a gap
2. The resulting tone is usually slightly different in color — darker, more muffled, or with a unique resonance
3. Fork fingerings are essential for certain notes that can't be reached with standard fingerings

## Common Uses

- **又音 (fork tone):** A specific ornamental technique in northern dizi music where you alternate between standard and fork fingering on the same note
- **Chromatic notes:** Some sharps and flats require fork fingerings
- **Tonal color:** Professional players use fork fingerings by choice for their unique sound quality

## In Notation

Fork fingering is marked with **又** above the note. In notation: \`orn:fork\` before the note.`,
    notationExample: "orn:fork 5 - orn:fork 3 - | 5 orn:fork 5 3 orn:fork 3 ||",
  },
  {
    id: "half-holing",
    name: "半孔 (Half-Holing)",
    category: "fingering",
    level: 6,
    description: "Partially covering a hole for chromatic notes between standard scale degrees.",
    referenceSlug: "fingering-charts",
    content: `## What is Half-Holing?

Half-holing (半孔, bàn kǒng) means partially covering a tone hole to produce a pitch between two standard notes. This is how the dizi plays sharps and flats.

## How to Do It

1. Instead of fully covering or fully opening a hole, slide your finger to cover roughly half
2. The pitch will be between the "fully open" and "fully closed" notes
3. Fine-tune by adjusting how much of the hole is covered
4. Also adjust embouchure — half-hole notes often need slightly different air support

## How to Practice

- Start with one half-hole note (e.g., #4 between 4 and 5)
- Find the pitch by slowly sliding your finger — listen for the target pitch
- Practice playing the half-hole note in context: 3 #4 5, 5 #4 3
- Use a tuner to verify you're hitting the correct pitch

## Challenges

- Inconsistent intonation (the finger position must be very precise)
- Different dizi may require different amounts of coverage for the same note
- Temperature affects tuning of half-hole notes`,
    notationExample: "#4 - 5 - | 5 #4 3 - | 3 #4 5 - ||",
  },
  {
    id: "flying-fingers",
    name: "飞指 (Flying Fingers)",
    category: "fingering",
    level: 6,
    description: "Rapid lateral finger movement across holes creating a shimmering, vibrating effect.",
    content: `## What is 飞指?

飞指 (fēi zhǐ, "flying fingers") is a virtuosic technique where fingers rapidly sweep across multiple tone holes, creating a shimmering, glittering sound effect.

## How to Do It

1. While blowing a steady stream, rapidly flutter all fingers across the holes
2. The movement is lateral — fingers sweep across, not up and down
3. The result is a blur of rapid pitch changes, creating a "sparkling" effect
4. It's often used as a dramatic flourish or transition

## How to Practice

- Start by rapidly opening and closing all six holes randomly
- Focus on speed and evenness
- Practice both left and right hand independently first
- Combine — the goal is a continuous shimmer, not distinct individual notes
- Listen to recordings for the characteristic sound

## When to Use

飞指 is a special effect, not a melodic technique. Use it sparingly for dramatic moments: climaxes, transitions, or cadenzas.`,
  },

  // ── Advanced ──
  {
    id: "flutter-tongue",
    name: "花舌 (Flutter Tongue)",
    category: "advanced",
    level: 4,
    description: "Rolling tongue (like Spanish 'R') while blowing. Creates a buzzing tremolo-like effect.",
    content: `## What is Flutter Tongue?

花舌 (huā shé, "flowery tongue") creates a buzzing, tremolo-like effect by rolling the tongue rapidly while blowing. The sound is dramatic and distinctive.

## How to Do It

1. Roll your tongue like the Spanish "rr" (trilled R)
2. While maintaining the roll, blow into the dizi
3. The rapid tongue vibration breaks the airstream into a buzz
4. It should sound like a continuous, controlled buzz — not sputtering

## How to Practice

- First: practice the tongue roll without the dizi (say "brrrr")
- If you can't roll your R: try "drrr" or "trrr" — start with the consonant
- On the dizi: start with a normal note, then add the tongue roll
- Practice sustaining the flutter for 4+ beats
- Apply to long notes in dramatic passages

## In Notation

Flutter tongue is marked with the text "flutter" above the note. In notation: \`orn:flutter\` before the note.

## Note

Some people physically cannot roll their tongue. If after weeks of practice you still can't, it may be a genetic limitation — this is normal and there are other techniques to achieve similar effects.`,
    notationExample: "orn:flutter 5 - - - | orn:flutter 3 - orn:flutter 6 - ||",
  },
  {
    id: "slides",
    name: "Slides (滑音)",
    category: "advanced",
    level: 5,
    description: "Gradually sliding finger on/off a hole for smooth pitch changes between notes.",
    content: `## What are Slides?

Slides (滑音, huá yīn) create a smooth, continuous pitch change between two notes — like a singer sliding between pitches. On the dizi, this is done by gradually covering or uncovering a tone hole.

## Types

- **Slide up (上滑音):** Start low, slide finger off the hole to go higher
- **Slide down (下滑音):** Start high, slide finger onto the hole to go lower

## How to Do It

1. Start on the first note normally
2. Slowly slide your finger off (up) or onto (down) the next hole
3. The pitch should change continuously — no steps
4. Coordinate with embouchure: slight adjustment may be needed during the slide

## How to Practice

- Start with slow slides between adjacent notes: 5 → 6 (slide up)
- The slide should take 1-2 beats at first
- Listen for smoothness — any "steps" in the pitch mean the finger moved too fast
- Practice both directions: up and down
- Apply to songs: slides between melody notes add expressiveness

## In Notation

Slides are marked with a curved arrow between notes.`,
    notationExample: "5 - orn:slide-up 6 - | 6 - orn:slide-down 5 - ||",
  },
  {
    id: "san-ban",
    name: "散板 (Free Time)",
    category: "advanced",
    level: 5,
    description: "Playing without fixed tempo. Feel each note, breathe naturally. Common in Chinese music.",
    content: `## What is 散板?

散板 (sǎn bǎn, "scattered beat") is music played without a fixed tempo. The performer decides how long each note lasts based on musical feeling, emotional expression, and natural breathing.

## How to Do It

1. Forget the metronome — there is no beat
2. Let each note last as long as it "wants to"
3. Important notes get more time; passing notes are quicker
4. Breathe naturally — breaths become musical pauses
5. The music should flow like speech: sometimes fast, sometimes slow, with natural pauses

## How to Practice

- Take a melody you know well and play it without counting beats
- Exaggerate the rubato at first: make some notes very long, others very short
- Listen to recordings of Chinese classical music — notice how the tempo ebbs and flows
- Record yourself and listen back — does it sound natural or random?
- The goal is **musical intention** behind every timing choice

## When It Appears

散板 sections commonly open slow Chinese pieces. The performer plays freely, establishing mood before the rhythmic section begins. You'll see it marked at the beginning of a piece or section.`,
  },
  {
    id: "li-yin",
    name: "历音 (Glissando)",
    category: "advanced",
    level: 5,
    description: "Rapid sequential runs through multiple notes — cascade or waterfall of sound.",
    content: `## What is 历音?

历音 (lì yīn, "passing sounds") is a rapid run through a series of notes — like a cascade or waterfall of sound. The individual notes blur together into a sweeping gesture.

## How to Do It

1. Start from one note and rapidly run through each scale degree to the target note
2. Fingers peel off (ascending) or slam down (descending) in rapid sequence
3. The run should be fast enough that individual notes aren't distinct — it's a sweep
4. The starting and ending notes are the important ones; middle notes are a blur

## How to Practice

- Start with short runs: 1-2-3 or 5-4-3
- Gradually extend: 1-2-3-4-5-6 in one sweep
- Practice both ascending and descending
- The key is finger coordination — each finger must follow the previous one smoothly
- Start slowly and build speed gradually

## When to Use

历音 appears in dramatic passages, cadenzas, and transitions. It's a crowd-pleasing virtuosic gesture.`,
  },
  {
    id: "harmonics",
    name: "泛音 (Harmonics)",
    category: "advanced",
    level: 6,
    description: "Overtone pitches produced by overblowing with specific fingerings.",
    content: `## What are Harmonics?

Harmonics (泛音, fàn yīn) are higher-pitched tones produced by overblowing while using specific fingerings. The same fingering can produce different notes depending on how hard you blow.

## How to Do It

1. Finger a low note (e.g., low 5 = all holes closed)
2. Increase air speed dramatically while keeping fingers in place
3. The note will "jump" to a higher harmonic — an octave up, or even higher
4. The resulting tone has a unique, ethereal quality different from normally fingered high notes

## How to Practice

- Start with low 5 fingering → overblow to get high 5'
- Try low 1 → overblow to high 1'
- The embouchure change is similar to octave jumps but more extreme
- Harmonics sound "purer" and more hollow than normally fingered notes
- Practice controlling the switch: normal → harmonic → normal

## When to Use

Harmonics create an otherworldly, floating quality. Used in slow, contemplative passages for special tonal color.`,
  },
  {
    id: "sixteenth-notes",
    name: "Sixteenth Notes (十六分音符)",
    category: "advanced",
    level: 4,
    description: "Four notes per beat. Requires keeping fingers close to holes for speed.",
    content: `## What are Sixteenth Notes?

Sixteenth notes (十六分音符) are four notes per beat — twice as fast as eighth notes. At 120 BPM, that's 8 notes per second. This requires excellent finger technique.

## How to Do It

1. Keep fingers hovering just above the holes — minimal movement
2. Use finger tips, not finger pads (tips are faster)
3. Relax the hand — tension is the enemy of speed
4. Think in groups of four: 1-2-3-4, 1-2-3-4

## How to Practice

1. **Slow practice:** Play the pattern at half speed with eighth notes first
2. **Burst practice:** Play one group of four sixteenths, then rest. Repeat.
3. **Gradual acceleration:** Start at 60 BPM (manageable), increase by 5 BPM at a time
4. **Scale sixteenths:** Run up and down the scale in sixteenth notes
5. Never sacrifice clarity for speed — if notes blur together, slow down

## In Notation

Sixteenth notes have a double underline or are beamed with two beam lines.`,
    notationExample: "[ 1__ 2__ 3__ 4__ ] [ 5__ 6__ 7__ 1'__ ] | [ 1'__ 7__ 6__ 5__ ] [ 4__ 3__ 2__ 1__ ] ||",
  },
  {
    id: "dotted-rhythm",
    name: "Dotted Rhythms (附点)",
    category: "advanced",
    level: 3,
    description: "Long-short swing feel created by dotted notes. Common in folk music.",
    content: `## What are Dotted Rhythms?

A dotted note is 1.5 times its normal length. A dotted eighth + sixteenth creates a "long-short" swing feel that's extremely common in Chinese folk music.

## The Pattern

- **Dotted eighth + sixteenth:** The first note is 3/4 of a beat, the second is 1/4
- Written as: \`5._ 1__\` (dotted eighth 5, sixteenth 1)
- Sounds like: "DUM-da DUM-da" — a lilting, swinging feel

## How to Practice

1. Clap the rhythm first: long-short, long-short
2. The common mistake is making it even (50-50) instead of uneven (75-25)
3. Practice with a metronome — the short note lands right before the next beat
4. Start with one pair, then chain them: DUM-da DUM-da DUM-da DUM
5. Apply to songs — many folk melodies use this rhythm throughout

## In Notation

The dot appears after the note number as a small circle. The beamed pair shows as a dotted-eighth + sixteenth under one beam.`,
    notationExample: "[ 5._ 1__ ] [ 1._ 3__ ] [ 5._ 3__ ] 5 | [ 5._ 6__ ] [ 5._ 3__ ] [ 4._ 3__ ] 2 ||",
  },
];

export function getTechnique(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

export function getTechniquesByCategory(category: Technique["category"]): Technique[] {
  return techniques.filter((t) => t.category === category);
}
