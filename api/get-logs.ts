"use server";

import adminRequest from "@/libs/adminRequest";
import type { Log, LogLevel } from "@/types";

interface GetLogsParams {
    level?: LogLevel;
    limit?: number;
    offset?: number;
}

async function getLogs({ level, limit = 100, offset = 0 }: GetLogsParams = {}): Promise<Log[]> {
    const params = new URLSearchParams();
    if (level) params.set('level', level);
    params.set('limit', String(limit));
    params.set('offset', String(offset));

    return adminRequest<Log[]>({
        url: `${process.env.API_URL}/logs?${params}`,
    });
}

export default getLogs;
