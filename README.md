# Dizi Flute Learning Platform

An interactive self-study course for learning the Chinese dizi (竹笛) flute, from absolute beginner to advanced level.

**Live:** [dizi-flute.pages.dev](https://dizi-flute.pages.dev)

## Features

- **8-level structured curriculum** aligned with CCOM (Central Conservatory of Music) grading
- **Jianpu notation renderer** with octave dots, bar lines, and proper musical formatting
- **Practice timer** with session logging and daily practice schedule
- **Progress tracking** persisted to localStorage — mark songs/exercises as completed
- **Video embeds** — attach YouTube/TikTok reference videos to any song
- **Reference library** — fingering charts, jianpu guide, music theory, maintenance tips
- **Mobile-first design** — full-screen practice view with prev/next navigation, bottom tab bar
- **Dark/light theme** with persistent preference

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (state management with localStorage persistence)
- react-router v7
- react-markdown + remark-gfm

## Getting Started

```bash
nvm use           # Node 24.14.0
npm install
npm run dev       # localhost:5173
```

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (tsc + vite)
npm run preview   # Preview production build
```

## Project Structure

```
src/
├── app/           # Root layout, routes, bottom nav
├── data/          # Static content (songs, exercises, levels, references)
├── features/      # Feature modules
│   ├── course-navigation/   # Home page, sidebar
│   ├── lesson-viewer/       # Level page, practice view
│   ├── practice-timer/      # Timer, session log
│   ├── progress-tracking/   # Zustand store, selectors
│   ├── reference-library/   # Reference docs viewer
│   └── theme/               # Dark/light toggle
├── shared/
│   ├── types/     # TypeScript interfaces
│   ├── ui/        # Reusable components (AudioPlayer, VideoEmbed, JianpuRenderer, etc.)
│   └── utils/     # Helpers (slugify, formatDuration)
content/           # Source markdown PRD files
public/audio/      # OGG audio files per level
```

## Deployment

Hosted on [Cloudflare Pages](https://pages.cloudflare.com/) with automatic SPA fallback.

```bash
npm run build
npx wrangler pages deploy dist/ --project-name dizi-flute
```

## License

MIT
