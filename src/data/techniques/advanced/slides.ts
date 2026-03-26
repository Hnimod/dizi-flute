import type { Technique } from "@/shared/types";

export const technique: Technique = {
    id: "slides",
    name: "Slides (滑音)",
    category: "advanced",
    level: 5,
    description: "Gradually sliding finger on/off a hole for smooth pitch changes between notes.",
    content: `## What are Slides?

Slides (滑音, huá yīn) create a smooth, continuous pitch change between two notes — like a singer sliding between pitches. On the dizi, this is done by gradually covering or uncovering a tone hole.

## Types

- **Slide up (上滑音):** Start low, slide finger off the hole to go higher
- **Slide down (下滑音):** Start high, slide finger onto the hole to go lower

## How to Do It

1. Start on the first note normally
2. Slowly slide your finger off (up) or onto (down) the next hole
3. The pitch should change continuously — no steps
4. Coordinate with embouchure: slight adjustment may be needed during the slide

## How to Practice

- Start with slow slides between adjacent notes: 5 → 6 (slide up)
- The slide should take 1-2 beats at first
- Listen for smoothness — any "steps" in the pitch mean the finger moved too fast
- Practice both directions: up and down
- Apply to songs: slides between melody notes add expressiveness

## In Notation

Slides are marked with a curved arrow between notes.`,
    notationExample: "5 - su 6 - | 6 - sd 5 - ||",
  };
