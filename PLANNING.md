# Dizi Flute Learning Platform - Implementation Plan

## Context

The `dizi-flute/` project contains a comprehensive 8-level dizi learning curriculum as markdown files, 62 MIDI/OGG practice audio files, and reference materials. This plan restructures it into an interactive React web application designed for **autonomous AI agent development** — the source markdown files serve as the PRD, the codebase is organized into isolated feature modules, and the CLAUDE.md provides instant agent context for task decomposition.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tooling |
| React 18 + TypeScript | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling (dark mode via class strategy) |
| react-markdown + remark-gfm | Markdown rendering with table support |
| Zustand | State management (theme, progress, audio) |
| localStorage | Persistence (via Zustand persist middleware) |

No backend. Zustand stores replace React context for global state.

---

## Architecture: Three-Layer + Feature Modules

```
┌─────────────────────────────────────────────┐
│  app/          (thin shell: routes + providers) │
├─────────────────────────────────────────────┤
│  features/     (self-contained modules)         │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ course-  │ │ lesson-  │ │ reference-   │   │
│  │ nav      │ │ viewer   │ │ library      │   │
│  └──────────┘ └──────────┘ └──────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ audio-   │ │ progress-│ │ practice-    │   │
│  │ playback │ │ tracking │ │ timer        │   │
│  └──────────┘ └──────────┘ └──────────────┘   │
│  ┌──────────┐                                   │
│  │ theme    │                                   │
│  └──────────┘                                   │
├─────────────────────────────────────────────┤
│  data/         (content layer from source .md)  │
├─────────────────────────────────────────────┤
│  shared/       (primitives, zero business logic)│
└─────────────────────────────────────────────┘
```

**Dependency rules (strict, one-way):**
- `shared/` → depends on nothing
- `data/` → depends on `shared/types/` only
- `features/*` → depends on `shared/` and `data/`; may import other features ONLY via their `index.ts`
- `app/` → imports from `features/` (route components); no providers needed (Zustand stores are self-contained)

---

## Project Structure

```
dizi-flute/
├── CLAUDE.md                          # Agent entry point (architecture + task decomposition)
├── UI_GUIDE.md                        # Agent-readable UI context (ASCII sketches of every screen)
├── PLANNING.md                        # This file
├── feature-manifest.json              # Machine-readable feature registry
├── README.md                          # Course intro (source content)
│
├── level-0-setup.md ... level-7-advanced.md   # Source PRD (preserved)
├── reference/                                  # Source reference docs
├── midi/                                       # Source audio files
├── scripts/                                    # MIDI generation
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
│
├── public/
│   ├── audio/level-{1..7}/*.ogg
│   └── images/*.png
│
└── src/
    ├── main.tsx                        # Entry: mounts App
    ├── index.css                       # Tailwind directives only
    │
    ├── app/                            # Thin orchestration shell
    │   ├── App.tsx                     # Root layout: sidebar + <Outlet/>
    │   └── routes.tsx                  # All route definitions
    │
    ├── shared/                         # Shared primitives (NO business logic)
    │   ├── types/
    │   │   └── index.ts                # Level, Song, Exercise, ReferenceDoc, UserProgress
    │   ├── ui/
    │   │   ├── AudioPlayer.tsx         # Reusable audio player
    │   │   ├── MarkdownRenderer.tsx    # react-markdown wrapper
    │   │   ├── ProgressBar.tsx         # Generic progress bar
    │   │   └── Checkbox.tsx            # Styled checkbox
    │   └── utils/
    │       └── markdown.ts             # Markdown processing helpers
    │
    ├── data/                           # Content layer (derived from source .md)
    │   ├── course.ts                   # Philosophy, practice template, milestones
    │   ├── levels.ts                   # 8 levels: metadata + prose sections
    │   ├── songs.ts                    # All songs: jianpu + audio paths
    │   ├── exercises.ts                # All exercises: jianpu + audio paths
    │   └── references.ts              # Reference doc content
    │
    └── features/
        ├── course-navigation/
        │   ├── index.ts                # Exports: HomePage, LevelCard, Sidebar
        │   ├── HomePage.tsx
        │   ├── LevelCard.tsx
        │   └── Sidebar.tsx
        │
        ├── lesson-viewer/
        │   ├── index.ts                # Exports: LevelPage, SongCard, ExerciseBlock
        │   ├── LevelPage.tsx
        │   ├── SongCard.tsx
        │   ├── ExerciseBlock.tsx
        │   └── SectionRenderer.tsx
        │
        ├── audio-playback/
        │   ├── index.ts                # Exports: InlinePlayer, SpeedControl, useAudioStore
        │   ├── store.ts                # Zustand store (current track, playing state, speed)
        │   ├── InlinePlayer.tsx
        │   └── SpeedControl.tsx
        │
        ├── reference-library/
        │   ├── index.ts                # Exports: ReferencePage, ReferenceDetailPage
        │   ├── ReferencePage.tsx
        │   ├── ReferenceDetailPage.tsx
        │   └── ReferenceCard.tsx
        │
        ├── progress-tracking/
        │   ├── index.ts                # Exports: CompletionCheckbox, LevelProgressBar, useProgressStore
        │   ├── store.ts                # Zustand store (persist middleware → localStorage)
        │   ├── CompletionCheckbox.tsx
        │   ├── LevelProgressBar.tsx
        │   ├── CourseProgressSummary.tsx
        │   └── utils.ts
        │
        ├── practice-timer/
        │   ├── index.ts                # Exports: PracticeTimerPage, PracticeLogPage
        │   ├── PracticeTimerPage.tsx
        │   ├── TimerDisplay.tsx
        │   ├── SessionConfig.tsx
        │   └── PracticeLogPage.tsx
        │
        └── theme/
            ├── index.ts                # Exports: ThemeToggle, useThemeStore
            ├── store.ts                # Zustand store (persist middleware → localStorage)
            └── ThemeToggle.tsx
```

