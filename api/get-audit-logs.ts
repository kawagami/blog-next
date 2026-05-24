"use server";

import adminRequest from "@/libs/adminRequest";
import type { AuditLog, HttpMethod } from "@/types";

export interface GetAuditLogsParams {
    user_email?: string;
    method?: HttpMethod | '';
    path?: string;
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
}

async function getAuditLogs({
    user_email,
    method,
    path,
    from,
    to,
    limit = 100,
    offset = 0,
}: GetAuditLogsParams = {}): Promise<AuditLog[]> {
    const params = new URLSearchParams();
    if (user_email) params.set('user_email', user_email);
    if (method) params.set('method', method);
    if (path) params.set('path', path);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    params.set('limit', String(limit));
    params.set('offset', String(offset));

    return adminRequest<AuditLog[]>({
        url: `${process.env.API_URL}/admin/audit_logs?${params}`,
    });
}

export default getAuditLogs;
