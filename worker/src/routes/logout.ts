import { hashSessionToken, getSessionToken } from "../utils/auth";

export async function logout(request: Request, env: Env, corsHeaders: HeadersInit): Promise<Response> {
    const sessionToken = getSessionToken(request);
    if (sessionToken) {
        const sessionHash = await hashSessionToken(sessionToken);
        await env.DB
            .prepare(`
                DELETE FROM sessions
                WHERE session_hash = ?
            `)
            .bind(sessionHash)
            .run();
    }
    
    // Remove the cookie from the user's browser
    const headers = new Headers(corsHeaders);
    headers.append(
        "Set-Cookie",
        [
            "session=",
            "HttpOnly",
            "Path=/",
            "Max-Age=28800",
            env.ENVIRONMENT as string === "production" ? "SameSite=None" : "SameSite=Lax",
            ...(env.ENVIRONMENT as string === "production" ? ["Secure"] : []),
        ].join("; ")
    );

    // Return a successful response with the new headers
    return Response.json(
        { success: true },
        { headers }
    );
}