---

## Feature Manifest (`feature-manifest.json`)

Machine-readable registry — the agent reads this to instantly understand features, ownership, and dependencies.

```json
{
  "features": {
    "theme": {
      "path": "src/features/theme",
      "description": "Dark/light mode toggle — Zustand store with persist middleware",
      "routes": [],
      "exports": ["ThemeToggle", "useThemeStore"],
      "dependsOn": ["shared"],
      "crossFeatureDeps": []
    },
    "audio-playback": {
      "path": "src/features/audio-playback",
      "description": "Audio player with speed control — Zustand store for playback state",
      "routes": [],
      "exports": ["InlinePlayer", "SpeedControl", "useAudioStore"],
      "dependsOn": ["shared"],
      "crossFeatureDeps": []
    },
    "progress-tracking": {
      "path": "src/features/progress-tracking",
      "description": "Completion tracking — Zustand store with persist middleware",
      "routes": [],
      "exports": ["CompletionCheckbox", "LevelProgressBar", "CourseProgressSummary", "useProgressStore"],
      "dependsOn": ["shared", "data"],
      "crossFeatureDeps": []
    },
    "course-navigation": {
      "path": "src/features/course-navigation",
      "description": "Home page, level cards, sidebar navigation",
      "routes": ["/"],
      "exports": ["HomePage", "LevelCard", "Sidebar"],
      "dependsOn": ["shared", "data"],
      "crossFeatureDeps": ["progress-tracking"]
    },
    "lesson-viewer": {
      "path": "src/features/lesson-viewer",
      "description": "Renders level content: prose, songs, exercises with audio",
      "routes": ["/level/:id"],
      "exports": ["LevelPage", "SongCard", "ExerciseBlock"],
      "dependsOn": ["shared", "data"],
      "crossFeatureDeps": ["audio-playback", "progress-tracking"]
    },
    "reference-library": {
      "path": "src/features/reference-library",
      "description": "Reference docs viewer: fingering charts, jianpu guide, theory",
      "routes": ["/reference", "/reference/:slug"],
      "exports": ["ReferencePage", "ReferenceDetailPage"],
      "dependsOn": ["shared", "data"],
      "crossFeatureDeps": []
    },
    "practice-timer": {
      "path": "src/features/practice-timer",
      "description": "Guided practice sessions with timer and session log",
      "routes": ["/practice", "/practice-log"],
      "exports": ["PracticeTimerPage", "PracticeLogPage"],
      "dependsOn": ["shared", "data"],
      "crossFeatureDeps": ["progress-tracking"]
    }
  }
}
```

---

## Routes

| Path | Feature | Component |
|------|---------|-----------|
| `/` | course-navigation | HomePage |
| `/level/:id` | lesson-viewer | LevelPage |
| `/reference` | reference-library | ReferencePage |
| `/reference/:slug` | reference-library | ReferenceDetailPage |
| `/practice` | practice-timer | PracticeTimerPage |
| `/practice-log` | practice-timer | PracticeLogPage |

---

## Data Model

