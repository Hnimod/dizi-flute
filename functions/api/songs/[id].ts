interface Env {
  DB: D1Database;
}

function parseVideoUrls(raw: unknown): string[] {
  if (!raw || raw === "null") return [];
  const str = String(raw);
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch { /* not JSON */ }
  return str ? [str] : [];
}

function snakeToCamel(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = value;
  }
  result.type = "song";
  result.videoUrls = parseVideoUrls(result.videoUrl);
  return result;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;
  const song = await context.env.DB.prepare("SELECT * FROM songs WHERE id = ?")
    .bind(id)
    .first();

  if (!song) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(snakeToCamel(song as Record<string, unknown>)), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;
  const body = (await context.request.json()) as Record<string, unknown>;

  // Build dynamic UPDATE
  const fieldMap: Record<string, string> = {
    titleChinese: "title_chinese",
    titleVietnamese: "title_vietnamese",
    titleEnglish: "title_english",
    timeSignature: "time_signature",
    audioPath: "audio_path",
    videoUrl: "video_url",
    levelId: "level_id",
    sortOrder: "sort_order",
    // Allow snake_case too
    title_chinese: "title_chinese",
    title_vietnamese: "title_vietnamese",
    title_english: "title_english",
    time_signature: "time_signature",
    audio_path: "audio_path",
    video_url: "video_url",
    level_id: "level_id",
    sort_order: "sort_order",
    key: "key",
    tempo: "tempo",
    jianpu: "jianpu",
    description: "description",
    origin: "origin",
  };

  const sets: string[] = [];
  const values: unknown[] = [];

  // Handle videoUrls array → serialize to JSON for video_url column
  if (body.videoUrls || body.video_urls) {
    const urls = (body.videoUrls ?? body.video_urls) as string[];
    const filtered = Array.isArray(urls) ? urls.filter(Boolean) : [];
    sets.push("video_url = ?");
    values.push(filtered.length > 0 ? JSON.stringify(filtered) : null);
  }

  for (const [inputKey, value] of Object.entries(body)) {
    if (inputKey === "videoUrls" || inputKey === "video_urls") continue;
    const dbCol = fieldMap[inputKey];
    if (dbCol) {
      sets.push(`${dbCol} = ?`);
      values.push(value);
    }
  }

  if (sets.length === 0) {
    return new Response(JSON.stringify({ error: "No valid fields to update" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  sets.push("updated_at = datetime('now')");
  values.push(id);

  await context.env.DB.prepare(
    `UPDATE songs SET ${sets.join(", ")} WHERE id = ?`
  )
    .bind(...values)
    .run();

  const updated = await context.env.DB.prepare("SELECT * FROM songs WHERE id = ?")
    .bind(id)
    .first();

  if (!updated) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(snakeToCamel(updated as Record<string, unknown>)), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;

  const result = await context.env.DB.prepare("DELETE FROM songs WHERE id = ?")
    .bind(id)
    .run();

  if (!result.meta.changes) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 204 });
};
