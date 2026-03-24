import type { AuthContext } from "../../_middleware";

interface Env {
  DB: D1Database;
}

export const onRequestPut: PagesFunction<
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

  const id = context.params.id as string;
  const body = (await context.request.json()) as Record<string, unknown>;

  const fieldMap: Record<string, string> = {
    titleEnglish: "title_english",
    title_english: "title_english",
    titleChinese: "title_chinese",
    title_chinese: "title_chinese",
    titleVietnamese: "title_vietnamese",
    title_vietnamese: "title_vietnamese",
    key: "key",
    timeSignature: "time_signature",
    time_signature: "time_signature",
    tempo: "tempo",
    jianpu: "jianpu",
    description: "description",
    origin: "origin",
  };

  const sets: string[] = [];
  const values: unknown[] = [];

  for (const [inputKey, value] of Object.entries(body)) {
    const dbCol = fieldMap[inputKey];
    if (dbCol) {
      sets.push(`${dbCol} = ?`);
      values.push(value);
    }
  }

  if (sets.length === 0) {
    return new Response(
      JSON.stringify({ error: "No valid fields to update" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  sets.push("updated_at = datetime('now')");
  values.push(id, auth.email);

  await context.env.DB.prepare(
    `UPDATE user_songs SET ${sets.join(", ")} WHERE id = ? AND email = ?`
  )
    .bind(...values)
    .run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestDelete: PagesFunction<
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

  const id = context.params.id as string;

  await context.env.DB.prepare(
    "DELETE FROM user_songs WHERE id = ? AND email = ?"
  )
    .bind(id, auth.email)
    .run();

  return new Response(null, { status: 204 });
};
