/**
 * One-time script to generate seed.sql from existing hardcoded data.
 * Run: npx tsx --tsconfig tsconfig.app.json db/generate-seed.ts > db/seed.sql
 */

// @ts-expect-error - tsx resolves these with tsconfig paths
import { songs } from "@/data/songs/index.js";
// @ts-expect-error - tsx resolves these with tsconfig paths
import { exercises } from "@/data/exercises.js";

interface SongRow {
  id: string;
  levelId: number;
  titleChinese?: string;
  titleVietnamese?: string;
  titleEnglish: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  audioPath?: string;
  videoUrl?: string;
  origin?: string;
}

interface ExerciseRow {
  id: string;
  levelId: number;
  title: string;
  key: string;
  timeSignature: string;
  tempo?: number;
  jianpu: string;
  description?: string;
  audioPath?: string;
  videoUrl?: string;
}

function escapeSQL(value: string | undefined | null): string {
  if (value == null) return "NULL";
  return "'" + value.replace(/'/g, "''") + "'";
}

function numOrNull(value: number | undefined | null): string {
  if (value == null) return "NULL";
  return String(value);
}

console.log("-- Auto-generated seed data from src/data/");
console.log("-- Generated: " + new Date().toISOString());
console.log("");

// Track sort_order per level
const songOrder: Record<number, number> = {};
const exerciseOrder: Record<number, number> = {};

console.log("-- Songs");
for (const s of songs as SongRow[]) {
  const order = (songOrder[s.levelId] ?? 0);
  songOrder[s.levelId] = order + 1;

  console.log(
    `INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order) VALUES (${escapeSQL(s.id)}, ${s.levelId}, ${escapeSQL(s.titleChinese)}, ${escapeSQL(s.titleVietnamese)}, ${escapeSQL(s.titleEnglish)}, ${escapeSQL(s.key)}, ${escapeSQL(s.timeSignature)}, ${numOrNull(s.tempo)}, ${escapeSQL(s.jianpu)}, ${escapeSQL(s.description)}, ${escapeSQL(s.audioPath)}, ${escapeSQL(s.videoUrl)}, ${escapeSQL(s.origin)}, ${order});`
  );
}

console.log("");
console.log("-- Exercises");
for (const e of exercises as ExerciseRow[]) {
  const order = (exerciseOrder[e.levelId] ?? 0);
  exerciseOrder[e.levelId] = order + 1;

  console.log(
    `INSERT INTO exercises (id, level_id, title, key, time_signature, tempo, jianpu, description, audio_path, video_url, sort_order) VALUES (${escapeSQL(e.id)}, ${e.levelId}, ${escapeSQL(e.title)}, ${escapeSQL(e.key)}, ${escapeSQL(e.timeSignature)}, ${numOrNull(e.tempo)}, ${escapeSQL(e.jianpu)}, ${escapeSQL(e.description)}, ${escapeSQL(e.audioPath)}, ${escapeSQL(e.videoUrl)}, ${order});`
  );
}
