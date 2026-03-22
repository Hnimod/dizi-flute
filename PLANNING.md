# Dizi Flute Learning Platform - Implementation Plan

## Context

The `dizi-flute/` project contains a comprehensive 8-level dizi learning curriculum as markdown files, 62 MIDI/OGG practice audio files, and reference materials. This plan restructures it into an interactive React web application — a self-paced learning platform — while preserving the existing files as domain knowledge source.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tooling |
| React 18 + TypeScript | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling (dark mode via class strategy) |
| react-markdown + remark-gfm | Markdown rendering with table support |
| localStorage | Progress persistence |

No backend. No state management library. Hooks + context only.

---

## Target Project Structure

```
dizi-flute/
├── (existing .md, midi/, reference/, scripts/ — preserved as source)
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│
├── public/
│   ├── audio/
│   │   ├── level-1/  *.ogg
│   │   ├── level-2/  *.ogg
│   │   └── ...through level-7/
│   └── images/
│       └── d-key-dizi-included-chart.png
│
└── src/
    ├── main.tsx                    # Entry point, router setup
    ├── App.tsx                     # Root layout (sidebar + outlet)
    ├── index.css                   # Tailwind directives + globals
    │
    ├── types/
    │   └── index.ts                # All TypeScript interfaces
    │
    ├── data/
    │   ├── course.ts               # Philosophy, daily practice template, milestones
    │   ├── levels.ts               # 8 levels with metadata + markdown sections
    │   ├── songs.ts                # All 60+ songs: jianpu, audio paths, metadata
    │   ├── exercises.ts            # All exercises: jianpu, audio paths
    │   └── references.ts           # Reference doc content as markdown strings
    │
    ├── components/
    │   ├── Layout.tsx              # Shell: sidebar + main content area
    │   ├── Sidebar.tsx             # Level navigation + reference links
    │   ├── Breadcrumb.tsx          # Breadcrumb navigation
    │   ├── ThemeToggle.tsx         # Dark/light mode switch
    │   ├── LevelCard.tsx           # Level overview card for home page
    │   ├── ProgressBar.tsx         # Completion indicator bar
    │   ├── MarkdownRenderer.tsx    # react-markdown with custom components
    │   ├── AudioPlayer.tsx         # OGG playback: play/pause, speed, seek
    │   ├── SongCard.tsx            # Song display with embedded player
    │   ├── ExerciseBlock.tsx       # Jianpu display with embedded player
    │   ├── FingeringChart.tsx      # Fingering table/image display
    │   └── PracticeTimer.tsx       # Session timer (Phase 8)
    │
    ├── pages/
    │   ├── HomePage.tsx            # Course overview, level card grid
    │   ├── LevelPage.tsx           # Single level content view
    │   ├── ReferencePage.tsx       # Reference hub
    │   ├── ReferenceDetailPage.tsx # Individual reference doc
    │   └── PracticeLogPage.tsx     # Practice history (Phase 8)
    │
    ├── hooks/
    │   ├── useTheme.ts             # Dark/light theme state + localStorage
    │   ├── useProgress.ts          # Completion tracking + localStorage
    │   └── useAudioPlayer.ts       # Audio playback state
    │
    └── utils/
        ├── markdown.ts             # Markdown processing helpers
        └── progress.ts             # Progress calculation utilities
```

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Course overview with 8 level cards + progress |
| `/level/:id` | LevelPage | Full level content: prose, songs, exercises, audio |
| `/reference` | ReferencePage | Hub listing all reference documents |
| `/reference/:slug` | ReferenceDetailPage | Individual reference (fingering, jianpu, theory) |
| `/practice-log` | PracticeLogPage | Practice session history (Phase 8) |

---

## Data Model

