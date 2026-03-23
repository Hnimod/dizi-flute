# Dizi Flute Jianpu Text Format Specification

This document defines the text-based jianpu (简谱) notation format used in this app. The format is designed to be human-readable, AI-parseable, and renderable as SVG notation.

## Song Data Structure

Song metadata is stored separately from notation in the `Song` type:

```typescript
interface Song {
  id: string;
  titleChinese?: string;
  titleVietnamese?: string;
  titleEnglish: string;
  key: string;           // e.g. "D", "G", "C"
  timeSignature: string; // e.g. "4/4", "2/4", "3/4"
  tempo?: number;        // BPM
  jianpu: string;        // Pure notation — NO headers
  description?: string;
  origin?: string;
}
```

The `jianpu` field contains **only notation lines** — no title, key, time signature, or tempo. Those are in the Song fields above.

## Notation Format

Each line contains space-separated tokens. Lines are rendered as separate SVG rows.

## Basic Notes

| Token | Meaning |
|-------|---------|
| `1` through `7` | Do Re Mi Fa Sol La Ti |
| `0` | Rest (silence) |
| `-` | Hold (sustain previous note) |

## Octave Markers

| Token | Meaning | Visual |
|-------|---------|--------|
| `1'` | One octave up | Dot above note |
| `1''` | Two octaves up | Two dots above |
| `5,` | One octave down | Dot below note |
| `5,,` | Two octaves down | Two dots below |

## Duration & Beat Counting

By default, each token = one beat (quarter note). The tempo guide uses these durations:

| Token | Duration | Beats | Visual |
|-------|----------|-------|--------|
| `3` | Quarter note | 1.0 | Plain number |
| `3_` | Eighth note | 0.5 | Single underline |
| `3__` | Sixteenth note | 0.25 | Double underline |
| `3.` | Dotted note | 1.5 | Number with dot |
| `3 -` | Half note | 2.0 | Number + hold |
| `3 - - -` | Whole note | 4.0 | Number + 3 holds |
| `0` | Quarter rest | 1.0 | 0 |
| `-` | Hold | 1.0 | — |

**Important for 4/4 time:** Each measure must total exactly 4 beats. For example:
- `1 2 3 5` = 4 beats (4 quarter notes)
- `[ 1_ 2_ ] [ 3_ 5_ ] 6 5` = 1 + 1 + 1 + 1 = 4 beats
- `[ 1_ 2_ 3_ 5_ ] - -` = 2 + 1 + 1 = 4 beats

## Beamed Groups

Use `[` `]` brackets to group notes under a shared beam (underline):

```
[ 3_ 5_ ]           Two eighth notes (1 beat total)
[ 1_ 2_ 3_ 5_ ]     Four eighth notes (2 beats total)
[ 1__ 2__ 3__ 5__ ]  Four sixteenth notes (1 beat total)
```

**Mixed beams:** Eighth and sixteenth notes can be mixed. The outer beam spans all notes; a second beam line only covers the sixteenth notes:

```
[ 6_ 6__ 1__ ]       Eighth + two sixteenths (1 beat total)
[ 3_ 6__ 1__ 5_ ]    Eighth + two sixteenths + eighth (1.5 beats)
```

## Accidentals

