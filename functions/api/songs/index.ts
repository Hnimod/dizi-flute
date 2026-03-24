interface Env {
  DB: D1Database;
}

function snakeToCamel(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = value;
  }
  // Add type field for songs
  result.type = "song";
  return result;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const level = url.searchParams.get("level");

  let query = "SELECT * FROM songs";
  const params: unknown[] = [];

  if (level) {
    query += " WHERE level_id = ?";
    params.push(Number(level));
  }

  query += " ORDER BY level_id, sort_order";

  const result = await context.env.DB.prepare(query)
    .bind(...params)
    .all();

  const songs = result.results.map(snakeToCamel);

  return new Response(JSON.stringify(songs), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = (await context.request.json()) as Record<string, unknown>;

  const id =
    (body.id as string) ||
    `level-${body.levelId ?? body.level_id}-song-${Date.now()}`;
  const levelId = (body.levelId ?? body.level_id ?? 0) as number;

  // Get next sort_order for this level
  const maxOrder = await context.env.DB.prepare(
    "SELECT COALESCE(MAX(sort_order), -1) as max_order FROM songs WHERE level_id = ?"
  )
    .bind(levelId)
    .first<{ max_order: number }>();

  const sortOrder = (maxOrder?.max_order ?? -1) + 1;

  await context.env.DB.prepare(
    `INSERT INTO songs (id, level_id, title_chinese, title_vietnamese, title_english, key, time_signature, tempo, jianpu, description, audio_path, video_url, origin, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      levelId,
      (body.titleChinese ?? body.title_chinese ?? null) as string | null,
      (body.titleVietnamese ?? body.title_vietnamese ?? null) as string | null,
      (body.titleEnglish ?? body.title_english ?? "") as string,
      (body.key ?? "D") as string,
      (body.timeSignature ?? body.time_signature ?? "4/4") as string,
      (body.tempo ?? null) as number | null,
      (body.jianpu ?? "") as string,
      (body.description ?? null) as string | null,
      (body.audioPath ?? body.audio_path ?? null) as string | null,
      (body.videoUrl ?? body.video_url ?? null) as string | null,
      (body.origin ?? null) as string | null,
      sortOrder
    )
    .run();

  const created = await context.env.DB.prepare("SELECT * FROM songs WHERE id = ?")
    .bind(id)
    .first();

  return new Response(JSON.stringify(snakeToCamel(created as Record<string, unknown>)), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
