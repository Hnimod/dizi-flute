interface Env {
  DB: D1Database;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD_HASH: string;
  JWT_SECRET: string;
}

export interface AuthContext {
  email: string;
  role: "admin" | "user";
}

async function verifyJWT(
  token: string,
  secret: string
): Promise<AuthContext | null> {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !signatureB64) return null;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signature = Uint8Array.from(
      atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!valid) return null;

    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    );

    if (payload.exp && payload.exp < Date.now() / 1000) return null;

    return { email: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

type PagesFunction = (
  context: EventContext<Env, string, { auth?: AuthContext }>
) => Promise<Response> | Response;

export const onRequest: PagesFunction[] = [
  async (context) => {
    const { request, env, data } = context;
    const method = request.method;
    const url = new URL(request.url);
    const path = url.pathname;

    // Auth endpoints don't need JWT
    if (path.startsWith("/api/auth/")) {
      return context.next();
    }

    // GET on content endpoints is public
    if (
      method === "GET" &&
      (path.startsWith("/api/songs") || path.startsWith("/api/exercises"))
    ) {
      return context.next();
    }

    // Everything else needs a token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      // For GET on /api/me/* without token, return 401
      if (path.startsWith("/api/me/")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Write operations always need auth
      if (method !== "GET") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      return context.next();
    }

    const token = authHeader.slice(7);
    const auth = await verifyJWT(token, env.JWT_SECRET);

    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Admin-only: write operations on content endpoints
    if (
      method !== "GET" &&
      (path.startsWith("/api/songs") || path.startsWith("/api/exercises"))
    ) {
      if (auth.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    data.auth = auth;
    return context.next();
  },
];
