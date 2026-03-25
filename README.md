# Dizi Flute Learning Platform

A library-first webapp for learning the Chinese dizi (竹笛) flute. Browse songs you want to play, discover the techniques they use, and drill those techniques with exercises.

**Live:** [dizi-flute.pages.dev](https://dizi-flute.pages.dev)

## Features

- **Song library** with difficulty ratings (1-10), search, favorites, and expandable jianpu notation
- **Technique library** — 30+ techniques organized by category, each with practice exercises
- **Jianpu renderer** — SVG-based numbered notation with ornaments, grace notes, volta brackets, tooltips
- **Knowledge hub** — fingering charts, jianpu guide, music theory
- **Practice timer** with session logging
- **Standard jianpu headers** — centered title, `1=Key`, `♩=BPM` following Chinese music convention
- **Mobile-first** — bottom tab bar, responsive layout
- **Dark/light theme**

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (state management with localStorage persistence)
- react-router v7
- framer-motion (animations)
- react-markdown + remark-gfm

## Getting Started

```bash
npm install
npm run dev       # localhost:5173
```

## Commands

```bash
npm run dev       # Dev server (static data)
npm run build     # Production build (tsc + vite)
npm run deploy    # Build + deploy to Cloudflare Pages
```

## Project Structure

```
src/
├── app/                    # Root layout, routes, sidebar, bottom nav
├── data/                   # Static content
│   ├── songs/              # Individual song files by difficulty
│   │   ├── beginner/       # Difficulty 1-2
│   │   ├── elementary/     # Difficulty 3-4
│   │   ├── advanced/       # Difficulty 7+
│   │   └── index.ts        # Aggregates all songs
│   ├── exercises.ts        # Technique exercises
│   ├── techniques.ts       # Technique catalog
│   ├── references.ts       # Knowledge articles
│   └── levels.ts           # Difficulty labels (1-10 → Beginner/Expert)
├── features/
│   ├── song-library/       # Home page, song detail, favorites
│   ├── technique-library/  # Technique browsing + detail
│   ├── reference-library/  # Knowledge hub
│   ├── lesson-viewer/      # PracticeView, TempoGuide (jianpu + playback)
│   ├── practice-timer/     # Timer + sessions
│   ├── progress-tracking/  # Favorites store (localStorage)
│   ├── auth/               # Local admin toggle
│   ├── admin/              # Song/exercise editors (kept, not wired)
│   └── theme/              # Dark/light toggle
└── shared/
    ├── types/              # TypeScript interfaces
    ├── ui/                 # Components (JianpuRenderer, VideoEmbed, etc.)
    └── utils/              # Helpers
```

## Deployment

Hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

```bash
npm run deploy
```

## License

MIT
