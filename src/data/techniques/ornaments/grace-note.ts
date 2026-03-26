import type { Technique } from "@/shared/types";

export const technique: Technique = {
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
  };
