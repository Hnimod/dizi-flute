import type { Technique } from "@/shared/types";

export const technique: Technique = {
    id: "appoggiatura",
    name: "Appoggiatura (倚音)",
    category: "ornaments",
    level: 2,
    description: "Grace note(s) played just before the main note with a light tongue attack — the formal Chinese conservatory ornament.",
    content: `## What is Appoggiatura?

Appoggiatura (倚音, yǐ yīn, "leaning note") is a grace note played just before the principal note. Unlike 叠音 (die yin) and 打音 (da yin) which use finger-only articulation, appoggiatura uses a light tongue attack on the grace note.

## Types

### Single Appoggiatura (单倚音)
One grace note before the main note. Written as a small note before the principal.

Example: \`(3)5\` — quick 3, then land on 5

### Double Appoggiatura (双倚音)
Two grace notes before the main note.

Example: \`(3)(5)6\` — quick 3, quick 5, then land on 6

### Multiple Appoggiatura (复倚音)
Three or more grace notes cascading into the main note. Creates a flourish effect.

## How It Differs from 叠音 and 打音

| Ornament | Direction | Tongue? | Character |
|----------|-----------|---------|-----------|
| 倚音 (Appoggiatura) | Above or below | Yes, light tongue | Clean, articulated |
| 叠音 (Die Yin) | One hole above | No, finger only | Soft, blended |
| 打音 (Da Yin) | One hole below | No, finger only | Percussive, snappy |

## How to Do It

1. Tongue lightly ("tu") on the grace note
2. Immediately transition to the main note
3. The grace note should be very short — it "leans" into the principal note
4. The main note gets the full rhythmic value

## How to Practice

- Start with single appoggiatura: \`(2)3\`, \`(5)6\`, \`(1)2\`
- The grace note should be barely heard — a flash before the main note
- Practice in context: add appoggiatura to melody notes in songs you know
- Gradually try double appoggiatura for more elaborate ornaments

## In Notation

Grace notes appear as small numbers in parentheses before the main note.`,
    notationExample: "(2)3 - (5)6 - | (3)(5)6 - - - ||",
  };
