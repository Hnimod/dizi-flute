import type { Technique } from "@/shared/types";

export const technique: Technique = {
    id: "fork-fingering",
    name: "叉口 (Fork Fingering)",
    category: "fingering",
    level: 2,
    description: "Alternate fingerings with open holes between closed ones, producing a different tone color on the same note.",
    referenceSlug: "fingering-charts",
    content: `## What is Fork Fingering?

Fork fingering (叉口, ch\u0101 k\u01D2u, also written 叉指) means using a fingering where an **open hole sits between closed holes** \u2014 like the tines of a fork. It's called "cross fingering" in Western flute terminology.

### Standard vs. Fork Fingering

On a dizi, standard fingerings open holes **sequentially from the top**. For example, to go from low to high, you lift fingers one by one starting from the top hole:

\`\`\`
Standard 5 (Sol):  \u25CF\u25CF\u25CF\u25CF\u25CF\u25CF  (all closed)
Standard 6 (La):   \u25CF\u25CF\u25CF\u25CF\u25CF\u25CB  (top hole open)
Standard 7 (Ti):   \u25CF\u25CF\u25CF\u25CF\u25CB\u25CB  (top two open)
\u2026and so on
\`\`\`

Fork fingering **breaks this pattern** \u2014 you have a gap:

\`\`\`
Fork example:      \u25CF\u25CB\u25CF\u25CF\u25CF\u25CF  (second hole open, rest closed)
Another fork:      \u25CB\u25CF\u25CF\u25CB\u25CB\u25CB  (bottom closed, gap, top open)
\`\`\`

The "fork" shape (closed-open-closed) is what gives it the name.

## Why Does This Exist?

When you create a gap in the fingering, the air column inside the dizi vibrates differently. This produces:

- **A slightly different tone color** \u2014 often darker, warmer, or more muffled than the standard fingering for the same note
- **The same pitch** (or very close to it) \u2014 fork fingering is not about playing different notes, it's about playing the **same note with a different sound**

Think of it like speaking the same word in a different tone of voice \u2014 the meaning is the same, but the feeling changes.

## When Do You Encounter Fork Fingering?

### In beginner pieces like \u8001\u516D\u677F (Old Six Beats)

You'll see \`fork\` (or \u53C8) marked above certain notes. This tells the player: "use the alternate fingering here for a softer/different tone color." **For beginners, this is entirely optional.** You can play every note with standard fingering and the melody sounds perfectly fine. The fork marks are suggestions for adding nuance once you're comfortable with the basic melody.

### Common situations where fork fingering is used

1. **Tone color contrast** \u2014 Alternating standard and fork fingering on repeated notes creates a subtle tonal variation that makes the music more expressive
2. **Smoother transitions** \u2014 Sometimes a fork fingering makes it easier to move between two notes because fewer fingers need to move
3. **Fast passages** \u2014 When half-hole fingerings (partially covering a hole) are too difficult at speed, a fork fingering can substitute
4. **Chromatic notes** \u2014 Some sharps and flats (\u266F/\u266D) can only be played with fork fingerings

## Is There a Fixed Standard-to-Fork Mapping?

**No.** Unlike standard fingerings which have a definitive chart, fork fingerings do not have a single "correct" alternative for each note. Here's why:

- **Multiple options per note** \u2014 The same pitch can often be produced by several different fork fingerings, each with a slightly different tone color
- **Dizi-key dependent** \u2014 A fork fingering that works well on a D-key dizi may not map the same way on a G-key or C-key dizi
- **Pitch isn't always exact** \u2014 Fork fingerings often produce a slightly sharper or flatter version of the note, requiring embouchure and breath adjustment to stay in tune
- **Regional tradition** \u2014 Northern dizi (bangdi) and southern dizi (qudi) traditions may use different fork fingerings for the same musical passage

When you see \`fork\` (\u53C8) marked in notation, it means **"use an alternate fingering here"** \u2014 the specific fingering is left to the player based on their instrument, their teacher's guidance, and the musical context. This is why fork fingering is learned through practice and imitation rather than from a chart.

## How to Practice

1. **Play a note with standard fingering**, listen carefully to its sound
2. **Play the same note with a fork fingering**, notice how the tone changes
3. **Alternate between them** \u2014 standard, fork, standard, fork \u2014 train your ear to hear the difference
4. **Don't force it** \u2014 if you're still learning basic fingerings, come back to fork fingering later. It's a refinement, not a requirement.

## In Notation

Fork fingering is marked with **\u53C8** above the note. In notation: \`fork\` before the note.

Example: \`fork 5\` means "play Sol using the fork fingering."`,
    notationExample: "fork 5 - fork 3 - | 5 fork 5 3 fork 3 ||",
  };
