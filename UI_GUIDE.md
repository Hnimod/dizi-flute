# UI Guide — Dizi Flute Learning Platform

Agent-readable UI context. Updated after each phase that changes UI.

---

## Screen: Home Page (`/`)
**Feature:** course-navigation
**Purpose:** Course overview and entry point

```
┌─────────────────────────────────────────────────┐
│ [☰]                                    [🌙/☀️] │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │                                      │
│          │  Learn Dizi Flute                     │
│ Level 0  │  A structured self-study course...    │
│ Level 1  │                                      │
│ Level 2  │  ┌──────────┐  ┌──────────┐         │
│ Level 3  │  │ 0        │  │ 1        │         │
│ Level 4  │  │ Setup &  │  │ First    │         │
│ Level 5  │  │ Found.   │  │ Sounds   │         │
│ Level 6  │  │ Week 0   │  │ Wks 1-4  │         │
│ Level 7  │  └──────────┘  └──────────┘         │
│          │  ┌──────────┐  ┌──────────┐         │
│ ──────── │  │ 2        │  │ 3        │         │
│ Reference│  │ First    │  │ Folk     │         │
│ Library  │  │ Songs    │  │ Repert.  │         │
│          │  │ Wks 5-8  │  │ Mo 3-4   │         │
│          │  └──────────┘  └──────────┘         │
│          │  ... (8 cards total, 2x4 grid)       │
│          │  Each card shows a progress bar and   │
│          │  "X/Y completed" count below title    │
└──────────┴──────────────────────────────────────┘
```

**Interactions:**
- Click level card → navigates to `/level/:id`
- Sidebar links → same navigation
- Theme toggle in top-right switches dark/light
- On mobile: sidebar hidden, hamburger menu top-left
- Progress bars on each card update as songs/exercises are marked complete

---

## Screen: Level Page (`/level/:id`)
**Feature:** lesson-viewer
**Purpose:** Full lesson content for one level

```
┌──────────┬──────────────────────────────────────┐
│ Sidebar  │  Level 2 · Weeks 5-8 · CCOM Grade 1-2│
│          │  First Songs                          │
│          │  Full scale, simple songs, tonguing    │
│          │                                        │
│          │  ┌─ Progress ──────────────────┐       │
│          │  │ ████████░░░  5/11 completed │       │
│          │  └────────────────────────────-┘       │
│          │                                        │
│          │  ## Section Title                      │
│          │  Markdown prose content...             │
│          │                                        │
│          │  ┌─ Song Card ────────────────┐        │
│          │  │ 小星星 / Twinkle Twinkle   │ [✓]   │
│          │  │ Key: D · 4/4 · 80 BPM     │        │
│          │  │ ┌─ jianpu ──────────┐      │        │
│          │  │ │ 1 1 5 5 | 6 6 5 -│      │        │
│          │  │ └───────────────────┘      │        │
│          │  │ [▶ Audio Player  0.5x 1x]  │        │
│          │  └────────────────────────────┘        │
│          │                                        │
│          │  ← Previous Level    Next Level →      │
└──────────┴────────────────────────────────────────┘
```

**Interactions:**
- Progress bar shows completed items count out of total (songs + exercises)
- Checkbox on song/exercise cards toggles completion (persisted to localStorage)
- Audio player supports playback speed controls (0.5x, 0.75x, 1x)
- Jianpu notation rendered in monospace inside song cards
- "Previous Level" / "Next Level" buttons navigate between levels
- Markdown prose sections rendered with full formatting (headings, lists, bold, etc.)

---

## Screen: Reference Hub (`/reference`)
**Feature:** reference-library
**Purpose:** Hub listing all reference documents

```
┌──────────┬──────────────────────────────────────┐
│ Sidebar  │  Reference Library                    │
│          │  Quick-reference documents...          │
│          │                                        │
│          │  ┌──────────┐  ┌──────────┐           │
│          │  │ 🎵       │  │ 🔢       │           │
│          │  │ Fingering│  │ Jianpu   │           │
│          │  │ Charts   │  │ Guide    │           │
│          │  └──────────┘  └──────────┘           │
│          │  ┌──────────┐  ┌──────────┐           │
│          │  │ 📖       │  │ 🔧       │           │
│          │  │ Music    │  │ Mainten- │           │
│          │  │ Theory   │  │ ance     │           │
│          │  └──────────┘  └──────────┘           │
│          │  ... (6 cards, 2-col grid)            │
└──────────┴────────────────────────────────────────┘
```

**Interactions:**
- Click any reference card → navigates to `/reference/:slug`
- Cards display icon, title, and brief description
- 2-column responsive grid (stacks to 1-column on mobile)

---

## Screen: Reference Detail (`/reference/:slug`)
**Feature:** reference-library
**Purpose:** Individual reference doc viewer

```
┌──────────┬──────────────────────────────────────┐
│ Sidebar  │  ← Back to Reference Library          │
│          │  🎵 Fingering Charts                   │
│          │                                        │
│          │  Full markdown content rendered...     │
│          │  Tables, headings, lists, etc.         │
└──────────┴────────────────────────────────────────┘
```

**Interactions:**
- "Back to Reference Library" link returns to `/reference`
- Full markdown rendering with tables, headings, lists, code blocks
- Sidebar remains visible for navigation to other sections

---

## Layout: App Shell
**Components:** Sidebar (left, 256px) + Top bar (56px, theme toggle) + Content area

- Desktop (≥768px): Sidebar always visible
- Mobile (<768px): Sidebar hidden, hamburger menu opens slide-out drawer with backdrop overlay
