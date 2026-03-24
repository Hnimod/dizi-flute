import type { AuthContext } from "../../_middleware";

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<
  Env,
  string,
  { auth?: AuthContext }
> = async (context) => {
  const auth = context.data.auth;
  if (!auth) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await context.env.DB.prepare(
    "SELECT * FROM user_songs WHERE email = ? ORDER BY created_at DESC"
  )
    .bind(auth.email)
    .all();

  const songs = result.results.map((row) => ({
    id: row.id,
    type: "song" as const,
    levelId: 0,
    titleEnglish: row.title_english,
    titleChinese: row.title_chinese,
    titleVietnamese: row.title_vietnamese,
    key: row.key,
    timeSignature: row.time_signature,
    tempo: row.tempo,
    jianpu: row.jianpu,
    description: row.description,
    origin: row.origin,
  }));

  return new Response(JSON.stringify(songs), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestPost: PagesFunction<
  Env,
  string,
  { auth?: AuthContext }
> = async (context) => {
  const auth = context.data.auth;
  if (!auth) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = (await context.request.json()) as Record<string, unknown>;
  const id =
    (body.id as string) || `user-song-${Date.now()}`;

  await context.env.DB.prepare(
    `INSERT INTO user_songs (id, email, title_english, title_chinese, title_vietnamese, key, time_signature, tempo, jianpu, description, origin)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      auth.email,
      (body.titleEnglish ?? body.title_english ?? "") as string,
      (body.titleChinese ?? body.title_chinese ?? null) as string | null,
      (body.titleVietnamese ?? body.title_vietnamese ?? null) as string | null,
      (body.key ?? "D") as string,
      (body.timeSignature ?? body.time_signature ?? "4/4") as string,
      (body.tempo ?? null) as number | null,
      (body.jianpu ?? "") as string,
      (body.description ?? null) as string | null,
      (body.origin ?? null) as string | null
    )
    .run();

  return new Response(
    JSON.stringify({
      id,
      type: "song",
      levelId: 0,
      titleEnglish: body.titleEnglish ?? body.title_english ?? "",
      titleChinese: body.titleChinese ?? body.title_chinese ?? null,
      titleVietnamese: body.titleVietnamese ?? body.title_vietnamese ?? null,
      key: body.key ?? "D",
      timeSignature: body.timeSignature ?? body.time_signature ?? "4/4",
      tempo: body.tempo ?? null,
      jianpu: body.jianpu ?? "",
      description: body.description ?? null,
      origin: body.origin ?? null,
    }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
};
