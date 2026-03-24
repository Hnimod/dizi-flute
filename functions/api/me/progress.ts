import type { AuthContext } from "../_middleware";

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

  const [progressRows, stateRow] = await Promise.all([
    context.env.DB.prepare(
      "SELECT item_id, completed FROM user_progress WHERE email = ?"
    )
      .bind(auth.email)
      .all(),
    context.env.DB.prepare("SELECT * FROM user_state WHERE email = ?")
      .bind(auth.email)
      .first(),
  ]);

  const completedItems: Record<string, boolean> = {};
  for (const row of progressRows.results) {
    completedItems[row.item_id as string] = !!(row.completed as number);
  }

  return new Response(
    JSON.stringify({
      completedItems,
      currentLevel: (stateRow?.current_level as number) ?? 1,
      lastVisited: (stateRow?.last_visited as string) ?? new Date().toISOString(),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};

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

  const body = (await context.request.json()) as {
    completedItems?: Record<string, boolean>;
    currentLevel?: number;
  };

  const batch: D1PreparedStatement[] = [];

  // Upsert user state
  if (body.currentLevel !== undefined) {
    batch.push(
      context.env.DB.prepare(
        `INSERT INTO user_state (email, current_level, last_visited) VALUES (?, ?, datetime('now'))
         ON CONFLICT(email) DO UPDATE SET current_level = excluded.current_level, last_visited = excluded.last_visited`
      ).bind(auth.email, body.currentLevel)
    );
  }

  // Upsert completed items
  if (body.completedItems) {
    for (const [itemId, completed] of Object.entries(body.completedItems)) {
      batch.push(
        context.env.DB.prepare(
          `INSERT INTO user_progress (email, item_id, completed, updated_at) VALUES (?, ?, ?, datetime('now'))
           ON CONFLICT(email, item_id) DO UPDATE SET completed = excluded.completed, updated_at = excluded.updated_at`
        ).bind(auth.email, itemId, completed ? 1 : 0)
      );
    }
  }

  if (batch.length > 0) {
    await context.env.DB.batch(batch);
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
