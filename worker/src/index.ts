function getCorsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const allowedOrigins = env.ALLOWED_ORIGINS.split(",");

  return {
    ...(origin && allowedOrigins.includes(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
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

    if (url.pathname === "/leaderboard" && request.method === "GET") {
      const { results } = await env.DB
        .prepare(
          `
          SELECT *
          FROM leaderboard
          ORDER BY time_ms ASC
          LIMIT 10
          `
        )
        .all();

      return Response.json(results, {
        headers: corsHeaders,
      });
    }
    else if (url.pathname === "/leaderboard" && request.method === "POST") {
      const { player, time_ms } = await request.json<{
        player: string;
        time_ms: number;
      }>();

      const existing = await env.DB
        .prepare(
          `
          SELECT time_ms
          FROM leaderboard
          WHERE player = ?
          `
        )
        .bind(player)
        .first<{ time_ms: number }>();

        if (existing === null) {
          await env.DB
            .prepare(
              `
              INSERT INTO leaderboard (player, time_ms)
              VALUES (?, ?)
              `
            )
            .bind(player, time_ms)
            .run();
        }

        else if (time_ms < existing.time_ms) {
          await env.DB
            .prepare(
              `
              UPDATE leaderboard
              SET time_ms = ?, created_at = CURRENT_TIMESTAMP
              WHERE player = ?
              `
            )
            .bind(time_ms, player)
            .run();
        }


      return Response.json(
        { success: true },
        { headers: corsHeaders }
      );
    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
} satisfies ExportedHandler<Env>;