import type { AuthContext } from "../_middleware";

interface Env {
  JWT_SECRET: string;
}

export const onRequestGet: PagesFunction<Env, string, { auth?: AuthContext }> =
  async (context) => {
    const auth = context.data.auth;

    if (!auth) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ email: auth.email, role: auth.role }),
      { headers: { "Content-Type": "application/json" } }
    );
  };
