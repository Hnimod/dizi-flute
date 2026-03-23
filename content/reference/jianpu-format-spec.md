# Dizi Flute Jianpu Text Format Specification

This document defines the text-based jianpu (简谱) notation format used in this app. The format is designed to be human-readable, AI-parseable, and renderable as visual notation.

## Document Structure

```
Song Title (Chinese/Vietnamese/English)
1=D  4/4
Optional tempo/composer line

<notation lines>
```

- **Header**: Title, key signature (`1=D`), time signature (`4/4`), optional metadata
- **Blank line**: Separates header from notation
- **Notation lines**: Space-separated tokens

## Basic Notes

| Token | Meaning |
|-------|---------|
| `1` through `7` | Do Re Mi Fa Sol La Ti |
| `0` | Rest (silence) |
| `-` | Hold (sustain previous note) |

## Octave Markers

| Token | Meaning |
|-------|---------|
| `1'` | One octave up (dot above) |
| `1''` | Two octaves up |
| `5,` | One octave down (dot below) |
| `5,,` | Two octaves down |

## Duration

By default, each token = one beat (quarter note in 4/4 time).

| Token | Duration | Visual |
|-------|----------|--------|
| `3` | Quarter note | Plain number |
| `3_` | Eighth note | Number with single underline |
| `3__` | Sixteenth note | Number with double underline |
| `3.` | Dotted note (1.5× duration) | Number with dot |
| `3 -` | Half note (2 beats) | Number + hold |
| `3 - - -` | Whole note (4 beats) | Number + 3 holds |

## Beamed Groups

Use `[` `]` brackets to group notes under a shared beam (underline):

```
[ 3_ 5_ 6_ 1'_ ]
```

This renders all notes connected by a single underline beam, visually grouping eighth notes together.

## Accidentals

| Token | Meaning |
|-------|---------|
| `#4` | Sharp 4 (F♯ in key of C) |
| `b7` | Flat 7 (B♭ in key of C) |
| `#5'` | Sharp 5, one octave up |

Accidentals go before the digit: `#` for sharp, `b` for flat.

## Articulation Marks

Suffixes added after the note digit (and after octave/dot/duration):

| Suffix | Meaning | Visual |
|--------|---------|--------|
| `^` | Fermata (hold freely) | 𝄐 above note |
| `;` | Staccato (short, detached) | · above note |
| `>` | Accent (emphasized) | > above note |

Examples: `6^` (fermata on 6), `3;` (staccato 3), `5>` (accented 5)

Can combine with other features: `#5'_^` = sharp 5, octave up, eighth note, fermata.

## Ornaments and Embellishments

### Trill

Prefix `tr` before a note: `tr3` renders "tr" above the note.

### Grace Notes

Parenthesized prefix: `(2)3` = grace note 2 before main note 3.

Can combine with all features: `(2)#3'_` = grace note 2, then sharp 3 octave up eighth note.

### Ornament Annotations

Use `orn:name` tokens:

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

Place before the note it applies to:

```
orn:vibrato 5 - - -
```

## Tonguing Annotations

Use `T:technique` tokens to indicate tonguing patterns:

| Token | Meaning | Dizi Term |
|-------|---------|-----------|
| `T:single` | Single tonguing | 单吐 (dān tǔ) |
| `T:double` | Double tonguing (TK) | 双吐 (shuāng tǔ) |
| `T:triple` | Triple tonguing (TTK) | 三吐 (sān tǔ) |

Place before the note group:

```
T:double [ 3_ 5_ 3_ 5_ ]
```

## Ties and Slurs

| Token | Meaning |
|-------|---------|
| `~` | Tie (connect two same-pitch notes) |
| `(` | Start of slur (legato group) |
| `)` | End of slur |

Examples:
```
5 ~ 5     Tied: hold 5 across bar line
( 1 2 3 ) Slurred: play legato
```

## Bar Lines

| Token | Meaning |
|-------|---------|
| `\|` | Single bar line |
| `\|\|` | Double bar line (end of piece) |
| `\|:` | Repeat start |
| `:\|` | Repeat end |
| `:\|:` | Repeat both |

## Complete Example

Here is "Spring in Pamirs" (帕米尔的春天) opening in this format:

```
帕米尔的春天 (Spring in Pamirs)
1=F  7/8
Composer: 李大同 (Li Datong)

6.^ [ 3_ 6_ 7_ 1'_ 2_ ] | [ 3_ 3_ 3_ 3_ ] [ 3_ 3_ 3_ 3_ 3_ ] |
3 [ 2_ 3_ 2_ 1'_ ] 7 | 2 ( 1' [ 2_ 1'_ ] 7 6 ) | 1' 7 1' 7 6 #5 |
6 [ 3_ 6_ ] - | 3 [ 6_ 6_ ] 7 | 1' ( 7 [ 2'_ 1'_ ] 7 6 ) |
```

## AI Prompt Template for Image-to-Jianpu

When you have a jianpu score image, send it to Claude with this prompt:

---

**Prompt:**

> I have a jianpu (简谱) score image. Please convert it to text format using these rules:
>
> - Notes: digits 1-7, octave up `'`, octave down `,`
> - Rests: `0`, Holds: `-`
> - Eighth notes: `_` suffix (e.g., `3_`), sixteenth: `__` suffix
> - Beamed groups: `[ notes ]`
> - Accidentals: `#` or `b` prefix (e.g., `#5`, `b7`)
> - Ties: `~` between notes
> - Slurs: `( notes )`
> - Fermata: `^`, Staccato: `;`, Accent: `>`
> - Trill: `tr` prefix
> - Grace notes: `(x)y`
> - Bar lines: `|`, `||`, `|:`, `:|`
> - Header: title, key (`1=D`), time signature (`4/4`)
>
> Output the complete score in this text format.

---

## AI Prompt Template for Technique Suggestions

> Here is a jianpu score for dizi flute:
>
> ```
> [paste jianpu here]
> ```
>
> Please analyze and suggest:
> 1. Which tonguing technique (single/double/triple) for each phrase
> 2. Where to add ornaments (slides, vibrato, grace notes) for authentic Chinese style
> 3. Breathing points between phrases
> 4. Dynamic suggestions (soft/loud passages)
>
> Output the annotated score with `T:`, `orn:`, and dynamic markings added.