| Token | Meaning |
|-------|---------|
| `#4` | Sharp 4 (F# in key of C) |
| `b7` | Flat 7 (Bb in key of C) |
| `#5'` | Sharp 5, one octave up |

Accidentals go before the digit: `#` for sharp, `b` for flat.

## Articulation Marks

Suffixes added after the note digit (and after octave/dot/duration):

| Suffix | Meaning | Visual |
|--------|---------|--------|
| `^` | Fermata (hold freely) | 𝄐 above note |
| `;` | Staccato (short, detached) | · above note |
| `>` | Accent (emphasized) | > above note |
| `T` | Tonguing mark | Red T above note |

Examples: `6^` (fermata), `3;` (staccato), `5>` (accent), `3T` (tongued)

Can combine with other features: `#5'_^` = sharp 5, octave up, eighth note, fermata.

## Tonguing

### Per-note tonguing (T suffix)

Add `T` after any note to show a tonguing mark above it:

```
1T 2T 3T 5T          All four notes tongued
( 5 3 ) 2T -         Slurred pair, then tongued 2
5,T - 6,T -          Lower octave tongued notes
```

Notes inside slurs `( )` are typically NOT tongued (played legato). Notes outside slurs get `T`.

### Group tonguing annotations

Use `T:technique` tokens before a note group to label the technique:

| Token | Meaning | Renders as |
|-------|---------|------------|
| `T:single` | Single tonguing (单吐) | "T" above group |
| `T:double` | Double tonguing (双吐) | "TK" above group |
| `T:triple` | Triple tonguing (三吐) | "TTK" above group |

```
T:double [ 3_ 5_ 3_ 5_ ]
```

## Breath Marks

Use `V` to place a breath mark (∨) above the next bar line:

```
5 3 - - V | 2 - - - V | 1 - - - ||
```

`V` takes zero width and zero beats — it renders as ∨ positioned above the following `|`.

## Ornaments and Embellishments

### Trill

Prefix `tr` before a note: `tr3` renders "tr" above the note.

### Grace Notes

Parenthesized prefix: `(2)3` = grace note 2 before main note 3.

Can combine: `(2)#3'_` = grace note 2, then sharp 3 octave up eighth note.

### Ornament Annotations

Use `orn:name` tokens before the note they apply to:

| Token | Meaning |
|-------|---------|
| `orn:slide-up` | Upward slide (上滑音) |
| `orn:slide-down` | Downward slide (下滑音) |
| `orn:vibrato` | Vibrato (揉音) |
| `orn:flutter` | Flutter tongue (花舌) |
| `orn:tap` | Tap ornament (打音) |
| `orn:stack` | Stacked ornament (叠音) |
| `orn:trail` | Trailing ornament (赠音) |
| `orn:gliss` | Glissando (历音) |

```
orn:vibrato 6 - - -
```

## Ties and Slurs

| Token | Meaning | Visual |
|-------|---------|--------|
| `~` | Tie (connect same-pitch notes) | Small arc |
| `(` | Start of slur (legato group) | Arc over group |
| `)` | End of slur | Arc over group |

Slurs can contain beams:

```
( 5 3 )               Slurred quarter note pair
( [ 1_ 2_ ] )         Slurred beam group
( [ 1_ 2_ ] ) ( [ 3_ 5_ ] ) 6 -
```

## Bar Lines

| Token | Meaning | Visual |
|-------|---------|--------|
| `\|` | Single bar line | Thin vertical line |
| `\|\|` | Double bar line (end of piece) | Thin + thick line |
| `\|:` | Repeat start | |
| `:\|` | Repeat end | |

## Complete Example

小白菜 (Little White Cabbage) — Song fields: `key: "D"`, `timeSignature: "3/4"`, `tempo: 69`

The `jianpu` field contains only:

```
( 5T 3 ) 3T | 2T - - V | ( 5 3 ) ( [ 3_ 2_ ] ) | 1T - - V | ( 1T 3 ) 2T |
6,T - - V | 2T 1T | [ 1,_ 6,_ ] 5,T V | 2T 2T 3T | 2T - - V |
[ 5_ 3_ ] [ 3_ 2_ ] | 1T - - V | 1T [ 3_ 2_ ] | 6,T - - V | [ 2_ 1_ ] [ 1,_ 6,_ ] |
5,T - - V | 6,T [ 1,_ 6,_ ] | 5,T V | 6,T | [ 1,_ 6,_ ] 5,T V | 6,T 2T [ 1,_ 6,_ ] | 5,T - - ||
```

## Token Syntax Summary (Regex)

A note token matches: `(tr)?(#|b)?([1-7])([',]*)(\.*)?(__?)?([;^>T])?`

| Part | Example | Meaning |
|------|---------|---------|
| `tr` | `tr5` | Trill prefix |
| `#` or `b` | `#4`, `b7` | Accidental |
| `1`-`7` | `3` | Note digit |
| `'` or `,` | `1'`, `5,` | Octave up/down |
| `.` | `3.` | Dotted |
| `_` or `__` | `3_`, `3__` | Eighth/sixteenth |
| `;^>T` | `3T`, `5^` | Articulation |

## AI Prompt Template for Image-to-Jianpu

> I have a jianpu (简谱) score image. Convert it to text notation:
>
> - Notes: digits 1-7, octave up `'`, octave down `,`
> - Rests: `0`, Holds: `-`
> - Eighth notes: `_` suffix, sixteenth: `__` suffix
> - Beamed groups: `[ notes ]`
> - Accidentals: `#` or `b` prefix
> - Ties: `~`, Slurs: `( notes )`
> - Tonguing: `T` suffix on tongued notes
> - Breath marks: `V` before bar lines
> - Fermata: `^`, Staccato: `;`, Accent: `>`
> - Trill: `tr` prefix, Grace notes: `(x)y`
> - Bar lines: `|`, `||`
>
> Output ONLY the notation lines (no title/key/tempo header).
> Ensure each measure has the correct number of beats for the time signature.
