export interface Session {
    sessionHash: string;
    userId: number;
    expiresAt: number;
}

export interface User {
    id: number;
    username: string;
}

export async function validateSessionToken(request: Request, env: Env): Promise<Session | null> {
    // Ensure there is a sesion token
    const token = getSessionToken(request);
    if (!token) {
        return null;
    }

    // Ensure the session is stored in the database
    const hash = await hashSessionToken(token);
    const session = await env.DB
        .prepare(`
            SELECT user_id, expires_at
            FROM sessions
            WHERE session_hash = ?
        `)
        .bind(hash)
        .first<{
            user_id: number;
            expires_at: number;
        }>();
    if (!session) {
        return null;
    }

    // Ensure the session isn't expired
    if (Date.now() > session.expires_at) {
        await env.DB.prepare(`
            DELETE FROM sessions
            WHERE session_hash = ?
        `)
        .bind(hash)
        .run();
        return null;
    }

    // Return the session information
    return {
        sessionHash: hash,
        userId: session.user_id,
        expiresAt: session.expires_at,
    };
}

export async function createSession(env: Env, userId: number, createdAt: number): Promise<string> {
    const expiresAt = createdAt + (1000 * 60 * 60 * 8);
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const sessionToken: string = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    const sessionHash = await hashSessionToken(sessionToken);
    await env.DB
        .prepare(`
            INSERT INTO sessions (
                session_hash,
                user_id,
                created_at,
                expires_at
            )
            VALUES (?, ?, ?, ?)
        `)
        .bind(sessionHash, userId, createdAt, expiresAt)
        .run();
    return sessionToken;
}

export function getSessionToken(request: Request): string | null {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
        return null;
    }
    const cookies = cookieHeader.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "session") {
            return value;
        }
    }
    return null;
}

export async function hashSessionToken(sessionToken: string): Promise<string> {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        encoder.encode(sessionToken)
    );
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

export async function getCurrentUser(request: Request, env: Env): Promise<User | null> {
    // Ensure the session is valid
    const session = await validateSessionToken(request, env);
    if (!session) {
        return null;
    }

    // Return the user
    return await env.DB
        .prepare(`
        SELECT id, username
        FROM users
        WHERE id = ?
        `)
        .bind(session.userId)
        .first<User>();
}