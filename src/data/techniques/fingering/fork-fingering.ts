import type { Technique } from "@/shared/types";

export const technique: Technique = {
    id: "fork-fingering",
    name: "叉口 (Fork Fingering)",
    category: "fingering",
    level: 4,
    description: "Non-standard fingerings where open holes sit between closed ones. Used for special tonal colors.",
    referenceSlug: "fingering-charts",
    content: `## What is Fork Fingering?

Fork fingering (叉口, chā kǒu) means having an open hole between two closed holes — like the tines of a fork. Standard fingerings go "all closed from bottom up," but fork fingerings break this pattern.

## How to Do It

1. Instead of the standard fingering for a note, use an alternate fingering with a gap
2. The resulting tone is usually slightly different in color — darker, more muffled, or with a unique resonance
3. Fork fingerings are essential for certain notes that can't be reached with standard fingerings

## Common Uses

- **又音 (fork tone):** A specific ornamental technique in northern dizi music where you alternate between standard and fork fingering on the same note
- **Chromatic notes:** Some sharps and flats require fork fingerings
- **Tonal color:** Professional players use fork fingerings by choice for their unique sound quality

## In Notation

Fork fingering is marked with **又** above the note. In notation: \`orn:fork\` before the note.`,
    notationExample: "orn:fork 5 - orn:fork 3 - | 5 orn:fork 5 3 orn:fork 3 ||",
  };
