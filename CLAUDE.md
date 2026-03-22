# Dizi Flute Learning Platform

## Quick Orientation
- **What:** Interactive dizi flute learning course webapp
- **Stack:** React 18 + Vite + TypeScript + Tailwind CSS v4 + Zustand + react-markdown
- **Entry points:** `src/main.tsx` (app), `src/app/routes.tsx` (routing), `feature-manifest.json` (feature map)
- **Content source:** Root `.md` files are the PRD; `src/data/` is the derived data layer
- **UI context:** `UI_GUIDE.md` has ASCII sketches of every screen

## Commands
```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

## Architecture

Three layers with strict one-way dependencies:

```
shared/ → data/ → features/ → app/
```

- `shared/` — Types, UI primitives, utils. Zero business logic. Depends on nothing.
- `data/` — Content extracted from source `.md` files. Depends on `shared/types/` only.
- `features/` — Self-contained modules. Depend on `shared/` and `data/`. Import other features ONLY via `index.ts`.
- `app/` — Thin shell: routes + layout. Imports from `features/`.

## Feature Module Convention

Every feature lives in `src/features/{name}/` and MUST have:
- `index.ts` — public API (all exports go through here)
- `store.ts` — Zustand store if the feature has state (uses `persist` middleware for localStorage)
- Internal files are private — other features import only from `index.ts`

To add a new feature:
1. Create `src/features/{name}/` with `index.ts`
2. Add entry to `feature-manifest.json`
3. If it has a route, add to `src/app/routes.tsx`

## Content Sync Rules

**Source `.md` files, `src/data/`, and `UI_GUIDE.md` must stay in sync.**

| When you change... | Also update... |
|---------------------|---------------|
| `README.md` | `src/data/course.ts` |
| `level-{N}-*.md` (prose) | `src/data/levels.ts` |
| `level-{N}-*.md` (song) | `src/data/songs.ts` |
| `level-{N}-*.md` (exercise) | `src/data/exercises.ts` |
| `reference/*.md` | `src/data/references.ts` |
| New `.ogg` audio | Copy to `public/audio/level-{N}/` + set `audioPath` |
| Any UI change | Update `UI_GUIDE.md` with ASCII sketch |
| New feature module | Register in `feature-manifest.json` + `routes.tsx` |

## Task Decomposition

When breaking a feature request into subtasks:

**Content change** (e.g., "add song to level 3"):
1. Update source `.md` → 2. Update `src/data/songs.ts` → 3. Add audio to `public/audio/` → 4. Verify

**New feature** (e.g., "add metronome"):
1. Create `src/features/{name}/` → 2. Register in manifest → 3. Add route → 4. Integrate → 5. Update `UI_GUIDE.md`

**UI enhancement** (e.g., "improve audio player"):
1. Update `src/shared/ui/` or feature component → 2. Verify consumers → 3. Update `UI_GUIDE.md`