```typescript
// shared/types/index.ts

interface Level {
  id: number;                  // 0-7
  slug: string;                // "level-0-setup"
  title: string;               // "Setup & Foundations"
  subtitle: string;
  timeline: string;            // "Week 0", "Months 3-4"
  ccomGrade: string;           // "Pre-Grade", "Grade 1-2"
  sections: LevelSection[];
}

interface LevelSection {
  id: string;
  title: string;
  content: string;             // Markdown prose
  items: (Song | Exercise)[];
}

interface Song {
  id: string;
  type: 'song';
  levelId: number;
  titleChinese?: string;
  titleEnglish: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  audioPath?: string;
  origin?: string;
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
  slug: string;
  title: string;
  description: string;
  content: string;
}

interface UserProgress {
  completedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
  theme: 'light' | 'dark';
}
```

---

## UI Guide (`UI_GUIDE.md`) — Agent-Readable UI Context

`UI_GUIDE.md` is a living document that describes what the user sees on every screen. It is the **UI source of truth for agents** — an agent reads this one file to understand the full app UX without reading any frontend code.

**Maintained by the implementing agent:** after each phase that changes UI, the agent updates `UI_GUIDE.md` with ASCII sketches of affected screens. This is a hard rule in the content sync table below.

**Structure:**

```markdown
# UI Guide — Dizi Flute Learning Platform

## Screen: Home Page (`/`)
**Feature:** course-navigation
**Purpose:** Course overview and entry point

┌─────────────────────────────────────────────┐
│ [☰]  Dizi Flute Course           [🌙/☀️]  │
├──────────┬──────────────────────────────────┤
│ Sidebar  │                                  │
│          │  ┌─────────┐  ┌─────────┐       │
│ Level 0  │  │ Level 0 │  │ Level 1 │       │
│ Level 1  │  │ Setup   │  │ First   │       │
│ Level 2  │  │ Week 0  │  │ Sounds  │       │
│ ...      │  │ ████░░  │  │ ░░░░░░  │       │
│ Level 7  │  └─────────┘  └─────────┘       │
│          │                                  │
│ Reference│  ┌─────────┐  ┌─────────┐       │
│ Practice │  │ Level 2 │  │ Level 3 │       │
│          │  │ ...     │  │ ...     │       │
└──────────┴──────────────────────────────────┘

**Interactions:**
- Click level card → navigates to /level/:id
- Sidebar links → same navigation
- Progress bar on each card shows completion %
- Theme toggle switches dark/light

## Screen: Level Page (`/level/:id`)
...

## Screen: Reference Hub (`/reference`)
...

## Component: Audio Player (inline)
┌──────────────────────────────────┐
│ ▶ advancement ━━━━━━━━●━━━ 2:34 │
│   0.5x  0.75x [1x]  1.25x 1.5x │
└──────────────────────────────────┘
**Interactions:** play/pause, seek, speed control

## Component: Song Card (within Level Page)
┌──────────────────────────────────┐
│ ☐ 小星星 — Twinkle Twinkle       │
│   Key: D  Time: 4/4  ♫ Chinese  │
│   1  1  5  5 | 6  6  5  - |     │
│   [▶ ━━━━━━━━━━━━━━━━━ 0:45]    │
└──────────────────────────────────┘
```

**Why ASCII sketches, not screenshots:**
- Agent generates them after implementing — always in sync
- Text-diffable in git — changes are reviewable
- Any agent can read without image processing
- No manual screenshot capture needed

---

## Content Sync Rules (for Claude Code agent)

**Source markdown files, `src/data/`, and `UI_GUIDE.md` are a paired system.** Any change to source content or UI must keep all three in sync.

| When you change... | Also update... |
|---------------------|---------------|
| `README.md` (philosophy, milestones, practice template) | `src/data/course.ts` |
| `level-{N}-*.md` (prose, theory sections) | `src/data/levels.ts` — matching level's section content |
| `level-{N}-*.md` (add/edit/remove a song) | `src/data/songs.ts` — corresponding `Song` object |
| `level-{N}-*.md` (add/edit/remove an exercise) | `src/data/exercises.ts` — corresponding `Exercise` object |
| `reference/*.md` (any reference doc) | `src/data/references.ts` — matching `ReferenceDoc.content` |
| Add new `.ogg` audio file | Copy to `public/audio/level-{N}/` + set `audioPath` on Song/Exercise |
| Add a new level file | Add to `src/data/levels.ts` + extract songs/exercises |
| Add a new feature module | Create in `src/features/`, register in `feature-manifest.json`, add route to `src/app/routes.tsx` |
| Any UI change (new screen, layout change, new component) | Update `UI_GUIDE.md` — add/update the ASCII sketch for affected screens |

**Hard rule:** never update a source `.md` without updating `src/data/`, and never change UI without updating `UI_GUIDE.md`. All must stay in sync in the same commit.

---

## Agent Task Decomposition Templates

