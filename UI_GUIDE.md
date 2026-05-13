# UI Guide — Dizi Flute

Screen descriptions for each page in the app.

## Navigation

**Desktop:** Left sidebar (Songs, Techniques, Knowledge) + top bar (Login, Theme toggle)
**Mobile:** Bottom tab bar (Songs, Techniques, Knowledge) + top bar (app name, Login, Theme toggle)

---

## Home — Song Library (`/`)

```
┌─────────────────────────────────────┐
│  Songs                 [Expand all] │
├─────────────────────────────────────┤
│  🔍 Search songs...                │
│  [All] [Favorites]      [Difficulty]│
├─────────────────────────────────────┤
│  ── BEGINNER · 1/10 ──       [▼]   │
│  ┌─────────────────────────────┐    │
│  │ 玛丽有只小羊羔 / Mary Had...│ ♡ ▼│
│  │ Key: D · Time: 4/4         │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ Hot Cross Buns              │ ♡ ▼│
│  └─────────────────────────────┘    │
│                                     │
│  ── ELEMENTARY · 3/10 ──     [▼]   │
│  ┌─────────────────────────────┐    │
│  │ 小白菜 / Little White...   │ ♡ ▼│
│  └─────────────────────────────┘    │
│                                     │
│  ── ADVANCED · 7/10 ──       [▼]   │
│  ┌─────────────────────────────┐    │
│  │ 浮光 / Fu Guang             │ ♡ ▼│
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

- Songs grouped by difficulty with subtle centered dividers
- Dividers are collapsible (click to toggle)
- Each song row: title, metadata (key, time, tempo, origin), heart (favorite), expand chevron
- Expanded row shows jianpu with standard header + "Go to details" link
- Expand/collapse all button in header
- Search filters across all title fields + origin
- Filter pills: All, Favorites
- Difficulty dropdown: multi-select filter
- Favorites section appears at top when any songs are favorited
- Song expand/collapse state persists in localStorage

---

## Song Detail (`/song/:songId`)

```
┌─────────────────────────────────────┐
│  ← Back                            │
│                                     │
│  月亮代表我的心 / The Moon...    ♡  │
│  [3/10 · Elementary]                │
│  Sustained notes need breath...     │
│  Key: D · Time: 4/4 · 72 BPM       │
│  Origin: Teresa Teng, 1977          │
│                                     │
│  Description text...                │
│                                     │
│  Techniques: [Pentatonic] [Tonguing]│
│              (clickable → /tech/id) │
│                                     │
│  [YouTube embed if videoUrls]       │
│                                     │
│  ┌─ Controls ────────────────────┐  │
│  │  ▶ Play  ■ Stop  ♩=72 [-][+]│  │
│  │                    [≡ Staff] │  │
│  └───────────────────────────────┘  │
│  ┌─ Notation ────────────────────┐  │
│  │        月亮代表我的心          │  │
│  │       Teresa Teng, 1977       │  │
│  │  1=D  4/4  ♩=72              │  │
│  │                               │  │
│  │  [Staff: treble clef, ## 4/4] │  │ ← Only when Staff toggle ON
│  │  𝅘𝅥 𝅘𝅥  𝅗𝅥 | 𝅘𝅥 𝅘𝅥  𝅗𝅥         │  │
│  │                               │  │
│  │  ( 1 1 ) 1 - | ( 3 5 ) 6 -  │  │ ← Jianpu aligned with staff
│  │  ...                          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

- Difficulty badge with label + difficultyNote below
- Technique pills link to `/techniques/:id`
- **Staff toggle** in playback controls shows/hides Western staff notation above jianpu
- When Staff is ON: VexFlow renders treble clef, key sig, time sig, notes, beams, slurs, bar lines; jianpu below is repositioned to align with staff note positions
- When Staff is OFF: jianpu-only view with default spacing
- TempoGuide provides playback controls (play, stop, BPM adjust, beat counter)
- Playback beat highlighting works on jianpu regardless of staff toggle

---

## Techniques (`/techniques`)

```
┌─────────────────────────────────────┐
│  Techniques                         │
│  Learn dizi techniques...           │
│                                     │
│  [All][Fundamentals][Articulation]  │
│  [Ornaments][Breathing][Fingering]  │
│  [Advanced]                         │
│                                     │
│  ── Fundamentals ──                 │
│  [L1] Long Tones (长音)        2 ex │
│       Sustaining each note...    → │
│  [L1] Scale Walking            3 ex│
│                                     │
│  ── Articulation ──                 │
│  [L1] Single Tonguing (吐音)   2 ex│
│  [L4] Double Tonguing (双吐)   1 ex│
│  ...                                │
└─────────────────────────────────────┘
```

- Techniques grouped by category
- Each card: level badge, name, description, exercise count, arrow
- Filter pills for categories
- Sorted by level within each category

---

## Technique Detail (`/techniques/:id`)

```
┌─────────────────────────────────────┐
│  ← Back                            │
│  [Level 3] [ornaments]              │
│  Grace Notes (装饰音)               │
│  Quick ornamental notes before...   │
│                                     │
│  [📖 Read more in Knowledge]        │
│                                     │
│  ── Practice Exercises ──           │
│  ┌───────────────────────────────┐  │
│  │ Grace Note Practice           │  │
│  │ Key: D · Time: 4/4           │  │
│  │ Numbers in parentheses are... │  │
│  │ [jianpu notation]            │  │
│  └───────────────────────────────┘  │
│                                     │
│  ── Songs Using This Technique ──   │
│  [3/10] 小白菜 / Little White...  →│
│  [7/10] 浮光 / Fu Guang           →│
└─────────────────────────────────────┘
```

- Technique info: name, level, category, description
- Link to knowledge article if referenceSlug exists
- Exercise cards with jianpu notation (no completion checkbox)
- Related songs list linking back to song detail

---

## Knowledge (`/knowledge`)

```
┌─────────────────────────────────────┐
│  Knowledge                          │
│  Fingerings, notation, theory...    │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │ 🎵        │  │ 📖        │        │
│  │ Fingering │  │ Jianpu   │        │
│  │ Charts    │  │ Guide    │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │ 🎶        │  │ ...      │        │
│  │ Theory    │  │          │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
```

- Card grid (1 col mobile, 2 col desktop)
- Each card: icon, title, description
- Links to `/knowledge/:slug`

---

## Knowledge Detail (`/knowledge/:slug`)

- Back link to Knowledge hub
- Icon + title
- Markdown rendered content (tables, headings, code blocks)

