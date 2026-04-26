"use server";

import { redirect } from 'next/navigation';
import { cookies } from "next/headers";

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
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body,
        cache: 'no-store',
    });

    if (response.status === 401) {
        redirect(`/login`);
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw {
            status: response.status,
            statusText: response.statusText,
            errorData,
        };
    }

    return response.json();
}

export default apiRequest;
