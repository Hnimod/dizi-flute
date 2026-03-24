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

  const result = await context.env.DB.prepare(
    "SELECT item_id, url FROM video_links WHERE email = ?"
  )
    .bind(auth.email)
    .all();

  // Group by item_id: { [itemId]: string[] }
  const videoLinks: Record<string, string[]> = {};
  for (const row of result.results) {
    const itemId = row.item_id as string;
    if (!videoLinks[itemId]) videoLinks[itemId] = [];
    videoLinks[itemId].push(row.url as string);
  }

  return new Response(JSON.stringify(videoLinks), {
    headers: { "Content-Type": "application/json" },
  });
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

  const body = (await context.request.json()) as Record<string, string[]>;

  // Replace all video links for this user
  const batch: D1PreparedStatement[] = [
    context.env.DB.prepare("DELETE FROM video_links WHERE email = ?").bind(
      auth.email
    ),
  ];

  for (const [itemId, urls] of Object.entries(body)) {
    for (const url of urls) {
      batch.push(
        context.env.DB.prepare(
          "INSERT INTO video_links (email, item_id, url) VALUES (?, ?, ?)"
        ).bind(auth.email, itemId, url)
      );
    }
  }

  await context.env.DB.batch(batch);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
