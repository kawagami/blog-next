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

export class AuditLogAuthError extends Error {
    status: 401 | 403;
    constructor(status: 401 | 403) {
        super(`Auth error: ${status}`);
        this.status = status;
    }
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

    const response = await fetch(`/api/audit_logs?${params}`, { cache: 'no-store' });

    if (response.status === 401) throw new AuditLogAuthError(401);
    if (response.status === 403) throw new AuditLogAuthError(403);
    if (!response.ok) throw new Error(`API ${response.status}: ${response.statusText}`);

    return response.json();
}

export default getAuditLogs;
