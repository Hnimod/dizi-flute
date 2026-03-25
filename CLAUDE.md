# Dizi Flute Learning Platform

## Quick Orientation
- **What:** Library-first dizi flute learning webapp — browse songs, learn techniques, read knowledge articles
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 + Zustand + react-markdown + framer-motion
- **Data:** Static TypeScript files (no API calls currently). Backend exists but is disconnected.
- **Entry points:** `src/main.tsx` (app), `src/app/routes.tsx` (routing), `feature-manifest.json` (feature map)
- **Content source:** `src/data/` — songs, exercises, techniques, references (all static)
- **UI context:** `UI_GUIDE.md` has screen descriptions

## Commands
```bash
npm run dev           # Dev server (localhost:5173, static data only)
npm run build         # Production build (tsc + vite)
npm run deploy        # Build + deploy to Cloudflare Pages
```

## Architecture

### Frontend layers (strict one-way dependencies)

```
shared/ → data/ → features/ → app/
```

- `shared/` — Types, UI primitives (JianpuRenderer, VideoEmbed, Checkbox, etc.), utils. Zero business logic.
- `data/` — Static content only. Key files:
  - `songs/` — Individual song files organized by difficulty (`beginner/`, `elementary/`, `advanced/`)
  - `songs/index.ts` — Aggregates all songs into flat `songs: Song[]` array
  - `exercises.ts` — All exercises (technique drills)
  - `techniques.ts` — Technique catalog (links exercises to techniques)
  - `levels.ts` — `difficultyLabels` mapping (1-10 → Beginner/Elementary/Intermediate/Advanced/Expert)
  - `references.ts` — Knowledge articles (fingering charts, jianpu guide, theory)
  - `mutations.ts` — Stubbed mutation hooks (for future admin editing)
- `features/` — Self-contained modules. Import other features ONLY via `index.ts`.
- `app/` — Thin shell: routes + layout + sidebar + bottom nav.

### Routes

| Path | Component | Feature |
|------|-----------|---------|
| `/` | SongLibraryPage | song-library |
| `/song/:songId` | SongDetailPage | song-library |
| `/techniques` | TechniqueLibraryPage | technique-library |
| `/techniques/:id` | TechniqueDetailPage | technique-library |
| `/knowledge` | ReferencePage | reference-library |
| `/knowledge/:slug` | ReferenceDetailPage | reference-library |
| `/practice` | PracticePage | practice-timer |

### Navigation
- **Desktop:** Left sidebar with links (Songs, Techniques, Knowledge, Practice)
- **Mobile:** Bottom tab bar (4 tabs), top bar with login/theme toggle

## Data Model

### Song (`src/shared/types/index.ts`)
```typescript
interface Song {
  id: string;
  type: "song";
  difficulty: number;        // 1-10 scale
  difficultyNote?: string;   // Why this difficulty rating
  titleChinese?: string;
  titleVietnamese?: string;
  titleEnglish: string;
  key: string;               // e.g., "D", "C", "bD"
  timeSignature: string;     // e.g., "4/4", "3/4"
  tempo?: number;            // BPM
  jianpu: string;            // Notation content
  description?: string;
  videoUrl?: string;
  videoUrls?: string[];
  origin?: string;           // e.g., "Teresa Teng, 1977"
  techniques?: string[];     // Technique IDs, e.g., ["tonguing", "pentatonic-scale"]
}
```

### Song file structure
```
src/data/songs/
  beginner/       # difficulty 1-2
  elementary/     # difficulty 3-4
  advanced/       # difficulty 7+
  index.ts        # aggregates all into songs[]
```

Each song is a single file exporting `export const song: Song = { ... }`.

### Technique (`src/data/techniques.ts`)
```typescript
interface Technique {
  id: string;
  name: string;              // e.g., "Single Tonguing (吐音)"
  category: string;          // fundamentals | articulation | ornaments | breathing | fingering | advanced
  level: number;             // Difficulty level
  description: string;
  exerciseIds: string[];     // Links to exercises
  referenceSlug?: string;    // Links to knowledge article
}
```

### Exercise (`src/data/exercises.ts`)
Exercises keep `levelId` (0-6) for organizing by technique progression. They are linked from the technique catalog.

## Feature Module Convention

Every feature lives in `src/features/{name}/` and MUST have:
- `index.ts` — public API (all exports go through here)
- `store.ts` — Zustand store if the feature has state (uses `persist` middleware for localStorage)
- Internal files are private — other features import only from `index.ts`

### Current features:
- `song-library/` — Home page (song browsing, search, favorites, difficulty grouping), song detail view
- `technique-library/` — Technique browsing by category, technique detail with exercises and related songs
- `reference-library/` — Knowledge hub (fingering charts, jianpu guide, theory articles)
- `lesson-viewer/` — PracticeView (full-screen song practice) + TempoGuide (jianpu renderer wrapper with playback)
- `practice-timer/` — Timer + session history
- `progress-tracking/` — Favorites tracking (localStorage via Zustand persist)
- `auth/` — Local-only admin toggle (no API). Password checked client-side.
- `admin/` — SongEditor, ExerciseEditor (kept but not wired to UI currently)
- `theme/` — Dark/light mode toggle

## Auth (simplified)

Currently local-only. Admin mode is a simple password check stored in localStorage. No API calls, no JWT.
- Login via top-bar popover
- Progress (favorites) persists in localStorage for all users

## Content Changes

| To change content... | Do this... |
|---------------------|------------|
| Add a song | Create file in `src/data/songs/{difficulty}/`, import in `songs/index.ts` |
| Edit a song | Edit the song's `.ts` file directly |
| Add an exercise | Add to `src/data/exercises.ts` |
| Add a technique | Add to `src/data/techniques.ts` with exercise IDs |
| Change references | Edit `src/data/references.ts` |
| Any UI change | Update `UI_GUIDE.md` |
| New feature module | Register in `feature-manifest.json` + `routes.tsx` |

## Deployment

Hosted on **Cloudflare Pages** (`dizi-flute.pages.dev`).

```bash
npm run deploy   # builds + deploys frontend
```

## Backend (disconnected)

A Cloudflare D1 + Pages Functions backend exists in `functions/api/` and `db/` but is currently disconnected. The frontend uses static data only. The backend can be reconnected later by:
1. Restoring `src/data/api.ts` and `src/data/queries.ts`
2. Wrapping data access in TanStack Query hooks
3. Wiring admin editors back into the UI
