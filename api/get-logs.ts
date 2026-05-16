import type { Log, LogLevel } from "@/types";

interface GetLogsParams {
    level?: LogLevel;
    limit?: number;
    offset?: number;
}

export class LogAuthError extends Error {
    status: 401 | 403;
    constructor(status: 401 | 403) {
        super(`Auth error: ${status}`);
        this.status = status;
    }
}

async function getLogs({ level, limit = 100, offset = 0 }: GetLogsParams = {}): Promise<Log[]> {
    const params = new URLSearchParams();
    if (level) params.set('level', level);
    params.set('limit', String(limit));
    params.set('offset', String(offset));

    const response = await fetch(`/api/logs?${params}`, { cache: 'no-store' });

    if (response.status === 401) throw new LogAuthError(401);
    if (response.status === 403) throw new LogAuthError(403);
    if (!response.ok) throw new Error(`API ${response.status}: ${response.statusText}`);

    return response.json();
}

export default getLogs;
