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

\`[ 3_ 5_ 6_ 1'_ ]\` — group notes under a shared underline beam.

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
- **Ornament annotations**: \`orn:vibrato\`, \`orn:slide-up\`, \`orn:slide-down\`, \`orn:flutter\`, \`orn:tap\`, \`orn:stack\`, \`orn:trail\`, \`orn:gliss\`

## Tonguing

\`T:single\` (T), \`T:double\` (TK), \`T:triple\` (TTK) — place before note group.

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
> Please suggest: tonguing (T:single/double/triple), ornaments (orn:vibrato etc.), breathing points, dynamics.`,
  };
