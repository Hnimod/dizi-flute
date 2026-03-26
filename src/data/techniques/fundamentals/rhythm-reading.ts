import type { Technique } from "@/shared/types";

export const technique: Technique = {
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
  };
