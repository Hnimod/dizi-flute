import type { ReferenceDoc } from "@/shared/types";

export const reference: ReferenceDoc = {
    slug: "jianpu-format-spec",
    title: "Jianpu (简谱) — Notation Reference",
    description: "Complete reference for reading numbered notation and writing it in this app's text format. Includes live-rendered examples and AI prompts for image parsing.",
    icon: "📝",
    content: `# Jianpu (简谱) — Notation Reference

A complete guide to reading Chinese numbered notation **and** writing it in this app's text format. Every section shows a live-rendered example below the explanation.

---

## What is Jianpu?

**Jianpu** (简谱, jiǎnpǔ, "simple notation") is a numbered musical notation system used throughout China and East Asia. Notes are represented as digits 1–7 instead of dots on a five-line staff.

### Why Jianpu?

- **Easier to learn** than Western staff notation, especially for beginners.
- **Ideal for transposing instruments** like the dizi — the same written music works on any key of dizi; you just pick up a different instrument.
- **Relative pitch system** — \`1\` is always "Do" regardless of key. \`1=D\` means "1 sounds as D."

### Jianpu vs. Staff Notation

| Aspect | Staff Notation | Jianpu |
|--------|----------------|--------|
| Notes shown as | Dots on five lines | Digits 1–7 |
| Pitch system | Fixed (C is always C) | Relative (1 is always Do) |
| Transposing | Rewrite all notes | Change the key signature |
| Used primarily in | Western classical, jazz | Chinese / East Asian music |

---

## Document Structure

A jianpu score in this app's text format:

\`\`\`
Song Title
1=D  4/4
Optional tempo/composer line

<notation lines>
\`\`\`

Header → blank line → notation lines (space-separated tokens).

---

## Note Numbers

The seven digits correspond to the seven notes of the major scale:

| Digit | Solfege | Scale Degree |
|-------|---------|--------------|
| 1 | Do | Tonic (the "home" note) |
| 2 | Re | Major 2nd |
| 3 | Mi | Major 3rd |
| 4 | Fa | Perfect 4th |
| 5 | Sol | Perfect 5th |
| 6 | La | Major 6th |
| 7 | Ti / Si | Major 7th |
| 0 | — | Rest (silence) |
| \`-\` | — | Hold (sustain previous note) |

\`\`\`jianpu
1 2 3 4 5 6 7 | 1 0 1 - | 1 - - -
\`\`\`

### Note Numbers in Common Dizi Keys

| Digit | Solfege | 1=D | 1=G | 1=C | 1=F | 1=A |
|-------|---------|-----|-----|-----|-----|-----|
| 1 | Do | D | G | C | F | A |
| 2 | Re | E | A | D | G | B |
| 3 | Mi | F# | B | E | A | C# |
| 4 | Fa | G | C | F | Bb | D |
| 5 | Sol | A | D | G | C | E |
| 6 | La | B | E | A | D | F# |
| 7 | Ti | C# | F# | B | E | G# |

When you see \`1=D\` at the top of a piece, every \`1\` is a D, every \`2\` is an E, and so on. Pick up the dizi keyed to that pitch and the fingerings stay identical across keys.

---

## Octave Markers

Dots above or below a number shift its pitch up or down by one octave. In this text format, dots become apostrophes (high) or commas (low) after the digit.

| Token | Octave |
|-------|--------|
| \`1\` | Middle octave (中音 zhōng yīn) — default |
| \`1'\` | One octave up (高音 gāo yīn) — dot above |
| \`1''\` | Two octaves up — rare |
| \`5,\` | One octave down (低音 dī yīn) — dot below |
| \`5,,\` | Two octaves down — rare |

\`\`\`jianpu
5, 6, 7, | 1 2 3 4 5 6 7 | 1' 2' 3' 5'
\`\`\`

### Playable Range on a D-Key Dizi (筒音作5)

This is the standard range when the lowest note (all holes covered) is Sol:

| Jianpu | Solfege | Actual Pitch (1=D) | Register |
|--------|---------|--------------------|----------|
| \`5,\` | Low Sol | A3 | Low (低音) |
| \`6,\` | Low La | B3 | Low |
| \`7,\` | Low Ti | C#4 | Low |
| \`1\` | Do | D4 | Middle (中音) |
| \`5\` | Sol | A4 | Middle |
| \`7\` | Ti | C#5 | Middle |
| \`1'\` | High Do | D5 | High (高音) |
| \`5'\` | High Sol | A5 | High |

Notes: low register needs gentle breath; high register requires overblowing. Notes above 3' get increasingly difficult.

---

## Durations

Duration is shown by **dashes after the number** (longer notes) and **underlines below the number** (shorter notes). In this text format, the underline becomes a trailing \`_\`.

| Token | Duration | Beats in 4/4 |
|-------|----------|--------------|
| \`3\` | Quarter (四分音符) | 1 |
| \`3_\` | Eighth (八分音符) | 1/2 |
| \`3__\` | Sixteenth (十六分音符) | 1/4 |
| \`3.\` | Dotted note (附点) | 1.5× |
| \`3 -\` | Half note (二分) | 2 |
| \`3 - -\` | Dotted half | 3 |
| \`3 - - -\` | Whole note (全音符) | 4 |

\`\`\`jianpu
3 3 3 3 | 3_ 3_ 3_ 3_ 3_ 3_ 3_ 3_ | 3__ 3__ 3__ 3__ 3__ 3__ 3__ 3__ | 3. 3_ 3 3 | 3 - 3 - | 3 - - -
\`\`\`

Each dash extends the note by one additional beat. Think of each \`-\` as "keep holding for one more beat." A dot **after** a digit = dotted note (extends by half). A dot **above** or **below** = octave marker. Position makes the meaning clear.

---

## Rests

Rests follow the same duration rules as notes, but use \`0\`:

| Token | Duration |
|-------|----------|
| \`0\` | Quarter rest |
| \`0 -\` | Half rest |
| \`0 - - -\` | Whole rest |
| \`0_\` | Eighth rest |
| \`0__\` | Sixteenth rest |

\`\`\`jianpu
0 | 0 - | [ 0_ 5_ ] | [ 0__ 0__ 5__ 5__ ]
\`\`\`

---

## Beamed Groups

\`[ ... ]\` groups notes under a shared beam. The \`_\` suffix is optional inside beams; notes default to eighth.

- \`[ 3 5 6 1' ]\` — eighth-note beam group
- \`[ [ 3 5 ] [ 6 1' ] ]\` — nested beams render double beam lines (sixteenths)
- \`[ 3_ 5_ 6_ 1'_ ]\` — explicit \`_\` is equivalent

\`\`\`jianpu
[ 3 5 6 1' ] [ 3 5 6 1' ] | [ [ 3 5 ] [ 6 1' ] ] [ [ 3 5 ] [ 6 1' ] ]
\`\`\`

---

## Accidentals

\`#4\` = sharp Fa, \`b7\` = flat Ti. The accidental goes before the digit and applies only to that single note (not the whole measure, unlike staff notation).

\`\`\`jianpu
#4 b7 | #1 b3 | #5 b6
\`\`\`

---

## Key Signatures

The key signature is written as \`1=X\` at the top of a piece, telling you which pitch the digit \`1\` corresponds to.

| Dizi Key | Key Signature | 1 (Do) = | 筒音 (lowest note) |
|----------|---------------|----------|----------------------|
| C dizi | \`1=C\` | C | Sol (5,) = G |
| D dizi | \`1=D\` | D | Sol (5,) = A |
| E dizi | \`1=E\` | E | Sol (5,) = B |
| F dizi | \`1=F\` | F | Sol (5,) = C |
| G dizi | \`1=G\` | G | Sol (5,) = D |
| A dizi | \`1=A\` | A | Sol (5,) = E |
| bB dizi | \`1=bB\` | Bb | Sol (5,) = F |

The dizi is a transposing instrument. Different-key dizis produce different pitches from the same fingering, but **the digit-to-fingering map stays the same** — that's the magic of jianpu for this instrument.

---

## 筒音 — Same Song, Different Digits

**筒音** (tǒngyīn, "tube tone") is the sound the dizi makes when **all six finger holes are covered** — the instrument's lowest natural note. On a D-key dizi, this is A3.

What digit you *label* 筒音 with is a notation **convention**, not a physical fact. Different teachers, regions, and eras pick different labels:

| Convention | Reads 筒音 as | Most common with |
|------------|---------------|------------------|
| **筒音作5** (zuò wǔ) | digit 5 (Sol) | Modern conservatory standard — used in most published scores today |
| **筒音作6** (zuò liù) | digit 6 (La) | Older folk traditions, some northern styles |
| **筒音作2** (zuò èr) | digit 2 (Re) | Specific keys and folk repertoire |

The dizi itself does not care which convention you read. **Pick up the same flute and play the same fingerings, and the exact same sound comes out** — the only thing that changes is the digit you see on the page and the implied key signature.

### Same phrase, three conventions

Here is the opening of 茉莉花 written three ways. Same flute, same fingerings, same audible result — only the labels change.

**Original — 筒音作5 (1=D):**

\`\`\`jianpu
3 3 | 5 [ 6_ 1'_ 6_ ] | 5 -
\`\`\`

**Same physical phrase relabeled to 筒音作6 (1=C):**

\`\`\`jianpu
4 4 | 6 [ 7_ 2'_ 7_ ] | 6 -
\`\`\`

**Same physical phrase relabeled to 筒音作2 (1=G):**

\`\`\`jianpu
7, 7, | 2 [ 3_ 5_ 3_ ] | 2 -
\`\`\`

Notice that the **key signature changes too** (D → C → G). Digits and key always move together — the same flute appears to "live" in a different key depending on the convention you read.

### Why this matters

- Most modern scores use 筒音作5, but you'll encounter folk arrangements in 筒音作6 or 筒音作2.
- If you learned one convention first, scores in another feel jarring — every digit is shifted.
- A recording, a tutorial, and a sheet you found online may each use a different convention for the very same piece.

### Switching tongyin in this app

On any song page in this app, the **Tongyin** picker (next to the score) lets you relabel any piece into your preferred convention in real time. The app keeps the audible pitches identical and updates:

- Every digit in the jianpu
- The displayed key signature
- The staff notation (if you've toggled the **Staff** view on)

Pick the convention you learned first — the app handles the math. The song's *sound* never changes; only how it's written.

---

## Time Signatures & Bar Lines

Time signature is a fraction at the top of the score: top = beats per measure, bottom = note value that gets one beat.

| Time Sig | Feel | Common In |
|----------|------|-----------|
| 2/4 | March, STRONG-weak | Chinese folk (very common) |
| 3/4 | Waltz, STRONG-weak-weak | Some Chinese pieces |
| 4/4 | STRONG-weak-medium-weak | Pop, general music |
| 6/8 | Two groups of three | Compound feel, some folk |

For beginners, focus on 2/4 and 4/4 first.

### Bar Lines

| Token | Meaning |
|-------|---------|
| \`|\` | Single bar line |
| \`||\` | Double bar line / section end |
| \`|:\` | Repeat start |
| \`:|\` | Repeat end |
| \`:|:\` | Repeat end + new repeat start |

\`\`\`jianpu
3 3 3 3 | 3 3 3 3 || |: 3 3 3 3 :| 3 3 3 3
\`\`\`

---

## Articulation

### Suffixes on a single note

| Suffix | Name | Meaning |
|--------|------|---------|
| \`^\` | Fermata (𝄐) | Hold longer than written |
| \`;\` | Staccato | Short and detached |
| \`>\` | Accent | Emphasize |

Combine: \`#5'_^\` = sharp 5, octave up, eighth, fermata.

\`\`\`jianpu
3 - - 3^ | 3; 3; 3; 3; | 3> 3> 3 3
\`\`\`

### Tonguing

| Token | Name (Chinese) | Technique |
|-------|----------------|-----------|
| \`T\` | 单吐 (dāntǔ) | Single tongue — say "tu" |
| \`TK\` | 双吐 (shuāngtǔ) | Double tongue — "tu-ku" |
| \`TTK\` | 三吐 (sāntǔ) | Triple tongue — "tu-tu-ku" |

Full form \`T:single\`, \`T:double\`, \`T:triple\` is also accepted. Place the token before the note.

\`\`\`jianpu
T 3 T 3 T 3 T 3 | TK 3 TK 3 TK 3 TK 3 | TTK 3 TTK 3 TTK 3
\`\`\`

---

## Ties and Slurs

- \`~\` = **tie** — connect two notes of the same pitch; hold for the combined duration without re-tonguing.
- \`( ... )\` = **slur** — play different notes smoothly (legato); tongue only the first.

\`\`\`jianpu
3 ~ 3 - | ( 3 5 6 5 ) | ( 1 3 5 ) - -
\`\`\`

In printed jianpu, both use the same arc symbol; context (same pitch vs different pitches) makes the meaning clear.

---

## Ornaments

### Inline ornaments

- **Trill**: \`tr3\` — "tr~~~" above note, rapid alternation with the upper neighbor
- **Grace note**: \`(2)3\` — small note 2 before main note 3
- **Double grace note**: \`(2)(3)5\` — two grace notes before main note

\`\`\`jianpu
tr3 - - - | (2)3 - (2)3 - | (2)(3)5 - - -
\`\`\`

### Ornament Annotations

Place before the note. Three equivalent syntaxes: full (\`orn:xxx\`), Chinese character, or short English name.

| Full | Symbol | Short | Chinese Name | Description |
|------|--------|-------|--------------|-------------|
| \`orn:die\` | 又 | \`die\` | 叠音 (dié yīn) | Stacked grace — quick upper-neighbor flick (finger only, no tongue) |
| \`orn:da\` | ⺘ | \`da\` | 打音 (dǎ yīn) | Struck grace — quick lower-neighbor strike (finger only) |
| \`orn:zeng\` | 赠 | \`zeng\` | 赠音 (zèng yīn) | Trailing "gift" note at end of a held note |
| \`orn:bo\` | ∽ | \`bo\` | 上波音 (shàng bō yīn) | Upper mordent — single flick to upper neighbor and back |
| \`orn:lower-bo\` | ≁ | \`lower-bo\` | 下波音 (xià bō yīn) | Lower mordent — single flick to lower neighbor and back |
| \`orn:vibrato\` | ∿ | \`vib\` | 气震音 (qì zhèn yīn) | Breath vibrato — pulse diaphragm to shimmer the note |
| \`orn:flutter\` | * | \`flutter\` | 花舌 (huā shé) | Flutter tongue — rolling tongue while blowing |
| \`orn:slide-up\` | ↗ | \`su\` | 上滑音 (shàng huá yīn) | Slide up — continuous pitch glide upward |
| \`orn:slide-down\` | ↘ | \`sd\` | 下滑音 (xià huá yīn) | Slide down — continuous pitch glide downward |
| \`orn:return-slide\` | 回 | \`rs\` | 回滑音 (huí huá yīn) | Return slide — up to upper neighbor and back, one rounded arch |
| \`orn:glide-up\` | ⇗ | \`gu\` | 上历音 (shàng lì yīn) | Upper glissando run — rapid ascending scalar sweep |
| \`orn:glide-down\` | ⇘ | \`gd\` | 下历音 (xià lì yīn) | Lower glissando run — rapid descending scalar sweep |
| \`orn:fly\` | 飞 | \`fly\` | 飞指 (fēi zhǐ) | Flying finger — rapid finger flutter for shimmering effect |

Example: \`又 5\` is equivalent to \`orn:die 5\` and \`die 5\`.

\`\`\`jianpu
又 5 ⺘ 5 bo 5 lower-bo 5 | 赠 5 - vib 5 - | 花 5 - - -
su 5 sd 5 rs 5 - | gu 5 - gd 5 - | 飞 5 - - -
\`\`\`

---

## Tempo Markings

### Standard Italian terms

| Marking | BPM | Chinese | Feel |
|---------|-----|---------|------|
| Largo | 40–60 | 广板 (guǎngbǎn) | Very slow, broad |
| Adagio | 60–76 | 慢板 (mànbǎn) | Slow, at ease |
| Andante | 76–108 | 行板 (xíngbǎn) | Walking pace |
| Moderato | 108–120 | 中板 (zhōngbǎn) | Moderate |
| Allegro | 120–156 | 快板 (kuàibǎn) | Fast, lively |
| Presto | 168–200 | 急板 (jíbǎn) | Very fast |

### Chinese-specific terms

| Term | Pinyin | Meaning |
|------|--------|---------|
| 散板 | sǎnbǎn | Free time — no fixed beat, play expressively |
| 摇板 | yáobǎn | Flexible rhythm — accompaniment steady, melody free |

散板 (free time) is extremely common in Chinese music, especially at the start of a piece.

### Tempo Changes (text tokens)

\`rit\` (ritardando — slow down), \`accel\` (accelerando — speed up), \`atempo\` (return to original speed). Place before the note where the change begins.

\`\`\`jianpu
rit 3 - - - | accel 3 3 3 3 | atempo 3 - - -
\`\`\`

---

## Dynamics

Dynamics tell you how loud to play. They're not yet rendered by the interactive renderer — they only appear in printed scores — but you'll see them in published jianpu.

| Symbol | Italian | Meaning | Dizi Technique |
|--------|---------|---------|----------------|
| pp | pianissimo | Very soft | Very gentle breath |
| p | piano | Soft | Gentle breath |
| mp | mezzo piano | Moderately soft | Light-medium breath |
| mf | mezzo forte | Moderately loud | Medium-strong breath |
| f | forte | Loud | Strong breath |
| ff | fortissimo | Very loud | Very strong breath |

Gradual changes: \`cresc.\` (渐强 jiànqiáng) = get louder, \`dim.\` (渐弱 jiànruò) = get softer.

---

## Repeats & Navigation

### First and second endings (volta brackets)

When a repeated section has a different ending the second time:

\`\`\`jianpu
|: 1 2 3 5 | 5 3 [1. 2 - :| [2. 1 - ||
\`\`\`

- First time through: play the \`1.\` ending, then repeat back to \`|:\`
- Second time through: skip \`1.\`, play \`2.\` instead

### Navigation marks (printed, not yet rendered)

| Symbol | Italian | Meaning |
|--------|---------|---------|
| D.C. | Da Capo | Back to the very beginning |
| D.S. | Dal Segno | Back to the segno sign |
| Fine | — | The end (used with D.C./D.S.) |
| Coda | 尾声 (wěishēng) | Jump to the coda |
| 𝄋 or % | Segno | The sign — D.S. sends you here |

---

## Reading Example: 茉莉花 (Mòlìhuā — Jasmine Flower)

A classic Chinese folk song. Header: \`1=D\`, \`2/4\`, Andante ♩=72.

\`\`\`jianpu
3 3 | 5 [ 6_ 1'_ 6_ ] | 5 - | 5 [ 6_ 1'_ 6_ ] | 5 - |
3 [ 5_ 6_ ] | 1' [ 6_ 5_ ] | 6 - | [ 5_ 3_ 2_ 1_ ] | 2 - ||
\`\`\`

| Measure | Reading |
|---------|---------|
| \`3 3\` | Mi, Mi — two quarter notes |
| \`5 [ 6_ 1'_ 6_ ]\` | Sol (quarter); then La – high Do – La beamed as eighths |
| \`5 -\` | Sol held for the full measure (half note) |
| \`3 [ 5_ 6_ ]\` | Mi quarter; Sol-La beamed eighths |
| \`1' [ 6_ 5_ ]\` | High Do quarter; La-Sol beamed eighths |
| \`[ 5_ 3_ 2_ 1_ ]\` | Sol-Mi-Re-Do beamed sixteenths-like run |
| \`2 -\` | Re held to end of phrase |

---

## Glossary

| Chinese | Pinyin | English |
|---------|--------|---------|
| 简谱 | jiǎnpǔ | Numbered musical notation |
| 调 | diào | Key |
| 拍 | pāi | Beat |
| 拍子 | pāizi | Time signature / meter |
| 小节 | xiǎojié | Measure / bar |
| 附点 | fùdiǎn | Dotted note |
| 休止符 | xiūzhǐfú | Rest |
| 音符 | yīnfú | Note |
| 升号 | shēnghào | Sharp sign (#) |
| 降号 | jiànghào | Flat sign (b) |
| 反复 | fǎnfù | Repeat |
| 连线 | liánxiàn | Tie or slur (the arc) |
| 筒音 | tǒngyīn | Fundamental tone (all holes covered) |
| 筒音作5 | tǒngyīn zuò wǔ | "Fundamental plays as 5 (Sol)" — standard fingering |

---

## Tips for Beginners

1. **Clap before playing.** Put down the dizi. Look at a piece and clap the rhythm while counting beats out loud. Get the timing right before adding pitches.

2. **Sing the numbers out loud.** Sing "yi, er, san, wu, liu" (1, 2, 3, 5, 6) or "Do, Re, Mi, Sol, La" before playing. Trains your ear.

3. **The pentatonic scale is your best friend.** The notes 1, 2, 3, 5, 6 form the **pentatonic scale** — the backbone of Chinese music. Get comfortable with these five before worrying about 4 and 7.

4. **2/4 is the norm.** Chinese folk music heavily favors 2/4 (unlike Western pop's 4/4). Count "ONE-two, ONE-two" with emphasis on beat 1.

5. **Common patterns to recognize:**
   - \`1 3 5\` — ascending arpeggio, bright
   - \`5 6 1'\` — ascending pentatonic phrase ender
   - \`6 5 3\` — descending pentatonic phrase ender
   - \`5 - - -\` — long Sol, a resting point
   - \`3 2 1\` — stepwise descent to home

6. **Read ahead.** While playing one measure, glance at the next.

7. **Ignore ornaments at first.** Get the main melody and rhythm solid, then layer ornaments on top.

8. **Use a metronome.** Start at half tempo. Only speed up when you can play perfectly slow.

9. **Listen to recordings.** Find a reference recording of the piece you're learning. Your ear will guide your fingers more than any notation.

---

## Interactive Notation Support

The rendered notation in this page demonstrates elements the app's interactive renderer supports. These printed elements are **not yet rendered** and only appear in static scores:

- Dynamics (pp, p, mp, mf, f, ff) and hairpin crescendo/diminuendo
- Navigation marks (D.C., D.S., Fine, Coda, Segno)
- Triplet brackets
- Thirty-second notes (triple underline)

Core pitch, rhythm, articulation, and ornamentation are fully supported.

---

## AI Prompt: Image to Jianpu

> I have a jianpu (简谱) score image. Please convert it to text format:
> - Notes: digits 1-7, octave up \`'\`, octave down \`,\`
> - Rests: \`0\`, Holds: \`-\`
> - Eighth notes: \`_\` suffix, sixteenth: \`__\`
> - Beamed groups: \`[ notes ]\`
> - Accidentals: \`#\` or \`b\` prefix
> - Ties: \`~\`, Slurs: \`( notes )\`
> - Fermata: \`^\`, Staccato: \`;\`, Accent: \`>\`
> - Trill: \`tr\` prefix, Grace notes: \`(x)y\`
> - Bar lines: \`|\`, \`||\`, \`|:\`, \`:|\`
> - Header: title, key (\`1=D\`), time signature (\`4/4\`)

## AI Prompt: Technique Suggestions

> Here is a dizi jianpu score:
> \\\`\\\`\\\`
> [paste jianpu]
> \\\`\\\`\\\`
> Please suggest: tonguing (T:single/double/triple), ornaments (又/⺘/∽/≁/赠/回/飞 or orn:vibrato/orn:die/orn:da/orn:bo/orn:lower-bo/orn:return-slide/orn:glide-up/orn:glide-down/orn:fly etc.), breathing points, dynamics.`,
  };
