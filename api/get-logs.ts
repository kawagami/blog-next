"use server";

import adminRequest from "@/libs/adminRequest";
import type { Log, LogLevel } from "@/types";

interface GetLogsParams {
    level?: LogLevel;
    page?: number;
    per_page?: number;
}

async function getLogs({ level, page = 1, per_page = 100 }: GetLogsParams = {}): Promise<Log[]> {
    const params = new URLSearchParams();
    if (level) params.set('level', level);
    params.set('page', String(page));
    params.set('per_page', String(per_page));

    return adminRequest<Log[]>({
        url: `${process.env.API_URL}/logs?${params}`,
    });
}

export default getLogs;
