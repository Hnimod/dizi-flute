import type { ReferenceDoc } from "@/shared/types";

export const reference: ReferenceDoc = {
    slug: "jianpu-format-spec",
    title: "Jianpu Text Format Spec",
    description: "Extended notation format for creating scores, AI prompts for image parsing and technique suggestions",
    icon: "\uD83D\uDCDD",
    content: `# Jianpu Text Format Specification

## Document Structure

\`\`\`
Song Title
1=D  4/4
Optional tempo/composer line

<notation lines>
\`\`\`

Header → blank line → notation lines (space-separated tokens).

## Basic Notes

| Token | Meaning |
|-------|---------|
| \`1\` through \`7\` | Do Re Mi Fa Sol La Ti |
| \`0\` | Rest (silence) |
| \`-\` | Hold (sustain previous note) |

## Octave Markers

\`1'\` = octave up, \`5,\` = octave down. Multiple allowed: \`1''\`, \`5,,\`.

## Duration

| Token | Duration |
|-------|----------|
| \`3\` | Quarter note (default) |
| \`3_\` | Eighth note (single underline) |
| \`3__\` | Sixteenth note (double underline) |
| \`3.\` | Dotted note (1.5× duration) |
| \`3 -\` | Half note (2 beats) |
| \`3 - - -\` | Whole note (4 beats) |

## Beamed Groups

\`[ 3 5 6 1' ]\` — group notes under a shared beam (eighth notes). The \`_\` suffix is optional inside beams; notes auto-default to eighth.

\`[ [ 3 5 ] [ 6 1' ] ]\` — nested beams render double beam lines (sixteenth notes).

\`[ 3_ 5_ 6_ 1'_ ]\` — explicit \`_\` also works and is equivalent to the above.

## Accidentals

\`#4\` = sharp, \`b7\` = flat. Goes before the digit.

## Articulation Suffixes

| Suffix | Meaning |
|--------|---------|
| \`^\` | Fermata (𝄐 above) |
| \`;\` | Staccato (dot above) |
| \`>\` | Accent (> above) |

Combine: \`#5'_^\` = sharp 5, octave up, eighth, fermata.

## Ornaments

- **Trill**: \`tr3\` — "tr" above note
- **Grace note**: \`(2)3\` — grace note 2 before main note 3
- **Double grace note**: \`(2)(3)5\` — two grace notes before main note

### Ornament Annotations

Place before the note. Three equivalent syntaxes: full (\`orn:xxx\`), Chinese character, or short English name.

| Full | Chinese | Short | Display | Description |
|------|---------|-------|---------|-------------|
| \`orn:fork\` | \`\u53C8\` | \`fork\` | \u53C8 | Fork fingering (alternate tone color) |
| \`orn:die\` | \`\u53E0\` | \`die\` | \u53E0 | Stacked grace (from above) |
| \`orn:da\` | \`\u6253\` | \`da\` | \u6253 | Struck grace (from below) |
| \`orn:zeng\` | \`\u8D60\` | \`zeng\` | \u8D60 | Trailing note at end |
| \`orn:bo\` | \`\u6CE2\` | \`bo\` | \u6CE2 | Mordent (upper-neighbor flick) |
| \`orn:vibrato\` | — | \`vib\` | \u223F | Breath vibrato |
| \`orn:flutter\` | \`\u82B1\` | \`flutter\` | \u82B1 | Flutter tongue |
| \`orn:slide-up\` | — | \`su\` | \u2197 | Slide up |
| \`orn:slide-down\` | — | \`sd\` | \u2198 | Slide down |

Example: \`\u53E0 5\` is equivalent to \`orn:die 5\` and \`die 5\`.

## Tonguing

\`T\` (single tongue), \`TK\` (double tongue), \`TTK\` (triple tongue) — place before note. Full form \`T:single\`, \`T:double\`, \`T:triple\` also accepted.

## Ties and Slurs

\`~\` = tie, \`(\` \`)\` = slur boundaries.

## Bar Lines

\`|\`, \`||\`, \`|:\`, \`:|\`, \`:|:\`

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
> Please suggest: tonguing (T:single/double/triple), ornaments (\u53E0/\u6253/\u6CE2/\u53C8/\u8D60 or orn:vibrato/orn:die/orn:da etc.), breathing points, dynamics.`,
  };
