import type { Technique } from "@/shared/types";

export const technique: Technique = {
    id: "grace-note",
    name: "Grace Notes (装饰音)",
    category: "ornaments",
    level: 3,
    description: "Quick ornamental notes before the main note. Adds characteristic Chinese flavor to dizi playing. Grace notes 'steal' time from the main note, not from the previous note.",
    content: `## What are Grace Notes?

**Everyday analogy:** Think of a running start before a jump. You take a quick step or two to build momentum, then launch into the jump. The jump is the main event — the run-up just gives it energy. Grace notes are that run-up: quick preparatory notes that give the main note momentum and color.

Grace notes (装饰音, zhuāngshì yīn) are very short notes played just before the main note. They add color and expressiveness — a plain melody becomes characteristically "Chinese" with grace notes. They are the single most important category of dizi ornament.

**What you'll hear:** The main note arrives with a tiny "scoop" or "flick" of pitch before it — like the note has a little running start. The grace notes themselves are so fast they blur together, and the main note is what you really hear. The effect is warmth, liveliness, and that unmistakable Chinese flute character.

## How Timing Works (Important!)

Grace notes **"steal" time from the main note, not from the previous note.** This means:

- The main note arrives **slightly late** — the grace notes eat into its time
- The previous note holds for its full value, ending exactly on time
- Example: if note 3 falls on beat 2, the grace note (2) starts right on beat 2, and note 3 arrives a fraction after beat 2
- This is the opposite of some Western classical interpretations where grace notes borrow from the previous note

In practice, the time "stolen" is so tiny (under 0.1 seconds) that you barely notice the main note is late. But getting this right makes your ornaments sound natural.

## How to Do It

1. The grace note is played as quickly as possible — it has no real rhythmic value
2. Immediately transition to the main note, which gets (almost) the full beat
3. The grace note should be heard but not dwelled on
4. Common patterns: one note above or below the main note
5. The finger for the grace note moves **fast on, fast off** — a flick, not a press

## Types

- **Single grace note:** one quick note → main note. Written as \`(2)3\` = quick 2, then 3
- **Double grace note:** two quick notes → main note. Written as \`(2)(3)5\` = quick 2, quick 3, then 5
- **Grace from above:** the grace note is higher than the main note — adds brightness
- **Grace from below:** the grace note is lower than the main note — adds warmth

## Common Mistakes

- **Making grace notes too long:** If the grace note sounds like a real note with its own beat, it's too slow. It should be a flash — barely there.
- **Stealing time from the previous note:** The previous note should end on time. The grace note and main note share the main note's time slot.
- **Adding grace notes everywhere:** Too many grace notes sound cluttered. Use them to highlight important melody notes, not on every single note.
- **Inconsistent speed:** All your grace notes should be approximately the same speed. Inconsistency sounds sloppy.
- **Tongue-attacking the grace note:** The grace note should flow smoothly into the main note. Don't tongue each one separately unless specifically marked.

## Practice Progression

### Week 1: Single grace notes, slowly
- Play note 3 normally. Now play (2)3 — a quick 2 before landing on 3.
- Start at a speed where you can hear both notes, then gradually make the grace note shorter.
- Goal: the grace note becomes a flash, and 3 is clearly the main event.

### Week 2: On every scale degree
- Practice (1)2, (2)3, (3)5, (5)6, (6)1' — grace notes from below on each note.
- Then practice from above: (3)2, (5)3, (6)5, (1')6.

### Week 3: Double grace notes
- Practice (2)(3)5, (3)(5)6 — two grace notes before the main note.
- Both grace notes should be equally fast — don't linger on the first one.

### Week 4: In songs
- Take a simple melody you know and add grace notes where the melody feels plain.
- Start with just 2-3 grace notes per phrase. Less is more.

## In Notation

Grace notes appear as small numbers in parentheses before the main note.`,
    notationExample: "(2)3 - (5)6 - | (2)(3)5 - - - ||",
  };
