import { getCurrentUser } from "../utils/auth";

export async function leaderboard(request: Request, env: Env, corsHeaders: HeadersInit): Promise<Response> {
    if (request.method == "GET") {
        return getLeaderboard(env, corsHeaders);
    }
    else if (request.method == "POST") {
        return submitScore(request, env, corsHeaders);
    }

    return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
    });
}

async function submitScore(request: Request, env: Env, corsHeaders: HeadersInit): Promise<Response> {
    const { time_ms } = await request.json<{
        time_ms: number;
    }>();
    console.log("Leaderboard request received");

    // Ensure the user is authenticated
    const user = await getCurrentUser(request, env);
    if (!user) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401, headers: corsHeaders }
        );
    }

    // Check if the user has an existing entry in the leaderboard
    const existing = await env.DB
        .prepare(
            `
            SELECT time_ms
            FROM leaderboard
            WHERE user_id = ?
            `
        )
        .bind(user.id)
        .first<{ time_ms: number }>();

    // If the user has no existing entry, add one
    if (existing === null) {
        console.log('Inserting new entry...');
        await env.DB
            .prepare(
                `
                INSERT INTO leaderboard (user_id, time_ms, created_at)
                VALUES (?, ?, ?)
                `
            )
            .bind(user.id, time_ms, Date.now())
            .run();
    }

    // If the user has an existing entry and the new time is faster, update it
    else if (time_ms < existing.time_ms) {
        await env.DB
            .prepare(
                `
                UPDATE leaderboard
                SET time_ms = ?, created_at = ?
                WHERE user_id = ?
                `
            )
            .bind(time_ms, Date.now(), user.id)
            .run();
    }

    // Return a successful response with the headers
    return Response.json(
        { success: true },
        { headers: corsHeaders }
    );
}

async function getLeaderboard(env: Env, corsHeaders: HeadersInit) {
    const { results } = await env.DB
        .prepare(
          `
          SELECT l.id as id, u.username AS player, l.time_ms AS time_ms, l.created_at AS created_at
          FROM leaderboard AS l
          JOIN users AS u
          ON u.id = l.user_id
          ORDER BY l.time_ms ASC
          LIMIT 10
          `
        )
        .all();
    return Response.json(results, {
        headers: corsHeaders,
    });
}