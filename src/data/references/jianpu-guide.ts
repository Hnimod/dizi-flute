import type { ReferenceDoc } from "@/shared/types";

export const reference: ReferenceDoc = {
    slug: "jianpu-guide",
    title: "Jianpu (简谱) — Complete Notation Guide",
    description: "Complete numbered notation reference",
    icon: "\uD83D\uDD22",
    content: `# Jianpu (\u7B80\u8C31) \u2014 Complete Notation Guide

A comprehensive reference for reading Chinese numbered musical notation, written for dizi flute learners with no prior music background.

---

## What is Jianpu?

**Jianpu** (\u7B80\u8C31, ji\u01CEanp\u01D4, literally "simple notation") is a numbered musical notation system used throughout China and much of East Asia. It represents notes as numbers 1 through 7 instead of dots on a staff.

### Brief History

Jianpu originated in France in the 18th century as the **Galin-Paris-Cheve system**, designed to make music literacy more accessible. It was introduced to China in the early 20th century and quickly became the dominant notation system for Chinese music. Today, the vast majority of Chinese folk music, pop music, and traditional instrumental music (including dizi repertoire) is published in jianpu.

### Why Jianpu?

- **Simpler to learn** than Western staff notation, especially for beginners
- **Ideal for transposing instruments** like the dizi \u2014 the same written music works on any key of dizi; you just change which instrument you pick up
- **Relative pitch system** \u2014 numbers represent scale degrees, not fixed pitches. The number \`1\` is always "Do" regardless of what key you are in

### Jianpu vs. Staff Notation

| Aspect | Staff Notation | Jianpu |
|--------|---------------|--------|
| Notes represented as | Dots on five lines | Numbers 1-7 |
| Pitch system | Fixed (C is always C) | Relative (1 is always Do) |
| Transposing | Must rewrite all notes | Just change the key signature |
| Learning curve | Steep | Gentle |
| Used primarily in | Western classical, jazz | Chinese, East Asian music |

---

## Note Numbers

The seven numbers correspond to the seven notes of the major scale:

| Number | Solfege | Scale Degree | Western Name |
|--------|---------|-------------|--------------|
| 1 | Do | 1st (tonic) | The "home" note of the key |
| 2 | Re | 2nd | One whole step above Do |
| 3 | Mi | 3rd | Two whole steps above Do |
| 4 | Fa | 4th | Two and a half steps above Do |
| 5 | Sol | 5th | Three and a half steps above Do |
| 6 | La | 6th | Four and a half steps above Do |
| 7 | Ti (Si) | 7th | Five and a half steps above Do |
| 0 | \u2014 | Rest | Silence |

\`\`\`jianpu
1 2 3 4 5 6 7
\`\`\`

### Note Numbers in Common Dizi Keys

| Number | Solfege | In Key of D (1=D) | In Key of G (1=G) | In Key of C (1=C) | In Key of F (1=F) | In Key of A (1=A) |
|--------|---------|-------------------|-------------------|-------------------|-------------------|-------------------|
| 1 | Do | D | G | C | F | A |
| 2 | Re | E | A | D | G | B |
| 3 | Mi | F# | B | E | A | C# |
| 4 | Fa | G | C | F | Bb | D |
| 5 | Sol | A | D | G | C | E |
| 6 | La | B | E | A | D | F# |
| 7 | Ti | C# | F# | B | E | G# |

**Key point:** When you see \`1=D\` at the top of a piece, you know that every \`1\` in the score is the note D, every \`2\` is E, and so on. If you play a D-key dizi with standard fingering, \`1\` is your all-fingers-down note.

### Sharps and Flats (Accidentals)

| Notation | Meaning | Example |
|----------|---------|---------|
| #4 | Sharp 4 (Fa raised by a half step) | In 1=D, this is G# |
| b7 | Flat 7 (Ti lowered by a half step) | In 1=D, this is C natural |
| #1 | Sharp 1 (Do raised by a half step) | In 1=D, this is D# |
| b3 | Flat 3 (Mi lowered by a half step) | In 1=D, this is F natural |

Sharps (#) and flats (b) are written directly before the number. They apply only to that single note (not the whole measure, unlike staff notation).

\`\`\`jianpu
#4 b7 | #1 b3
\`\`\`

---

## Octave Markings

Dots above or below a number shift it up or down by one octave.

| Notation | Name | Chinese | Meaning |
|----------|------|---------|---------|
| 1, 2, 3, | Low octave | \u4F4E\u97F3 (d\u012By\u012Bn) | Dot **below** the number \u2014 one octave lower |
| 1 2 3 | Middle octave | \u4E2D\u97F3 (zh\u014Dngy\u012Bn) | Plain number \u2014 the default octave |
| 1' 2' 3' | High octave | \u9AD8\u97F3 (g\u0101oy\u012Bn) | Dot **above** the number \u2014 one octave higher |
| 1,, | Very low | \u500D\u4F4E\u97F3 | Two dots below \u2014 two octaves lower (rare) |
| 1\u0308 | Very high | \u500D\u9AD8\u97F3 | Two dots above \u2014 two octaves higher (rare) |

**How to read dots:** In printed jianpu, the dots are directly above or below the number. When you see a dot underneath \`5\`, read it as "low Sol." When you see a dot on top of \`1\`, read it as "high Do."

### Playable Range on a D-Key Dizi (\u7B52\u97F3\u4F5C5)

This is the standard range when the lowest note (all holes covered) is Sol (5):

\`\`\`jianpu
5, 6, 7, | 1 2 3 4 5 6 7 | 1' 2' 3' 4' 5'
\`\`\`

In actual pitches for a D-key dizi (1=D, \u7B52\u97F3\u4F5C5):

| Jianpu | Solfege | Pitch | Register |
|--------|---------|-------|----------|
| 5, | Low Sol | A3 | Low (\u4F4E\u97F3) |
| 6, | Low La | B3 | Low |
| 7, | Low Ti | C#4 | Low |
| 1 | Do | D4 | Middle (\u4E2D\u97F3) |
| 2 | Re | E4 | Middle |
| 3 | Mi | F#4 | Middle |
| 4 | Fa | G4 | Middle |
| 5 | Sol | A4 | Middle |
| 6 | La | B4 | Middle |
| 7 | Ti | C#5 | Middle |
| 1' | High Do | D5 | High (\u9AD8\u97F3) |
| 2' | High Re | E5 | High |
| 3' | High Mi | F#5 | High |
| 4' | High Fa | G5 | High |
| 5' | High Sol | A5 | High |

Notes: The low register (5, 6, 7,) requires gentle breath. The high register (1' and above) requires overblowing. Notes above 3' are increasingly difficult for beginners.

---

## Note Durations

This section is critical for reading rhythm. In jianpu, duration is shown by **dashes after the number** (for longer notes) and **underlines below the number** (for shorter notes).

### Duration Table

| Notation | Name (English) | Name (Chinese) | Beats in 4/4 | Description |
|----------|---------------|----------------|--------------|-------------|
| \`5\` | Quarter note | \u56DB\u5206\u97F3\u7B26 (s\u00ECf\u0113n y\u012Bnf\u00FA) | 1 beat | A single number with space around it |
| \`5 -\` | Half note | \u4E8C\u5206\u97F3\u7B26 (\u00E8rf\u0113n y\u012Bnf\u00FA) | 2 beats | Number followed by one dash |
| \`5 - -\` | Dotted half note | \u9644\u70B9\u4E8C\u5206\u97F3\u7B26 | 3 beats | Number followed by two dashes |
| \`5 - - -\` | Whole note | \u5168\u97F3\u7B26 (qu\u00E1n y\u012Bnf\u00FA) | 4 beats | Number followed by three dashes |
| \`5\u0332\` | Eighth note | \u516B\u5206\u97F3\u7B26 (b\u0101f\u0113n y\u012Bnf\u00FA) | 1/2 beat | Single underline below |
| \`5\u0332\u0332\` | Sixteenth note | \u5341\u516D\u5206\u97F3\u7B26 (sh\u00EDli\u00F9 f\u0113n y\u012Bnf\u00FA) | 1/4 beat | Double underline below |
| \`5\u0332\u0332\u0332\` | Thirty-second note | \u4E09\u5341\u4E8C\u5206\u97F3\u7B26 | 1/8 beat | Triple underline below (rare) |

**Important note about underlines:** In printed jianpu, shorter notes are shown with horizontal lines (beams) drawn below the numbers. One line = eighth note, two lines = sixteenth note. Shorter notes are usually grouped under a shared beam:

\`\`\`jianpu
[ 5_ 3_ ] | [ 5_ 3_ 2_ 1_ ] | [ 5__ 3__ 5__ 3__ ]
\`\`\`

### How Dashes Work

Each dash (\`-\`) extends the note by one additional beat:

\`\`\`jianpu
5 | 5 - | 5 - - | 5 - - -
\`\`\`

- \`5\` = 1 beat (quarter note)
- \`5 -\` = 2 beats (half note)
- \`5 - -\` = 3 beats (dotted half note)
- \`5 - - -\` = 4 beats (whole note)

Think of each dash as saying "keep holding that note for one more beat."

### Dotted Notes

A small dot placed after a number (not above or below) extends the note's duration by half its original value:

| Notation | Original Duration | Added Duration | Total |
|----------|------------------|----------------|-------|
| \`5.\` | 1 beat (quarter) | + 1/2 beat | 1.5 beats |
| \`5 - .\` | 2 beats (half) | + 1 beat | 3 beats |
| \`5\u0332.\` | 1/2 beat (eighth) | + 1/4 beat | 3/4 beat |

**Do not confuse:** A dot **after** a number = dotted note (longer duration). A dot **above** a number = high octave. A dot **below** a number = low octave. Context and position make the difference clear.

### Triplets

Three notes played in the time of two are shown with a \`3\` bracket above the note group. In printed jianpu, a small "3" with a bracket appears over three notes that share the time of two beats. Triplets are relatively uncommon in beginner dizi pieces.

---

## Rests

Rests (silence) follow the same duration rules as notes, but use the number \`0\`:

| Notation | Name (English) | Name (Chinese) | Duration in 4/4 |
|----------|---------------|----------------|-----------------|
| \`0\` | Quarter rest | \u56DB\u5206\u4F11\u6B62\u7B26 | 1 beat of silence |
| \`0 -\` | Half rest | \u4E8C\u5206\u4F11\u6B62\u7B26 | 2 beats of silence |
| \`0 - - -\` | Whole rest | \u5168\u4F11\u6B62\u7B26 | 4 beats of silence |
| \`0\u0332\` | Eighth rest | \u516B\u5206\u4F11\u6B62\u7B26 | 1/2 beat of silence |
| \`0\u0332\u0332\` | Sixteenth rest | \u5341\u516D\u5206\u4F11\u6B62\u7B26 | 1/4 beat of silence |

In printed jianpu, rests use underlines and dashes exactly like notes. A \`0\` with a beam below it is an eighth rest; a \`0\` followed by dashes is a longer rest.

\`\`\`jianpu
0 | 0 - | [ 0_ 5_ ] | [ 0__ 0__ 5__ 5__ ]
\`\`\`

---

## Key Signatures

The key signature appears at the top-left of a jianpu score and tells you which pitch corresponds to the number \`1\` (Do).

### Format

\`\`\`
1 = D
\`\`\`

This means: "The number 1 is the note D." Every other number is calculated relative to D.

### Common Dizi Keys and Their Key Signatures

| Dizi Key | Standard Key Signature | 1 (Do) = | \u7B52\u97F3 (lowest note) |
|----------|----------------------|----------|-------------------|
| C dizi | 1=C | C | Sol (5,) = G |
| D dizi | 1=D | D | Sol (5,) = A |
| E dizi | 1=E | E | Sol (5,) = B |
| F dizi | 1=F | F | Sol (5,) = C |
| G dizi | 1=G | G | Sol (5,) = D |
| A dizi | 1=A | A | Sol (5,) = E |
| bB dizi | 1=bB | Bb | Sol (5,) = F |

### Why This Matters for Dizi

The dizi is a **transposing instrument** \u2014 different key dizi produce different pitches from the same fingering. The beauty of jianpu is that **fingerings stay the same regardless of the key**. When a score says \`1=D\`, you pick up your D dizi. When it says \`1=G\`, you pick up your G dizi. The finger patterns for \`1 2 3 4 5 6 7\` remain identical.

---

## Time Signatures

The time signature appears at the top of the score (usually next to or below the key signature) and tells you how beats are organized into measures (bars).

### Format

Written as a fraction: **top number / bottom number**

- **Top number** = how many beats per measure
- **Bottom number** = what type of note gets one beat (4 = quarter note, 8 = eighth note)

### Common Time Signatures

| Time Signature | Beats Per Measure | Beat Unit | Feel | Common In |
|---------------|-------------------|-----------|------|-----------|
| 2/4 | 2 | Quarter note | March-like, STRONG-weak | Chinese folk music (very common) |
| 3/4 | 3 | Quarter note | Waltz, STRONG-weak-weak | Some Chinese pieces |
| 4/4 | 4 | Quarter note | STRONG-weak-medium-weak | Pop, general music |
| 6/8 | 6 | Eighth note | Two groups of three | Compound feel, some folk music |

**For beginners:** Focus on 2/4 and 4/4 first. The majority of beginner dizi pieces are in 2/4 time.

### Bar Lines

Bar lines are vertical lines that divide music into measures:

| Symbol | Name | Meaning |
|--------|------|---------|
| \`|\` | Single bar line | Separates measures |
| \`||\` | Double bar line | End of a section |
| \`||\` (bold final) | Final bar line | End of the piece |
| \`:||   \` | Repeat end | Repeat back to the beginning or to \`||:\` |
| \`||:\` | Repeat start | Beginning of a repeated section |
| \`||: ... :||\` | Repeat section | Play everything inside twice |

\`\`\`jianpu
1 2 | 3 5 || |: 1 2 3 5 :| ||
\`\`\`

---

## Ties and Slurs

### Tie (\u5EF6\u97F3\u7EBF y\u00E1ny\u012Bnxi\u00E0n)

A curved arc connecting **two notes of the same pitch**. The second note is not re-tongued; you simply hold the first note for the combined duration.

\`\`\`jianpu
~( 5 - | 5 ~) -
\`\`\`

Sol held for 4 beats total (2 + 2), crossing the bar line. Ties are common when a note's duration spans across a bar line.

### Slur (\u8FDE\u97F3\u7EBF li\u00E1ny\u012Bnxi\u00E0n)

A curved arc connecting **different notes**. Play them smoothly and connected (legato) \u2014 do not tongue each note separately.

\`\`\`jianpu
( 1 2 3 5 )
\`\`\`

Play Do-Re-Mi-Sol smoothly, only tongue the first note.

### How to Tell Them Apart

- Same note + arc = **tie** (hold the note)
- Different notes + arc = **slur** (play legato)

In printed jianpu, both use the same arc symbol. Context makes the meaning clear.

---

## Repeat Signs and Navigation

### Basic Repeats

| Symbol | Name | Action |
|--------|------|--------|
| \`:||   \` | Repeat to beginning | Go back to the start and play again |
| \`||: ... :||\` | Repeat section | Play the enclosed section twice |

### First and Second Endings (Volta Brackets)

When a repeated section has a different ending the second time:

\`\`\`jianpu
|: 1 2 3 5 | 5 3 | [1. 2 - :| [2. 1 - ||
\`\`\`

- First time through: play the \`1.\` ending, then repeat
- Second time through: skip the \`1.\` ending, play the \`2.\` ending instead

### Navigation Markings

| Symbol | Name | Meaning |
|--------|------|---------|
| D.C. | Da Capo | Go back to the very beginning |
| D.S. | Dal Segno | Go back to the segno sign (\uD834\uDD0B or %) |
| Fine | Fine | The end (used with D.C. or D.S.) |
| Coda | Coda (\u5C3E\u58F0) | Jump to the coda (ending section), marked with a target symbol |
| \uD834\uDD0B or % | Segno | The sign \u2014 D.S. sends you here |

---

## Dynamics Markings

Dynamics tell you how loud or soft to play. These are the same symbols used in Western music.

| Symbol | Italian Term | Meaning | Dizi Technique |
|--------|-------------|---------|----------------|
| pp | pianissimo | Very soft | Very gentle breath, soft embouchure |
| p | piano | Soft | Gentle breath |
| mp | mezzo piano | Moderately soft | Slightly below medium breath |
| mf | mezzo forte | Moderately loud | Slightly above medium breath |
| f | forte | Loud | Strong breath |
| ff | fortissimo | Very loud | Very strong breath, firm embouchure |

### Gradual Dynamic Changes

| Symbol | Name | Chinese | Meaning |
|--------|------|---------|---------|
| \`<\` or hairpin opening right | Crescendo | \u6E10\u5F3A (ji\u00E0nqi\u00E1ng) | Gradually get louder |
| \`>\` or hairpin opening left | Diminuendo / Decrescendo | \u6E10\u5F31 (ji\u00E0nru\u00F2) | Gradually get softer |
| cresc. | Crescendo (text) | \u6E10\u5F3A | Gradually get louder |
| dim. | Diminuendo (text) | \u6E10\u5F31 | Gradually get softer |

---

## Tempo Markings

Tempo tells you the speed of the music, measured in BPM (beats per minute).

### Standard Tempo Markings

| Italian Marking | BPM Range | Chinese Term | Feel |
|----------------|-----------|-------------|------|
| Largo | 40-60 | \u5E7F\u677F (gu\u01CEangb\u01CEn) | Very slow, broad |
| Adagio | 60-76 | \u6162\u677F (m\u00E0nb\u01CEn) | Slow, at ease |
| Andante | 76-108 | \u884C\u677F (x\u00EDngb\u01CEn) | Walking pace |
| Moderato | 108-120 | \u4E2D\u677F (zh\u014Dngb\u01CEn) | Moderate |
| Allegretto | 112-120 | \u5C0F\u5FEB\u677F (xi\u01CEoku\u00E0ib\u01CEn) | Moderately fast |
| Allegro | 120-156 | \u5FEB\u677F (ku\u00E0ib\u01CEn) | Fast, lively |
| Vivace | 156-176 | \u6D3B\u6CFC\u7684\u5FEB\u677F | Very fast, vivacious |
| Presto | 168-200 | \u6025\u677F (j\u00EDb\u01CEn) | Very fast |

### Chinese-Specific Tempo Terms

| Chinese Term | Pinyin | Meaning |
|-------------|--------|---------|
| \u6563\u677F | s\u01CEanb\u01CEn | Free time \u2014 no fixed beat, play expressively |
| \u6162\u677F | m\u00E0nb\u01CEn | Slow section |
| \u4E2D\u677F | zh\u014Dngb\u01CEn | Medium tempo section |
| \u5FEB\u677F | ku\u00E0ib\u01CEn | Fast section |
| \u6447\u677F | y\u00E1ob\u01CEn | Flexible rhythm \u2014 accompaniment steady, melody free |

\u6563\u677F (free time) is extremely common in Chinese music, especially at the beginning of a piece. There is no fixed pulse; you play expressively and freely.

### Tempo Changes

| Marking | Chinese | Meaning |
|---------|---------|---------|
| rit. (ritardando) | \u6E10\u6162 (ji\u00E0nm\u00E0n) | Gradually slow down |
| accel. (accelerando) | \u6E10\u5FEB (ji\u00E0nku\u00E0i) | Gradually speed up |
| a tempo | \u56DE\u539F\u901F (hu\u00ED yu\u00E1ns\u00F9) | Return to the original tempo |
| fermata (\uD834\uDD10) | \u5EF6\u957F (y\u00E1nch\u00E1ng) | Hold the note longer than written (at performer's discretion) |

---

## Articulation Markings

Articulation tells you *how* to play each note \u2014 short, long, emphasized, etc.

### Standard Articulations

| Symbol | Name (English) | Name (Chinese) | Description |
|--------|---------------|----------------|-------------|
| \`\u00B7\` (dot above note) | Staccato | \u65AD\u97F3 (du\u00E0ny\u012Bn) / \u987F\u97F3 (d\u00F9ny\u012Bn) | Short and detached \u2014 use tongue to cut the note short |
| \`\u2014\` (line above note) | Tenuto | \u4FDD\u6301\u97F3 (b\u01CEoch\u00EDy\u012Bn) | Hold for full value, slightly emphasized |
| \`>\` (above note) | Accent | \u91CD\u97F3 (zh\u00F2ngy\u012Bn) | Play with emphasis, stronger attack |
| \`^\` (above note) | Marcato | \u5F3A\u91CD\u97F3 | Strong accent, very emphasized |

### Dizi-Specific Tonguing Articulations

| Symbol | Name (Chinese) | Name (English) | Technique |
|--------|---------------|----------------|-----------|
| T or \u5410 | \u5355\u5410 (d\u0101nt\u01D4) | Single tongue | Say "tu" \u2014 standard tongued attack |
| TK or \u53CC\u5410 | \u53CC\u5410 (shu\u0101ngt\u01D4) | Double tongue | Alternate "tu-ku-tu-ku" \u2014 for fast passages |
| TTK or \u4E09\u5410 | \u4E09\u5410 (s\u0101nt\u01D4) | Triple tongue | "Tu-tu-ku" pattern \u2014 for triplet passages |

**Articulation and tonguing examples:**

\`\`\`jianpu
5; 5> 5^ | T 5 TK [ 5 5 5 5 ] TTK [ 5 5 5 ]
\`\`\`

---

## Ornament Notation in Jianpu

Ornaments are decorations that add expression and character to the music. Chinese music has a rich vocabulary of ornaments, many specific to the dizi.

### Standard Ornaments

| Symbol / Marking | Chinese Name | English Name | Description |
|-----------------|-------------|--------------|-------------|
| Small-size notes before main note | \u88C5\u9970\u97F3 (zhu\u0101ngsh\u00ECy\u012Bn) | Grace note(s) | One or more quick notes played just before the main note. Written as small numbers before the full-size number. |
| tr or \u98A4 | \u98A4\u97F3 (ch\u00E0ny\u012Bn) | Trill | Rapid alternation between the written note and the note above it. Achieved by rapid finger movement. |
| w or \u6CE2 | \u6CE2\u97F3 (b\u014Dy\u012Bn) | Mordent / Turn | A quick ornamental figure: go up to neighbor, return, land on main note. |
| \u2197 or \u4E0A\u6ED1 | \u4E0A\u6ED1\u97F3 (sh\u00E0nghu\u00E1y\u012Bn) | Upward slide / Portamento | Slide the pitch upward to reach the note. Use gradual finger lifting or embouchure. |
| \u2198 or \u4E0B\u6ED1 | \u4E0B\u6ED1\u97F3 (xi\u00E0hu\u00E1y\u012Bn) | Downward slide / Portamento | Slide the pitch downward to reach the note. |

### Dizi-Specific Ornaments

These ornaments are characteristic of the dizi and central to Chinese flute style:

| Symbol / Marking | Chinese Name (Pinyin) | English Description | How to Play |
|-----------------|----------------------|--------------------|-------------|
| \u6253 | \u6253\u97F3 (d\u01CEy\u012Bn) | Percussive grace note | Quickly tap and release one finger hole to create a brief pitch change. Like a very fast grace note produced by a single finger tap. |
| \u53E0 | \u53E0\u97F3 (di\u00E9y\u012Bn) | Stacked grace note | Quick upper neighbor grace note at the start of a note. Finger briefly touches the hole above, then lifts. Creates a crisp attack. |
| \u8D60 | \u8D60\u97F3 (z\u00E8ngy\u012Bn) | Trailing / "gift" note | A small ornamental note added at the **end** of a main note, just before the next note. Used to connect notes smoothly. |
| \u5386 | \u5386\u97F3 (l\u00ECy\u012Bn) | Rapid scale run / Glissando | A quick run of several notes (like dragging fingers across holes rapidly). Creates a sweeping, cascading effect. |
| \u82B1 | \u82B1\u820C (hu\u0101sh\u00E9) | Flutter tongue | Roll your tongue (like a rolled "R") while blowing. Creates a buzzing, tremolo-like effect. Signature dizi technique. |
| \u8179\u9707 | \u8179\u9707\u97F3 (f\u00F9zh\u00E8ny\u012Bn) | Abdominal vibrato | Vibrato produced by pulsing the diaphragm/abdomen. Creates a warm, expressive wavering of volume. |
| \u6C14\u9707 | \u6C14\u9707\u97F3 (q\u00ECzh\u00E8ny\u012Bn) | Breath vibrato | Vibrato produced by wavering the airstream. |
| \u6307\u9707 | \u6307\u9707\u97F3 (zh\u01D0zh\u00E8ny\u012Bn) | Finger vibrato | Vibrato produced by rapidly wavering a finger over a hole without fully closing it. |

**Notation shorthand:** Ornaments support three equivalent syntaxes. For example, stacked grace can be written as \`orn:die\`, \`\u53E0\`, or \`die\`. Chinese characters are recommended for readability.

| Full syntax | Chinese | Short |
|------------|---------|-------|
| \`orn:fork\` | \`\u53C8\` | \`fork\` |
| \`orn:die\` | \`\u53E0\` | \`die\` |
| \`orn:da\` | \`\u6253\` | \`da\` |
| \`orn:zeng\` | \`\u8D60\` | \`zeng\` |
| \`orn:bo\` | \`\u6CE2\` | \`bo\` |
| \`orn:vibrato\` | \u2014 | \`vib\` |
| \`orn:flutter\` | \`\u82B1\` | \`flutter\` |
| \`orn:slide-up\` | \u2014 | \`su\` |
| \`orn:slide-down\` | \u2014 | \`sd\` |

**Ornament notation examples (using shorthand):**

\`\`\`jianpu
tr5 | \u53E0 5 \u6253 5 | \u6CE2 5 \u8D60 5 | vib 5 - | \u82B1 5 - | su 5 sd 5
\`\`\`

### Grace Note Examples in Jianpu

In printed jianpu, grace notes appear as smaller-sized numbers before the main note:

\`\`\`jianpu
(3)5 | (6)(5)3
\`\`\`

- \`(3)5\` \u2014 quick Mi before Sol (single grace note)
- \`(6)(5)3\` \u2014 quick La-Sol before Mi (double grace note)

The grace notes are played very quickly, almost instantaneously, before the main note receives its full beat.

---

## Reading Example

Let us walk through reading a real piece of music step by step.

### Example: \u8309\u8389\u82B1 (Molihua \u2014 Jasmine Flower)

\`\`\`jianpu
3 3 | 5 [ 6_ 1'_ 6_ ] | 5 - | 5 [ 6_ 1'_ 6_ ] | 5 - |
3 [ 5_ 6_ ] | 1' [ 6_ 5_ ] | 6 - | [ 5_ 3_ 2_ 1_ ] | 2 - ||
\`\`\`

### Element-by-Element Breakdown

**Header information:**

- **\u8309\u8389\u82B1** \u2014 Title: "Jasmine Flower"
- **1=D** \u2014 Key signature: Do (1) = D. Use a D-key dizi.
- **2/4** \u2014 Time signature: 2 beats per measure, quarter note = 1 beat
- **Andante \u2669=72** \u2014 Tempo: walking pace, 72 beats per minute

**Measure-by-measure:**

| Measure | Notes | Meaning |
|---------|-------|---------|
| \`3  3\` | Two quarter notes: Mi, Mi | Two beats, one Mi per beat |
| \`5  6\u0332 1\u0332' 6\u0332\` | Quarter Sol, then three eighth notes La-high Do-La | Sol gets 1 beat; La, high Do, La share 1 beat |
| \`5  -\` | Half note Sol | Sol held for 2 full beats (fills the whole measure) |
| \`5  6\u0332 1\u0332' 6\u0332\` | Same as measure 2 | Same rhythmic pattern |
| \`5  -\` | Half note Sol | Sol held for 2 beats |

**What you would do:**

1. Set a metronome to 72 BPM
2. Pick up your D dizi
3. Count "1-2, 1-2" for the 2/4 feel
4. Play Mi on beat 1, Mi on beat 2 (first measure)
5. Play Sol on beat 1, then quickly La-high Do-La on beat 2 (second measure)
6. Hold Sol for the full measure (third measure)
7. Continue...

---

## Common Jianpu Abbreviations and Terminology

| Chinese | Pinyin | English |
|---------|--------|---------|
| \u7B80\u8C31 | ji\u01CEanp\u01D4 | Numbered musical notation |
| \u8C03 | di\u00E0o | Key |
| \u62CD | p\u0101i | Beat |
| \u62CD\u5B50 | p\u0101izi | Time signature / meter |
| \u5C0F\u8282 | xi\u01CEoji\u00E9 | Measure / bar |
| \u9644\u70B9 | f\u00F9di\u01CEn | Dotted note |
| \u4F11\u6B62\u7B26 | xi\u016Bzh\u01D0f\u00FA | Rest |
| \u97F3\u7B26 | y\u012Bnf\u00FA | Note |
| \u5347\u53F7 | sh\u0113ngh\u00E0o | Sharp sign (#) |
| \u964D\u53F7 | ji\u00E0ngh\u00E0o | Flat sign (b) |
| \u8FD8\u539F\u53F7 | hu\u00E1nyu\u00E1nh\u00E0o | Natural sign |
| \u53CD\u590D | f\u01CEanf\u00F9 | Repeat |
| \u8FDE\u7EBF | li\u00E1nxi\u00E0n | Tie or slur (the arc) |
| \u7B52\u97F3 | t\u01D2ngy\u012Bn | Fundamental tone (all holes covered) |
| \u7B52\u97F3\u4F5C5 | t\u01D2ngy\u012Bn zu\u00F2 w\u01D4 | "The fundamental plays as 5 (Sol)" \u2014 standard fingering |

---

## Tips for Beginners

1. **Start by clapping rhythms before playing.** Put down the dizi. Look at a piece and clap the rhythm while counting beats out loud. Get comfortable with the timing before adding notes.

2. **Sing the numbers out loud.** Before you play a passage, sing "yi, er, san, wu, liu" (1, 2, 3, 5, 6) or "Do, Re, Mi, Sol, La." This trains your ear and helps you internalize the melody.

3. **The pentatonic scale is your best friend.** The notes 1, 2, 3, 5, 6 (Do, Re, Mi, Sol, La) form the **pentatonic scale** \u2014 the backbone of Chinese music. The vast majority of melodies use primarily these five notes. Get completely comfortable with them before worrying about 4 (Fa) and 7 (Ti).

4. **2/4 time is the norm in Chinese folk music.** Unlike Western pop (mostly 4/4), Chinese folk music heavily favors 2/4. Count "ONE-two, ONE-two" with emphasis on beat one.

5. **Learn to recognize common patterns:**
   - \`1 3 5\` \u2014 ascending arpeggio (Do-Mi-Sol), bright and upward
   - \`5 6 1'\` \u2014 ascending pentatonic ending, common phrase ender going up
   - \`6 5 3\` \u2014 descending pentatonic, common phrase ender going down
   - \`5 - - -\` \u2014 long held Sol, a resting point
   - \`3 2 1\` \u2014 stepwise descent to home (Mi-Re-Do), classic resolution

6. **Read ahead.** While playing one measure, glance at the next. This keeps you from stumbling at bar lines.

7. **Mark up your score.** Circle notes you keep getting wrong. Draw breath marks where you plan to breathe. Write finger numbers if it helps. The score is a tool \u2014 use it.

8. **Ignore ornaments at first.** When learning a new piece, play just the main notes with correct rhythm. Add ornaments like trills, grace notes, and slides only after the basic melody is solid.

9. **Use a metronome.** Start at half the marked tempo. Only speed up when you can play perfectly at the slower speed. Rushing leads to sloppy habits.

10. **Listen to recordings.** Find a recording of the piece you are learning and listen to it repeatedly. Your ear will guide your fingers more than any notation can.

---

## Interactive Notation Support

The rendered notation examples in this guide show elements supported by our interactive renderer. The following printed jianpu elements are **not yet supported** in the interactive renderer and will only appear in printed scores:

- **Dynamics** (pp, p, mp, mf, f, ff) and hairpin crescendo/diminuendo
- **Tempo text** (rit., accel., a tempo)
- **Navigation marks** (D.C., D.S., Fine, Coda, Segno)
- **Triplet brackets**
- **Thirty-second notes** (triple underline)

These are primarily interpretive markings. The core pitch, rhythm, articulation, and ornamentation notation is fully supported.`,
  };