These templates guide the orchestrator agent when breaking feature requests into subagent tasks.

### Template A: Content Change

Example: "Add a new song to level 3"

```
1. [SEQUENTIAL] Update source: edit level-3-folk-repertoire.md
2. [PARALLEL after 1] Update data: add Song object to src/data/songs.ts
3. [PARALLEL after 1] Add audio: copy .ogg to public/audio/level-3/
4. [SEQUENTIAL after 2,3] Verify: dev server → level 3 → song renders with player

Files touched: level-3-folk-repertoire.md, src/data/songs.ts, public/audio/level-3/
Features affected: none (data layer change only, lesson-viewer reads data dynamically)
```

### Template B: New Feature Module

Example: "Add a metronome feature"

```
1. [PARALLEL] Create feature: src/features/metronome/ with index.ts + components
2. [PARALLEL] Add shared primitive if needed: e.g., src/shared/ui/TempoSlider.tsx
3. [SEQUENTIAL after 1] Register: add to feature-manifest.json
4. [SEQUENTIAL after 1] Add route: update src/app/routes.tsx
5. [SEQUENTIAL after 1,2] Integrate into consuming feature (e.g., lesson-viewer)
6. [SEQUENTIAL after all] Verify end-to-end

Parallel-safe: steps 1 and 2 touch separate directories, zero conflict
Serialization points: routes.tsx, feature-manifest.json (small, append-only)
```

### Template C: UI Enhancement

Example: "Make audio player show waveform"

```
1. [SEQUENTIAL] Update shared primitive: src/shared/ui/AudioPlayer.tsx
2. [SEQUENTIAL after 1] Verify all consumers: audio-playback InlinePlayer, lesson-viewer SongCard
3. [SEQUENTIAL after 2] Visual test across levels

Touch point: shared/ui/ only — no feature internals change
```

### Template D: Cross-Feature Change

Example: "Show progress on sidebar level links"

```
1. [SEQUENTIAL] Identify features: course-navigation (Sidebar), progress-tracking (useProgress)
2. [PARALLEL] Check Sidebar currently imports from progress-tracking index.ts
3. [SEQUENTIAL] If not already imported, add crossFeatureDep to feature-manifest.json
4. [SEQUENTIAL] Update Sidebar.tsx to use useProgress hook
5. [SEQUENTIAL] Verify: sidebar shows progress indicators

Touch points: course-navigation/Sidebar.tsx, feature-manifest.json
```

---

## Implementation Phases

### Phase 0: Agent Foundation

**Goal:** CLAUDE.md, feature-manifest.json, and project config — the agent context layer.

**Files to create:**
- `CLAUDE.md` — architecture overview, feature module convention, content sync rules, task decomposition templates, commands
- `UI_GUIDE.md` — initial skeleton with planned screens (populated with ASCII sketches as phases complete)
- `feature-manifest.json` — empty feature registry (populated in later phases)
- `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`
- `index.html`
- `src/main.tsx`, `src/index.css`

**How to verify:**
```bash
npm install && npm run dev
```
- App loads with empty shell
- CLAUDE.md is comprehensive enough for an agent to understand the full architecture without reading any other file
- UI_GUIDE.md lists all planned screens (sketches added in later phases)

---

### Phase 1: Shared Layer

**Goal:** All shared primitives that features will compose.

**Files to create:**
- `src/shared/types/index.ts` — all TypeScript interfaces
- `src/shared/ui/AudioPlayer.tsx` — HTML5 audio with play/pause, speed (0.5x–1.5x), seek
- `src/shared/ui/MarkdownRenderer.tsx` — react-markdown + remark-gfm, custom heading IDs, styled tables, external links in new tab
- `src/shared/ui/ProgressBar.tsx` — generic completion bar
- `src/shared/ui/Checkbox.tsx` — styled checkbox
- `src/shared/hooks/useLocalStorage.ts` — generic localStorage hook
- `src/shared/hooks/useAudioPlayer.ts` — audio playback state
- `src/shared/utils/markdown.ts` — markdown helpers

**How to verify:**
- Import and render each shared component in isolation (Storybook-style or temp route)
- AudioPlayer plays a test OGG file with speed control
- MarkdownRenderer renders a table-heavy markdown string correctly

---

### Phase 2: Data Layer

**Goal:** All course content extracted from source markdown into typed data files.

**Files to create:**
- `src/data/course.ts` — from `README.md`
- `src/data/levels.ts` — from `level-0-setup.md` through `level-7-advanced.md`
- `src/data/songs.ts` — all 60+ songs with jianpu, audio paths, metadata
- `src/data/exercises.ts` — all exercises
- `src/data/references.ts` — from `reference/*.md`

