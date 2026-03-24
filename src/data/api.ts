import type { Song, Exercise } from "@/shared/types";

const API_BASE = "/api";

function getToken(): string | null {
  try {
    const stored = localStorage.getItem("dizi-auth");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

function authHeaders(): HeadersInit {
  const token = getToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// ── Content (songs/exercises) ──────────────────────────────────────

export async function fetchSongs(levelId?: number): Promise<Song[]> {
  const url = levelId != null
    ? `${API_BASE}/songs?level=${levelId}`
    : `${API_BASE}/songs`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch songs: ${res.status}`);
  return res.json();
}

export async function fetchExercises(levelId?: number): Promise<Exercise[]> {
  const url = levelId != null
    ? `${API_BASE}/exercises?level=${levelId}`
    : `${API_BASE}/exercises`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch exercises: ${res.status}`);
  return res.json();
}

export async function createSong(song: Partial<Song>): Promise<Song> {
  const res = await fetch(`${API_BASE}/songs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error(`Failed to create song: ${res.status}`);
  return res.json();
}

export async function updateSong(
  id: string,
  updates: Partial<Song>
): Promise<Song> {
  const res = await fetch(`${API_BASE}/songs/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Failed to update song: ${res.status}`);
  return res.json();
}

export async function deleteSong(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/songs/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete song: ${res.status}`);
}

export async function createExercise(
  exercise: Partial<Exercise>
): Promise<Exercise> {
  const res = await fetch(`${API_BASE}/exercises`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(exercise),
  });
  if (!res.ok) throw new Error(`Failed to create exercise: ${res.status}`);
  return res.json();
}

export async function updateExercise(
  id: string,
  updates: Partial<Exercise>
): Promise<Exercise> {
  const res = await fetch(`${API_BASE}/exercises/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Failed to update exercise: ${res.status}`);
  return res.json();
}

export async function deleteExercise(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/exercises/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete exercise: ${res.status}`);
}

// ── Auth ───────────────────────────────────────────────────────────

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ token: string; role: "admin" }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

export async function identify(
  email: string
): Promise<{ token: string; role: "user"; email: string }> {
  const res = await fetch(`${API_BASE}/auth/identify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(`Identify failed: ${res.status}`);
  return res.json();
}

export async function checkAuth(): Promise<{
  email: string;
  role: "admin" | "user";
} | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── User Progress ──────────────────────────────────────────────────

export async function fetchProgress(): Promise<{
  completedItems: Record<string, boolean>;
  currentLevel: number;
  lastVisited: string;
} | null> {
  try {
    const res = await fetch(`${API_BASE}/me/progress`, {
      headers: authHeaders(),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function syncProgress(data: {
  completedItems?: Record<string, boolean>;
  currentLevel?: number;
}): Promise<void> {
  try {
    await fetch(`${API_BASE}/me/progress`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
  } catch {
    // Fire-and-forget, will sync next time
  }
}

// ── Practice Sessions ──────────────────────────────────────────────

export async function fetchSessions(): Promise<
  { id: string; date: string; duration: number; notes: string }[]
> {
  try {
    const res = await fetch(`${API_BASE}/me/sessions`, {
      headers: authHeaders(),
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function syncSession(session: {
  id: string;
  date: string;
  duration: number;
  notes: string;
}): Promise<void> {
  try {
    await fetch(`${API_BASE}/me/sessions`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(session),
    });
  } catch {
    // Fire-and-forget
  }
}

// ── User Songs ─────────────────────────────────────────────────────

export async function fetchUserSongs(): Promise<Song[]> {
  try {
    const res = await fetch(`${API_BASE}/me/songs`, {
      headers: authHeaders(),
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function createUserSong(song: Partial<Song>): Promise<Song> {
  const res = await fetch(`${API_BASE}/me/songs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error(`Failed to create user song: ${res.status}`);
  return res.json();
}

export async function updateUserSong(
  id: string,
  updates: Partial<Song>
): Promise<void> {
  await fetch(`${API_BASE}/me/songs/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
}

export async function deleteUserSong(id: string): Promise<void> {
  await fetch(`${API_BASE}/me/songs/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

// ── Video Links ────────────────────────────────────────────────────

export async function fetchVideoLinks(): Promise<Record<string, string[]>> {
  try {
    const res = await fetch(`${API_BASE}/me/videos`, {
      headers: authHeaders(),
    });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export async function syncVideoLinks(
  links: Record<string, string[]>
): Promise<void> {
  try {
    await fetch(`${API_BASE}/me/videos`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(links),
    });
  } catch {
    // Fire-and-forget
  }
}
