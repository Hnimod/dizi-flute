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
    "SELECT * FROM practice_sessions WHERE email = ? ORDER BY date DESC"
  )
    .bind(auth.email)
    .all();

  const sessions = result.results.map((row) => ({
    id: row.id,
    date: row.date,
    duration: row.duration,
    notes: row.notes,
  }));

  return new Response(JSON.stringify(sessions), {
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

  const body = (await context.request.json()) as {
    id?: string;
    date: string;
    duration: number;
    notes?: string;
  };

  const id = body.id || crypto.randomUUID();

  await context.env.DB.prepare(
    `INSERT INTO practice_sessions (id, email, date, duration, notes) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO NOTHING`
  )
    .bind(id, auth.email, body.date, body.duration, body.notes ?? "")
    .run();

  return new Response(
    JSON.stringify({ id, date: body.date, duration: body.duration, notes: body.notes ?? "" }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
};
