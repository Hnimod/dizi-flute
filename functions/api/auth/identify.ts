interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

async function signJWT(
  payload: Record<string, unknown>,
  secret: string
): Promise<string> {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const body = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${header}.${body}`)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${header}.${body}.${sig}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  const body = (await request.json()) as { email?: string };
  if (!body.email || !body.email.includes("@")) {
    return new Response(JSON.stringify({ error: "Valid email required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = body.email.toLowerCase().trim();

  // Auto-create user state if first time
  await env.DB.prepare(
    "INSERT OR IGNORE INTO user_state (email) VALUES (?)"
  )
    .bind(email)
    .run();

  const token = await signJWT(
    {
      sub: email,
      role: "user",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
    },
    env.JWT_SECRET
  );

  return new Response(JSON.stringify({ token, role: "user", email }), {
    headers: { "Content-Type": "application/json" },
  });
};
