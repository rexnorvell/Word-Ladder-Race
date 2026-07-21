const ITERATIONS = 100000;
const KEY_LENGTH = 256;

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
    const hashBuffer = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations: ITERATIONS,
            hash: "SHA-256",
        },
        key,
        KEY_LENGTH
    );
    const hash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    const encodedSalt = Array.from(salt)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return `${encodedSalt}:${hash}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [saltHex, originalHash] = storedHash.split(":");
    const salt = new Uint8Array(
        saltHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
    );
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
    const hashBuffer = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations: ITERATIONS,
            hash: "SHA-256",
        },
        key,
        KEY_LENGTH
    );
    const hash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hash === originalHash;
}