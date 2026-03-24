interface Env {
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD_HASH: string;
  JWT_SECRET: string;
}

async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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

  const body = (await request.json()) as { email?: string; password?: string };
  if (!body.email || !body.password) {
    return new Response(
      JSON.stringify({ error: "Email and password required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const emailMatch =
    body.email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
  const passwordHash = await sha256(body.password);
  const passwordMatch = passwordHash === env.ADMIN_PASSWORD_HASH.toLowerCase();

  if (!emailMatch || !passwordMatch) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = await signJWT(
    {
      sub: body.email.toLowerCase(),
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    },
    env.JWT_SECRET
  );

  return new Response(JSON.stringify({ token, role: "admin" }), {
    headers: { "Content-Type": "application/json" },
  });
};
