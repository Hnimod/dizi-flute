import type { ReferenceDoc } from "@/shared/types";

export const reference: ReferenceDoc = {
  slug: "staff-mapping",
  title: "Jianpu to Staff Notation",
  description: "How numbered notation (jianpu) maps to Western staff notation — the complete conversion reference.",
  icon: "music",
  content: `
# Jianpu to Staff Notation Mapping

This guide explains how to read jianpu (numbered notation) alongside Western staff notation — the dual system used in this app's Staff view.

## The Movable-Do System

Jianpu uses **movable-do**: the number **1** always represents the tonic (root note) of the key. The key declaration **1=X** at the top of every score tells you which pitch is "1".

### Scale Degree Mapping

| Number | Solfege | Scale Degree |
|--------|---------|-------------|
| 1 | Do | Tonic |
| 2 | Re | 2nd |
| 3 | Mi | 3rd |
| 4 | Fa | 4th |
| 5 | Sol | 5th |
| 6 | La | 6th |
| 7 | Ti | 7th |

### Example: Key of D (1=D)

| Jianpu | Staff Note | Position |
|--------|-----------|----------|
| 1 | D | Below staff (1 ledger line below in key of C, on staff in key of D) |
| 2 | E | |
| 3 | F# | (key signature handles the sharp) |
| 4 | G | |
| 5 | A | |
| 6 | B | |
| 7 | C# | (key signature handles the sharp) |

## Octave Markers

Dots above or below the number shift the octave:

| Marking | Meaning | Example (1=D) |
|---------|---------|---------------|
| 5 (no dots) | Middle octave | A4 |
| 5' (dot above) | One octave up | A5 |
| 5, (dot below) | One octave down | A3 |

For dizi, the middle octave (no dots) centers around D4-C#5 in the key of D.

## Duration Mapping

| Jianpu | Western | Beats |
|--------|---------|-------|
| 5 | Quarter note ♩ | 1 |
| 5_ | Eighth note ♪ | 0.5 |
| 5__ | Sixteenth note | 0.25 |
| 5 - | Half note 𝅗𝅥 | 2 |
| 5 - - | Dotted half note 𝅗𝅥. | 3 |
| 5 - - - | Whole note 𝅝 | 4 |
| 5. | Dotted quarter ♩. | 1.5 |

**Rules:**
- Each **underline** halves the duration
- Each **dash (-)** adds one quarter-note beat
- Each **dot (.)** adds 50% of current duration

## Rests

| Jianpu | Western |
|--------|---------|
| 0 | Quarter rest 𝄾 |
| 0_ | Eighth rest |
| 0 - | Half rest |
| 0 - - - | Whole rest |

## Accidentals

Sharps (#) and flats (b) in jianpu are **relative to the scale degree**:

| Jianpu | Meaning | In Key of D |
|--------|---------|-------------|
| #4 | Sharped 4th degree | G → G# |
| b7 | Flatted 7th degree | C# → C |
| #1 | Sharped tonic | D → D# |

This differs from staff notation where accidentals are absolute. The key signature on the staff already handles the scale's sharps/flats automatically.

## Bar Lines

| Jianpu | Staff | Meaning |
|--------|-------|---------|
| \\| | Single bar | Measure boundary |
| \\|\\| | Double bar | End of piece |
| :\\| | Repeat end | End of repeat section |
| \\|: | Repeat begin | Start of repeat section |

## Ties and Slurs

| Jianpu | Staff | Meaning |
|--------|-------|---------|
| ~ | Tie | Same pitch sustained across bar |
| ( ... ) | Slur | Smooth legato between different pitches |

## Time Signatures

Written identically in both systems: **4/4**, **3/4**, **6/8**, etc.

The time signature determines how many beats per measure and which note value gets one beat.

## Dizi Convention: 筒音作5

For dizi (Chinese bamboo flute), the standard fingering system uses **all holes closed = 5 (Sol)**. This means:
- In key of D: all holes closed produces A (the 5th degree of D major)
- The playable range is roughly 2 octaves centered on the middle register
- Notes without octave dots are the most common range

## Reading the Dual Notation

When the **Staff** toggle is enabled, you see both systems stacked:
1. **Top**: Western staff notation (treble clef, key signature, time signature, noteheads)
2. **Bottom**: Jianpu numbered notation (digits, underlines, slurs, holds)

Both systems show the **exact same music** — just in different visual representations. Notes, bar lines, and rhythms align vertically between the two systems.
`,
};
