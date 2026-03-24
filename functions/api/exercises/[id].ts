interface Env {
  DB: D1Database;
}

function snakeToCamel(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = value;
  }
  result.type = "exercise";
  return result;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;
  const exercise = await context.env.DB.prepare(
    "SELECT * FROM exercises WHERE id = ?"
  )
    .bind(id)
    .first();

  if (!exercise) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify(snakeToCamel(exercise as Record<string, unknown>)),
    { headers: { "Content-Type": "application/json" } }
  );
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;
  const body = (await context.request.json()) as Record<string, unknown>;

  const fieldMap: Record<string, string> = {
    title: "title",
    key: "key",
    tempo: "tempo",
    jianpu: "jianpu",
    description: "description",
    origin: "origin",
    timeSignature: "time_signature",
    time_signature: "time_signature",
    audioPath: "audio_path",
    audio_path: "audio_path",
    videoUrl: "video_url",
    video_url: "video_url",
    levelId: "level_id",
    level_id: "level_id",
    sortOrder: "sort_order",
    sort_order: "sort_order",
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
  values.push(id);

  await context.env.DB.prepare(
    `UPDATE exercises SET ${sets.join(", ")} WHERE id = ?`
  )
    .bind(...values)
    .run();

  const updated = await context.env.DB.prepare(
    "SELECT * FROM exercises WHERE id = ?"
  )
    .bind(id)
    .first();

  if (!updated) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify(snakeToCamel(updated as Record<string, unknown>)),
    { headers: { "Content-Type": "application/json" } }
  );
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;

  const result = await context.env.DB.prepare(
    "DELETE FROM exercises WHERE id = ?"
  )
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
