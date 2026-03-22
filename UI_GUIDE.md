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
└──────────┴──────────────────────────────────────┘
```

**Interactions:**
- Click level card → navigates to `/level/:id`
- Sidebar links → same navigation
- Theme toggle in top-right switches dark/light
- On mobile: sidebar hidden, hamburger menu top-left

---

## Screen: Level Page (`/level/:id`)
**Feature:** lesson-viewer
**Purpose:** Full lesson content for one level
**Status:** Placeholder — content rendering in Phase 3

```
┌──────────┬──────────────────────────────────────┐
│ Sidebar  │  Level 2                              │
│          │  Content will be loaded from data...   │
│          │                                        │
└──────────┴──────────────────────────────────────┘
```

---

## Screen: Reference Hub (`/reference`)
**Feature:** reference-library
**Purpose:** Hub listing all reference documents
**Status:** Placeholder — content in Phase 5

---

## Screen: Reference Detail (`/reference/:slug`)
**Feature:** reference-library
**Purpose:** Individual reference doc viewer
**Status:** Placeholder — content in Phase 5

---

## Layout: App Shell
**Components:** Sidebar (left, 256px) + Top bar (56px, theme toggle) + Content area

- Desktop (≥768px): Sidebar always visible
- Mobile (<768px): Sidebar hidden, hamburger menu opens slide-out drawer with backdrop overlay
