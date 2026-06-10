"use server";

import adminRequest from "@/libs/adminRequest";
import type { AuditLog, HttpMethod } from "@/types";

export interface GetAuditLogsParams {
    user_email?: string;
    method?: HttpMethod | '';
    path?: string;
    from?: string;
    to?: string;
    page?: number;
    per_page?: number;
}

async function getAuditLogs({
    user_email,
    method,
    path,
    from,
    to,
    page = 1,
    per_page = 100,
}: GetAuditLogsParams = {}): Promise<AuditLog[]> {
    const params = new URLSearchParams();
    if (user_email) params.set('user_email', user_email);
    if (method) params.set('method', method);
    if (path) params.set('path', path);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    params.set('page', String(page));
    params.set('per_page', String(per_page));

    return adminRequest<AuditLog[]>({
        url: `${process.env.API_URL}/admin/audit_logs?${params}`,
    });
}

export default getAuditLogs;
