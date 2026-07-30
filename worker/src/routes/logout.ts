import { hashSessionToken, getSessionToken } from "../utils/auth";

export async function logout(request: Request, env: Env): Promise<Response> {
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
    const headers = new Headers();
    headers.append(
        "Set-Cookie",
        [
            "session=",
            "HttpOnly",
            "Path=/",
            "Max-Age=28800",
            "SameSite=Lax",
            ...(env.ENVIRONMENT as string === "production" ? ["Secure"] : []),
        ].join("; ")
    );

    // Return a successful response with the new headers
    return Response.json(
        { success: true },
        { headers }
    );
}