import { createSession } from "../utils/auth";
import { hashPassword } from "../utils/password";

export async function register(request: Request, env: Env): Promise<Response> {
    const { username, password } = await request.json<{
        username: string;
        password: string;
    }>();
    
    // Ensure the username is between 3 and 20 characters
    const trimmedUsername = username.trim();
    const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;
    if (!USERNAME_REGEX.test(trimmedUsername)) {
        return Response.json(
            { detail: "Username must be between 3 and 20 characters." },
            { status: 400 },
        );
    }

    // Ensure the password is greater than or equal to 8 characters
    if (password.length < 8) {
        return Response.json(
            { detail: "Password must be at least 8 characters." },
            { status: 400 },
        );
    }

    // Ensure the username is not taken
    const existing = await env.DB
        .prepare(`
            SELECT id
            FROM users
            WHERE username = ?
        `)
        .bind(trimmedUsername)
        .first();
    if (existing) {
        return Response.json(
            { detail: "Username already exists." },
            { status: 409 },
        );
    }

    // Insert the user
    const passwordHash = await hashPassword(password);
    const createdAt = Date.now();
    const result = await env.DB
    .prepare(`
        INSERT INTO users (
            username,
            password_hash,
            created_at
        )
        VALUES (?, ?, ?)
    `)
    .bind(trimmedUsername, passwordHash, createdAt)
    .run();
    
    // Create the session
    const userId: number = Number(result.meta.last_row_id);
    const sessionToken: string = await createSession(env, userId, createdAt);

    // Return the cookie
    const headers = new Headers();
    headers.append(
        "Set-Cookie",
        [
            `session=${sessionToken}`,
            "HttpOnly",
            "Path=/",
            "Max-Age=28800",
            "SameSite=Lax",
            ...(env.ENVIRONMENT as string === "production" ? ["Secure"] : []),
        ].join("; ")
    );
    return Response.json(
        { success: true },
        { headers }
    );
};