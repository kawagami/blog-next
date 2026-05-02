"use server";

import { redirect } from 'next/navigation';
import { cookies, headers as nextHeaders } from "next/headers";

interface ApiRequestOptions {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: BodyInit | null;
}

async function apiRequest<T = unknown>({ url, method = 'GET', headers = {}, body = null }: ApiRequestOptions): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    const response = await fetch(url, {
        method,
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...headers,
        },
        body,
        cache: 'no-store',
    });

    if (response.status === 401 || response.status === 403) {
        const headersList = await nextHeaders();
        const referer = headersList.get('referer') || '';
        let redirectPath = '/admin';
        try {
            if (referer) redirectPath = new URL(referer).pathname;
        } catch { /* ignore invalid referer */ }
        redirect(`/admin/login?redirect=${encodeURIComponent(redirectPath)}`);
    }

    const text = await response.text();
    const data = text ? (() => { try { return JSON.parse(text); } catch { return null; } })() : null;

    if (!response.ok) {
        const err = new Error(`API ${response.status}: ${response.statusText}`);
        Object.assign(err, { status: response.status, errorData: data });
        throw err;
    }

    return data as T;
}

export default apiRequest;