**How to verify:**
- Console: `levels.length === 8`
- Song count matches source markdown
- Audio paths resolve to real files

---

### Phase 3: Feature Modules (parallelizable)

**Goal:** All 7 feature modules built. Subagents can build these in parallel.

**Parallel group A** (zero cross-feature deps):
- **Subagent 1:** `theme/` — ThemeProvider, ThemeToggle, useTheme
- **Subagent 2:** `audio-playback/` — InlinePlayer, SpeedControl, usePlaybackState
- **Subagent 3:** `progress-tracking/` — ProgressContext, CompletionCheckbox, LevelProgressBar, utils
- **Subagent 4:** `reference-library/` — ReferencePage, ReferenceDetailPage, ReferenceCard

**Sequential group B** (depends on group A outputs):
- **Subagent 5:** `course-navigation/` — HomePage, LevelCard, Sidebar (uses progress-tracking)
- **Subagent 6:** `lesson-viewer/` — LevelPage, SongCard, ExerciseBlock (uses audio-playback + progress-tracking)

**Deferred:**
- `practice-timer/` — built in Phase 6

**How to verify per feature:**
- Each feature's `index.ts` exports all declared components
- Feature renders correctly when mounted in a test route
- No imports from other features' internal files (only via `index.ts`)

---

### Phase 4: App Shell

**Goal:** Wire all features together with routing and providers.

**Files to create:**
- `src/app/App.tsx` — layout shell: Sidebar + content `<Outlet/>`, reads `useThemeStore` for dark class
- `src/app/routes.tsx` — all routes importing from feature `index.ts` files
- Update `src/main.tsx` to use App shell

No providers.tsx needed — Zustand stores are self-contained, no wrapper components required.

**How to verify:**
- Full app runs at localhost
- All routes work: `/`, `/level/0`–`/level/7`, `/reference`, `/reference/fingering-charts`
- Theme toggle works across all pages
- Progress persists across navigation and reload

---

### Phase 5: Audio + Static Assets

**Goal:** All OGG files served, audio plays inline on every song/exercise.

**Actions:**
- Copy `.ogg` files from `midi/level-*/` to `public/audio/level-*/`
- Copy `d-key-dizi-included-chart.png` to `public/images/`
- Verify audio path mappings in `src/data/songs.ts` and `exercises.ts`

**How to verify:**
- Level 2 → 小星星 → press play → hear pan flute
- Speed control 0.5x → plays slower
- Songs without OGG → no player shown (graceful)

---

### Phase 6: Practice Timer (optional)

**Goal:** Guided practice session timer + history log.

**Files to create:**
- `src/features/practice-timer/` — full module
- Register in `feature-manifest.json`
- Add routes to `src/app/routes.tsx`

**How to verify:**
- Start practice → timer counts through 5 sections
- Session saved to practice log
- Log page shows history

---

### Phase 7: Responsive Polish

**Goal:** Mobile-friendly for phone-in-hand practice.

**Changes:**
- Sidebar → hamburger drawer on mobile
- Audio player → larger touch targets (44px min)
- Tables → horizontal scroll
- Jianpu → proper font sizing

**How to verify:**
- Test at 375px, 768px, 1280px
- All interactions work on touch

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Feature-based structure | Enables parallel subagent development — each feature is an isolated directory |
| `feature-manifest.json` | Machine-readable context — agent instantly understands features without reading code |
| `CLAUDE.md` as agent entry point | One file gives full architecture + task decomposition templates |
| Strict dependency direction | `shared` → `data` → `features` → `app` prevents circular deps and merge conflicts |
| Features export only via `index.ts` | Clear public API — subagents know exactly what's available |
| OGG only, no browser MIDI | OGG plays natively; MIDI synthesis adds major complexity |
| Content as TypeScript imports | Type safety, zero-latency navigation, ~130KB total |
| Zustand for state | Each feature owns its store — no provider tree, no context boilerplate. `persist` middleware handles localStorage. |
| `UI_GUIDE.md` with ASCII sketches | Agent generates sketches after implementing UI — always in sync, text-diffable, no screenshots needed. Any agent can understand the full UX from one file. |

---

## Critical Source Files

| File | Used For |
|------|----------|
| `README.md` | Course philosophy, milestones → `src/data/course.ts` |
| `level-0-setup.md` through `level-7-advanced.md` | All lessons → `levels.ts`, `songs.ts`, `exercises.ts` |
| `reference/*.md` | Reference content → `references.ts` |
| `scripts/generate_midi.py` | Jianpu encoding reference + missing OGG generation |
| `midi/README.md` | Audio file naming conventions |
