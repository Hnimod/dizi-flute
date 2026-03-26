import type { Technique } from "@/shared/types";

export const technique: Technique = {
    id: "ornament-combo",
    name: "Ornament Combinations",
    category: "ornaments",
    level: 4,
    description: "When to use which ornament: 叠/打 at note starts, 赠 at note ends, vibrato on sustained notes. The decision-making guide for musical ornamentation.",
    content: `## What are Ornament Combinations?

Real dizi music rarely uses just one ornament type. Skilled players mix 叠音, 打音, grace notes, 赠音, and 波音 fluidly. The challenge for beginners isn't *how* to play each ornament — it's knowing **when** to use which one.

This guide gives you a decision-making framework so you're not just guessing.

## The Decision Guide: Which Ornament, When?

### At the START of a note → use 叠音 (dié) or 打音 (dǎ)

These are your "note starters." They replace or supplement tonguing to begin a note with character.

- **叠音 (from above):** A quick flick of the finger *above* the target note. Use when the melody is descending or staying level. Sounds gentle and elegant.
- **打音 (from below):** A quick flick of the finger *below* the target note. Use when the melody is ascending. Sounds slightly more percussive.

> **How to choose between them:** If you're coming from a higher note, use 叠. If coming from a lower note, use 打. When in doubt, 叠 is the safer default — it's more common and more versatile.

### At the END of a note → use 赠音 (zèng)

赠音 ("gift note") is a quick grace note added just before releasing a note. It gives the note a clean, intentional ending instead of just fading away. Think of it as a "send-off."

- Typically the 赠 note is one scale degree above or below the main note
- It's very brief — almost like a flick right as you stop the note
- Use it at the end of phrases or before rests

### On a SUSTAINED note → use vibrato (腹震音) or trill (颤音)

Long held notes sound lifeless without movement. Add life with:
- **Vibrato (腹震音):** Gentle pulsing from the diaphragm. Use on lyrical, expressive passages.
- **Trill (颤音/波音):** Rapid finger oscillation. Use for energy and shimmer, especially in faster pieces.

### On REPEATED same notes → alternate 叠 and 打

If the melody has the same note two or more times in a row (e.g., 3 3 3 3), playing them all with plain tonguing sounds monotonous. Instead:
- First note: 叠
- Second note: 打
- Third note: plain or 叠
- This creates variety and keeps the phrase alive

## The Golden Rule

**1-2 ornaments per phrase. Never ornament every note.**

Beginners tend to add ornaments everywhere once they learn them. This clutters the music and exhausts the listener. A well-placed ornament on a key melody note is worth far more than decorating every beat.

Ask yourself: "Does this note *need* decoration, or is it fine on its own?" If you're not sure, leave it plain.

## How to Practice

1. Take a simple melody you know well (like 茉莉花 or 小星星)
2. First play it completely plain — no ornaments at all
3. Identify the **most important notes** in each phrase (usually the first note and the highest note)
4. Add ONE ornament to each important note using the decision guide above
5. Play through and listen: does it sound musical? Or cluttered?
6. Adjust: remove any ornament that doesn't add beauty
7. Listen to recordings of dizi masters (e.g., 俞逊发, 陆春龄) and notice how sparingly they ornament — then imitate their choices

## Quick Reference

| Situation | Ornament | Example |
|-----------|----------|---------|
| Start of a note (descending) | 叠音 (dié) | (6)5 — flick 6 before landing on 5 |
| Start of a note (ascending) | 打音 (dǎ) | (2)3 — flick 2 before landing on 3 |
| End of a note / before rest | 赠音 (zèng) | 5(6) — flick 6 as you release 5 |
| Long sustained note | Vibrato or trill | 5~~~ — pulse or oscillate |
| Repeated same note | Alternate 叠/打 | (6)5 (4)5 — variety |`,
    notationExample: "(2)3 die 5 da 3 - | bo 6 - (5)6 die 5 ||",
  };

  // ── Breathing ──;
