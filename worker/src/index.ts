import { leaderboard } from "./routes/leaderboard";
import { register } from "./routes/register";
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { me } from "./routes/me";

function getCorsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const allowedOrigins = env.ALLOWED_ORIGINS.split(",");

  return {
    ...(origin && allowedOrigins.includes(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request, env);

	if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/me") {
      return me(request, env, corsHeaders);
    }
    else if (url.pathname === "/leaderboard") {
      return leaderboard(request, env, corsHeaders);
    }
    else if (url.pathname === "/register") {
      return register(request, env, corsHeaders);
    }
    else if (url.pathname === "/login") {
      return login(request, env, corsHeaders);
    }
    else if (url.pathname === "/logout") {
      return logout(request, env, corsHeaders);
    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
} satisfies ExportedHandler<Env>;