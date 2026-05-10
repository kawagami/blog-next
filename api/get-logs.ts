"use server";

import { cookies } from 'next/headers';
import type { Log, LogLevel } from "@/types";

interface GetLogsParams {
    level?: LogLevel;
    limit?: number;
    offset?: number;
}

type GetLogsResult =
    | { ok: true; data: Log[] }
    | { ok: false; status: 401 | 403 };

async function getLogs({ level, limit = 100, offset = 0 }: GetLogsParams = {}): Promise<GetLogsResult> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    const params = new URLSearchParams();
    if (level) params.set('level', level);
    params.set('limit', String(limit));
    params.set('offset', String(offset));

    const response = await fetch(`${process.env.API_URL}/logs?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: 'no-store',
    });

    if (response.status === 401) {
        return { ok: false, status: 401 };
    }

    if (response.status === 403) {
        return { ok: false, status: 403 };
    }

    if (!response.ok) {
        const err = new Error(`API ${response.status}: ${response.statusText}`);
        throw err;
    }

    const data = await response.json();
    return { ok: true, data };
}

export default getLogs;
