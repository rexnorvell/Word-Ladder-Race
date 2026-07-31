import { getCurrentUser } from "../utils/auth";

export async function account(request: Request, env: Env): Promise<Response> {
    
    // Ensure the user is authenticated
    const user = await getCurrentUser(request, env);
    if (!user) {
        return Response.json(
            { detail: "Unauthorized" },
            { status: 401 }
        );
    }

    const result = await env.DB
        .prepare(
            `
            SELECT time_ms AS personal_best, 
            (
                SELECT COUNT(*) + 1
                FROM leaderboard
                WHERE time_ms < l.time_ms
            ) AS rank,
            (
                SELECT COUNT(*)
                FROM leaderboard
            ) AS num_entries
            FROM leaderboard AS l
            WHERE l.user_id = ?
            `
        )
        .bind(user.id)
        .first();

    if (result === null) {
        const total = await env.DB
            .prepare(
                `
                SELECT COUNT(*) AS num_entries
                FROM leaderboard
                `
            )
            .first();
        return Response.json({
            personal_best: null,
            rank: null,
            num_entries: total?.num_entries ?? 0,
        });
    }

    return Response.json(result);
}