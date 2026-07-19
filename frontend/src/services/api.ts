import type { CreateLeaderboardEntryRequest } from "../types/CreateLeaderboardEntryRequest";

const BASE_URL = import.meta.env.VITE_API_URL;

async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });
    if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
            const error = await res.json();
            if (error.detail) {
                message = error.detail;
            }
        } catch {}
        throw new Error(message);
    }
    return res;
}

export async function getLeaderboardEntries() {
    const res = await apiFetch("/leaderboard");
    return res.json();
}

export async function submitLeaderboardEntry(entry: CreateLeaderboardEntryRequest) {
    const res = await apiFetch("/leaderboard", {method: "POST", body: JSON.stringify(entry)});
    return res.json();
}