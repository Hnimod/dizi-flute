-- Content tables (admin-managed)
CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  level_id INTEGER NOT NULL,
  title_chinese TEXT,
  title_vietnamese TEXT,
  title_english TEXT NOT NULL,
  key TEXT NOT NULL DEFAULT 'D',
  time_signature TEXT NOT NULL DEFAULT '4/4',
  tempo INTEGER,
  jianpu TEXT NOT NULL,
  description TEXT,
  audio_path TEXT,
  video_url TEXT,
  origin TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  level_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  key TEXT NOT NULL DEFAULT 'D',
  time_signature TEXT NOT NULL DEFAULT '4/4',
  tempo INTEGER,
  jianpu TEXT NOT NULL,
  description TEXT,
  audio_path TEXT,
  video_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_songs_level ON songs(level_id);
CREATE INDEX IF NOT EXISTS idx_exercises_level ON exercises(level_id);

-- User tables (keyed by email)
CREATE TABLE IF NOT EXISTS user_progress (
  email TEXT NOT NULL,
  item_id TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (email, item_id)
);

CREATE TABLE IF NOT EXISTS user_state (
  email TEXT PRIMARY KEY,
  current_level INTEGER NOT NULL DEFAULT 1,
  last_visited TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS practice_sessions (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  date TEXT NOT NULL,
  duration INTEGER NOT NULL,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_songs (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  title_english TEXT NOT NULL,
  title_chinese TEXT,
  title_vietnamese TEXT,
  key TEXT NOT NULL DEFAULT 'D',
  time_signature TEXT NOT NULL DEFAULT '4/4',
  tempo INTEGER,
  jianpu TEXT NOT NULL,
  description TEXT,
  origin TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS video_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  item_id TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_progress_email ON user_progress(email);
CREATE INDEX IF NOT EXISTS idx_sessions_email ON practice_sessions(email);
CREATE INDEX IF NOT EXISTS idx_user_songs_email ON user_songs(email);
CREATE INDEX IF NOT EXISTS idx_video_links_email_item ON video_links(email, item_id);
