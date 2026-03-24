# Dizi Flute Learning Platform

## Quick Orientation
- **What:** Interactive dizi flute learning course webapp
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 + Zustand + react-markdown
- **Backend:** Cloudflare D1 (SQLite) + Pages Functions (Workers)
- **Entry points:** `src/main.tsx` (app), `src/app/routes.tsx` (routing), `feature-manifest.json` (feature map)
- **Content source:** `content/` has the PRD markdown files; `src/data/` is the derived data layer
- **API source:** `functions/api/` has the Cloudflare Pages Functions (file-based routing)
- **UI context:** `UI_GUIDE.md` has ASCII sketches of every screen

## Commands
```bash
npm run dev           # Frontend-only dev server (localhost:5173, uses static fallback data)
npm run dev:full      # Full stack: Wrangler proxies Vite + D1 + Pages Functions
npm run build         # Production build
npm run deploy        # Build + deploy to Cloudflare Pages
npm run db:migrate    # Run D1 migrations
npm run db:seed       # Seed D1 from generated SQL
npm run db:generate-seed  # Generate seed.sql from hardcoded src/data/
```

## Architecture

### Frontend layers (strict one-way dependencies)

```
shared/ → data/ → features/ → app/
```

- `shared/` — Types, UI primitives, utils. Zero business logic.
- `data/` — Content store + API client + static fallback data. Key files:
  - `content-store.ts` — Zustand store, fetches songs/exercises from API, falls back to static data
  - `api.ts` — Fetch wrapper for all backend endpoints
  - `levels.ts` — `buildLevels(songs, exercises)` function, computes level sections dynamically
  - `songs/`, `exercises.ts` — Static hardcoded data (used as fallback when API unavailable)
- `features/` — Self-contained modules. Import other features ONLY via `index.ts`.
- `app/` — Thin shell: routes + layout. Imports from `features/`.

### Backend (Cloudflare D1 + Pages Functions)

```
functions/api/
  _middleware.ts        — JWT verification, admin-only write protection
  auth/
    login.ts            — POST: admin email+password → JWT
    identify.ts         — POST: user email-only → JWT (auto-creates user state)
    me.ts               — GET: verify token, return {email, role}
  songs/                — GET (public), POST/PUT/DELETE (admin)
  exercises/            — GET (public), POST/PUT/DELETE (admin)
  me/
    progress.ts         — GET/PUT: user's completed items + current level
    sessions/           — GET/POST: practice sessions
    songs/              — GET/POST/PUT/DELETE: user's custom songs
    videos.ts           — GET/PUT: user's video links
```

### Database (D1 schema in `db/migrations/001-init.sql`)

**Content tables** (admin-managed):
- `songs` — id, level_id, titles, key, time_signature, tempo, jianpu, description, video_url, origin, sort_order
- `exercises` — id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, sort_order

**User tables** (keyed by email):
- `user_progress` — (email, item_id) → completed flag
- `user_state` — email → current_level, last_visited
- `practice_sessions` — email → session history
- `user_songs` — email → custom songs
- `video_links` — email → per-item video URLs

### Auth model (two tiers)

| Tier | Login | JWT expiry | Can do |
|------|-------|-----------|--------|
| **Admin** | email + password (`/admin/login`) | 7 days | CRUD songs/exercises in DB |
| **User** | email only (IdentifyPrompt) | 30 days | Sync progress/sessions/videos across devices |
| **Anonymous** | none | — | Read-only, localStorage progress |

Admin credentials are set as Cloudflare env secrets (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`).

## Feature Module Convention

Every feature lives in `src/features/{name}/` and MUST have:
- `index.ts` — public API (all exports go through here)
- `store.ts` — Zustand store if the feature has state (uses `persist` middleware for localStorage)
- Internal files are private — other features import only from `index.ts`

Key features:
- `auth/` — Auth store, IdentifyPrompt (email prompt), AdminLoginPage, SyncProvider (auto-syncs stores to API)
- `admin/` — SongEditor, ExerciseEditor (mobile-friendly forms, used as slide-up modals)
- `song-library/` — Browse/search songs, add custom songs, song detail view
- `lesson-viewer/` — Level content with songs/exercises, practice view, video links
- `progress-tracking/` — Completion tracking store
- `practice-timer/` — Timer + session history

## Content Sync Rules

**Songs and exercises now live in D1 database.** The static files in `src/data/songs/` and `src/data/exercises.ts` serve as fallback only.

| To change content... | Do this... |
|---------------------|------------|
| Add/edit a song | Login as admin → edit inline on song detail page, OR via API |
| Add/edit an exercise | Login as admin → edit inline on level page, OR via API |
| Change level prose | Edit `src/data/levels.ts` (still hardcoded — structural content) |
| Change course metadata | Edit `src/data/course.ts` (still hardcoded) |
| Change references | Edit `src/data/references.ts` (still hardcoded) |
| Add audio file | Copy `.ogg` to `public/audio/level-{N}/`, set `audioPath` in DB |
| Any UI change | Update `UI_GUIDE.md` with ASCII sketch |
| New feature module | Register in `feature-manifest.json` + `routes.tsx` |

## Deployment

Hosted on **Cloudflare Pages** (`dizi-flute.pages.dev`).

### First-time setup
1. `npx wrangler d1 create dizi-flute` → copy database_id into `wrangler.jsonc`
2. `npm run db:migrate` — create tables
3. `npm run db:generate-seed && npm run db:seed` — populate from static data
4. In Cloudflare dashboard (Pages > Settings > Functions):
   - Bind D1 database: binding name `DB`, database `dizi-flute`
   - Set secrets: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (SHA-256), `JWT_SECRET`
5. `npm run deploy`

### Generating admin password hash
```bash
echo -n "your-password" | shasum -a 256 | awk '{print $1}'
```

### Ongoing deploys
```bash
npm run deploy   # builds + deploys frontend + functions
```

## Task Decomposition

**Content change via admin UI** (e.g., "add song to level 3"):
1. Login at `/admin/login` → 2. Navigate to level/library → 3. Click Edit/Add → 4. Fill form → 5. Save

**Content change via code** (e.g., updating level prose):
1. Edit `src/data/levels.ts` → 2. Build → 3. Deploy

**New feature** (e.g., "add metronome"):
1. Create `src/features/{name}/` → 2. Register in manifest → 3. Add route → 4. Integrate → 5. Update `UI_GUIDE.md`