```typescript
interface Level {
  id: number;                  // 0-7
  slug: string;                // "level-0-setup"
  title: string;               // "Setup & Foundations"
  subtitle: string;            // Short description
  timeline: string;            // "Week 0", "Months 3-4"
  ccomGrade: string;           // "Pre-Grade", "Grade 1-2", etc.
  sections: LevelSection[];
}

interface LevelSection {
  id: string;                  // "techniques", "songs", "exercises"
  title: string;
  content: string;             // Markdown prose for this section
  items: (Song | Exercise)[];  // Trackable items within
}

interface Song {
  id: string;                  // "level-2-song-05-xiao-xing-xing"
  type: 'song';
  levelId: number;
  titleChinese?: string;       // "小星星"
  titleEnglish: string;        // "Twinkle Twinkle Little Star"
  key: string;                 // "D"
  timeSignature: string;       // "4/4"
  tempo?: number;
  jianpu: string;              // Raw jianpu notation
  description?: string;
  audioPath?: string;          // "/audio/level-2/05-xiao-xing-xing.ogg"
  origin?: string;             // "Chinese folk", "Vietnamese folk", "Western"
}

interface Exercise {
  id: string;
  type: 'exercise';
  levelId: number;
  title: string;
  key: string;
  timeSignature: string;
  jianpu: string;
  audioPath?: string;
}

interface ReferenceDoc {
  slug: string;                // "fingering-charts"
  title: string;
  description: string;
  content: string;             // Full markdown
}

interface UserProgress {
  completedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
  theme: 'light' | 'dark';
}
```

---

## Content Strategy

**Hybrid approach:**
- **Prose/theory** → kept as markdown strings in `LevelSection.content`, rendered by `react-markdown` at runtime
- **Songs/exercises** → extracted as typed objects (`Song`, `Exercise`) with jianpu in a dedicated field — enables progress tracking + audio embedding
- **References** → full markdown strings in `references.ts`
- **Audio** → OGG files served from `public/audio/` (no browser MIDI playback — too complex, OGG plays natively)

---

## Implementation Phases

---

### Phase 1: Project Scaffolding

**Goal:** Vite app running with Tailwind, routing, and a visible layout shell.

