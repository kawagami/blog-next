import type { AuditLog, HttpMethod } from "@/types";

interface GetAuditLogsParams {
    user_email?: string;
    method?: HttpMethod | '';
    path?: string;
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
}

type GetAuditLogsResult =
    | { ok: true; data: AuditLog[] }
    | { ok: false; status: 401 | 403 };

async function getAuditLogs({
    user_email,
    method,
    path,
    from,
    to,
    limit = 100,
    offset = 0,
}: GetAuditLogsParams = {}): Promise<GetAuditLogsResult> {
    const params = new URLSearchParams();
    if (user_email) params.set('user_email', user_email);
    if (method) params.set('method', method);
    if (path) params.set('path', path);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    params.set('limit', String(limit));
    params.set('offset', String(offset));

    const response = await fetch(`/api/audit_logs?${params}`, { cache: 'no-store' });

    if (response.status === 401) return { ok: false, status: 401 };
    if (response.status === 403) return { ok: false, status: 403 };
    if (!response.ok) throw new Error(`API ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return { ok: true, data };
}

export default getAuditLogs;
