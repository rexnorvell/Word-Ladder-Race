import { createSession } from "../utils/auth";
import { verifyPassword } from "../utils/password";

export async function login(request: Request, env: Env, corsHeaders: HeadersInit): Promise<Response> {
    const { username, password } = await request.json<{
        username: string;
        password: string;
    }>();

    // Ensure the user exists
    const existing = await env.DB
        .prepare(`
            SELECT id, password_hash
            FROM users
            WHERE username = ?
        `)
        .bind(username)
        .first<{
            id: number;
            password_hash: string;
        }>();
    if (!existing) {
        return Response.json(
            { error: "Invalid credentials." },
            { status: 401, headers: corsHeaders }
        );
    }

    // Ensure the password is correct
    const verified: boolean = await verifyPassword(password, existing.password_hash);
    if (!verified) {
        return Response.json(
            { error: "Invalid credentials." },
            { status: 401, headers: corsHeaders }
        );
    }

    // Create the session and add the cookie to the response's headers
    const created_at: number = Date.now();
    const sessionToken = await createSession(
        env,
        existing.id,
        created_at
    );
    const headers = new Headers(corsHeaders);
    headers.append(
        "Set-Cookie",
        [
            `session=${sessionToken}`,
            "HttpOnly",
            "Path=/",
            "Max-Age=28800",
            env.ENVIRONMENT as string === "production" ? "SameSite=None" : "SameSite=Lax",
            ...(env.ENVIRONMENT as string === "production" ? ["Secure"] : []),
        ].join("; ")
    );

    // Return a successful response with the headers
    return Response.json(
        { success: true },
        { headers }
    );
}