**Files to create:**
- `package.json` — deps: react, react-dom, react-router, react-markdown, remark-gfm; devDeps: vite, typescript, tailwindcss, postcss, autoprefixer
- `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `tailwind.config.ts`, `postcss.config.js`
- `index.html`
- `src/main.tsx` — router setup with all routes
- `src/App.tsx` — root layout wrapper
- `src/index.css` — Tailwind directives
- `src/types/index.ts` — all interfaces
- `src/components/Layout.tsx` — sidebar + content area shell
- `src/components/Sidebar.tsx` — level list + reference links
- `src/components/ThemeToggle.tsx` — dark/light toggle
- `src/components/Breadcrumb.tsx`
- `src/hooks/useTheme.ts` — theme state + localStorage
- `src/pages/HomePage.tsx` — placeholder with level list
- `src/pages/LevelPage.tsx` — placeholder showing level ID

**How to verify:**
```bash
npm install && npm run dev
```
- App loads at `localhost:5173`
- Sidebar shows all 8 levels (0-7) as navigation links
- Clicking a level navigates to `/level/0`, `/level/1`, etc.
- Theme toggle switches between dark and light mode
- Browser refresh preserves theme choice

---

### Phase 2: Data Layer

**Goal:** All course content extracted into typed TypeScript data files.

**Files to create:**
- `src/data/course.ts` — extracted from `README.md`: philosophy points, daily practice template, milestones
- `src/data/levels.ts` — extracted from `level-0-setup.md` through `level-7-advanced.md`: metadata + sections with markdown prose
- `src/data/songs.ts` — all 60+ songs extracted with jianpu, audio paths, metadata, origin
- `src/data/exercises.ts` — all exercises extracted with jianpu, audio paths
- `src/data/references.ts` — extracted from `reference/*.md`: fingering charts, jianpu guide, music theory, maintenance, resources

**Source files to parse:**
| Data file | Source markdown |
|-----------|---------------|
| `course.ts` | `README.md` |
| `levels.ts` | `level-0-setup.md` through `level-7-advanced.md` |
| `songs.ts` | Song sections from each level file |
| `exercises.ts` | Exercise sections from each level file |
| `references.ts` | `reference/fingering-charts.md`, `jianpu-guide.md`, `music-theory.md`, `maintenance.md`, `resources.md` |

**How to verify:**
- Add a temporary debug route or use browser console:
  ```javascript
  import { levels } from './data/levels';
  console.log(levels.length);        // → 8
  console.log(levels[2].title);      // → "First Songs"
  ```
- Song count across all levels matches the ~60+ songs in the markdown files
- Exercise audio paths map to real files in `midi/` directories

---

### Phase 3: Home Page + Level Pages

**Goal:** Full course navigation with rendered markdown content.

**Files to create/update:**
- `src/components/LevelCard.tsx` — card displaying: level number, title, timeline, CCOM grade, subtitle
- `src/components/MarkdownRenderer.tsx` — `react-markdown` with `remark-gfm`, custom renderers for: headings (anchor IDs), tables (styled + scrollable), code blocks (monospace), links (external → new tab)
- Update `src/pages/HomePage.tsx` — grid of 8 `LevelCard` components
- Update `src/pages/LevelPage.tsx` — fetches level by ID from data, renders sections with `MarkdownRenderer`

**How to verify:**
- Home page shows 8 level cards in a responsive grid
- Each card shows: level number, title, timeline (e.g., "Weeks 1-4"), CCOM grade
- Click Level 2 → navigates to `/level/2`
- Level page shows all sections with properly formatted:
  - Headings with correct hierarchy
  - Tables (fingering tables, song lists) — rendered with borders, readable
  - Code blocks (jianpu notation) — monospace, properly spaced
  - Links working

---

### Phase 4: Audio Playback

**Goal:** Every song/exercise with an OGG file has a working audio player inline.

**Pre-requisite:** Generate any missing OGG files using `scripts/generate_midi.py` + timidity.

**Files to create/update:**
- Copy all `.ogg` files from `midi/level-*/` to `public/audio/level-*/`
- `src/components/AudioPlayer.tsx` — HTML5 `<audio>` wrapper with:
  - Play/pause button
  - Progress bar with seek (click to jump)
  - Current time / duration display
  - Speed control: 0.5x, 0.75x, 1x, 1.25x, 1.5x buttons
- `src/hooks/useAudioPlayer.ts` — playback state management
- `src/components/SongCard.tsx` — displays song: Chinese title, English title, origin, jianpu notation, embedded `AudioPlayer`
- `src/components/ExerciseBlock.tsx` — displays exercise: title, jianpu, embedded `AudioPlayer`
- Update `LevelPage.tsx` to render `SongCard` and `ExerciseBlock` for items in each section

**How to verify:**
- Navigate to Level 2
- Find 小星星 (Twinkle Twinkle Little Star)
- Press play → hear pan flute audio
- Click 0.5x speed → audio plays at half speed
- Seek bar works — click middle → jumps to middle
- Songs without OGG files show no player (graceful absence)

---

### Phase 5: Reference Section

**Goal:** All reference materials accessible and well-formatted.

**Files to create:**
- Copy `reference/d-key-dizi-included-chart.png` to `public/images/`
- `src/pages/ReferencePage.tsx` — hub page listing all reference docs as cards with title + description
- `src/pages/ReferenceDetailPage.tsx` — renders individual reference markdown via `MarkdownRenderer`
- Update router to include `/reference` and `/reference/:slug` routes
- Update `Sidebar.tsx` to include reference section links

**Reference documents:**
| Slug | Title | Source |
|------|-------|--------|
| `fingering-charts` | Fingering Charts | `reference/fingering-charts.md` |
| `jianpu-guide` | Jianpu Notation Guide | `reference/jianpu-guide.md` |
| `music-theory` | Music Theory | `reference/music-theory.md` |
| `maintenance` | Dizi Care & Maintenance | `reference/maintenance.md` |
| `resources` | Resources & Links | `reference/resources.md` |

**How to verify:**
- Click "Reference" in sidebar → shows 5 reference doc cards
- Click "Fingering Charts" → renders complex tables correctly with all fingering data
- D-key chart PNG image displays
- Click "Jianpu Guide" → notation examples render in monospace
- External links in Resources page open in new tabs

---

### Phase 6: Progress Tracking

**Goal:** Users can mark songs/exercises complete; progress persists across sessions.

**Files to create/update:**
- `src/hooks/useProgress.ts` — `{ completedItems, toggleItem, isCompleted, getLevelProgress }`; reads/writes `localStorage`
- `src/utils/progress.ts` — `calculateLevelProgress(levelId, completedItems, songs, exercises) → { completed, total, percent }`
- `src/components/ProgressBar.tsx` — horizontal bar showing completion percentage
- Update `SongCard.tsx` — add completion checkbox, calls `toggleItem`
- Update `ExerciseBlock.tsx` — add completion checkbox
- Update `LevelCard.tsx` — show `ProgressBar` with level completion
- Update `HomePage.tsx` — show overall course progress summary

**How to verify:**
- Navigate to Level 2
- Check the checkbox on 3 different songs → checkmarks appear
- Navigate away to home page → Level 2 card shows "3/N completed" with progress bar
- Reload the browser (F5) → navigate back to Level 2 → same 3 songs still checked
- Uncheck a song → progress updates immediately

---

### Phase 7: Responsive Design + Polish

**Goal:** App works well on mobile (phone held during practice) and desktop.

**Changes:**
- `Sidebar.tsx` — hamburger menu icon on mobile, slide-out drawer with overlay
- `AudioPlayer.tsx` — larger touch targets (min 44px), bigger play button
- `MarkdownRenderer.tsx` — tables wrapped in horizontal scroll container
- Exercise/jianpu blocks — appropriate font sizing, no awkward line wrapping
- `Layout.tsx` — proper padding/margins for mobile
- Overall — smooth transitions, consistent spacing, readable at all sizes

**How to verify:**
- Open browser DevTools → toggle device toolbar
- Test at 375px width (iPhone SE):
  - Sidebar hidden, hamburger icon visible
  - Tap hamburger → sidebar slides in
  - Audio player buttons large enough to tap
  - Tables scroll horizontally
  - Jianpu notation readable without horizontal scroll (or scrolls gracefully)
- Test at 768px (iPad): sidebar visible, content fills remaining space
- Test at 1280px (desktop): full layout, comfortable reading width

---

### Phase 8 (Optional): Practice Timer + Log

**Goal:** Guided practice sessions following the daily template from README.

**Files to create:**
- `src/components/PracticeTimer.tsx` — timer cycling through practice sections:
  1. Breathing exercises (5 min)
  2. Long tones (8 min)
  3. Technique drills (7 min)
  4. New material (10 min)
  5. Review repertoire (10 min)
- `src/pages/PracticeLogPage.tsx` — list of past practice sessions with dates, durations
- Extend `useProgress.ts` — `practiceLog: { date, durationMinutes, levelId }[]`

**How to verify:**
- Click "Start Practice" → timer starts at "Breathing — 5:00"
- Timer counts down → at 0:00 moves to "Long Tones — 8:00"
- Can skip sections or pause
- After completing (or stopping), session saved to practice log
- Navigate to Practice Log page → see today's entry

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| OGG only, no browser MIDI | MIDI playback requires synthesizer lib (Tone.js/MIDI.js) — too complex. OGG plays natively. |
| Content as TypeScript imports | Static imports: type safety, zero-latency navigation, ~130KB total — well within bundle limits. |
| Hybrid content model | Prose as markdown (flexibility) + songs/exercises as typed objects (enables tracking + audio). |
| No state management library | Only 2 pieces of global state (theme, progress) — context + hooks sufficient. |
| Tailwind dark mode via class | Pairs with localStorage toggle, full control over dark palette. |

---

## Critical Source Files

These files are the primary sources for content extraction:

| File | Used For |
|------|----------|
| `README.md` | Course philosophy, daily practice template, milestones → `course.ts` |
| `level-0-setup.md` through `level-7-advanced.md` | All lesson content → `levels.ts`, `songs.ts`, `exercises.ts` |
| `reference/fingering-charts.md` | Fingering tables → `references.ts` |
| `reference/jianpu-guide.md` | Notation guide → `references.ts` |
| `reference/music-theory.md` | Theory reference → `references.ts` |
| `reference/maintenance.md` | Dizi care guide → `references.ts` |
| `reference/resources.md` | External links → `references.ts` |
| `scripts/generate_midi.py` | Jianpu encoding reference + generate missing OGGs |
| `midi/README.md` | Audio file naming conventions |
