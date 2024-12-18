'use server'

import { redirect } from 'next/navigation';
import { cookies } from "next/headers";

async function apiRequest({ url, method = 'GET', headers = {}, body = null }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    const data = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body: body,
        cache: 'no-store',
    };

    const response = await fetch(url, data);

    if (response.status === 401) {
        // cookieStore.set('session', '', { maxAge: 0 });
        redirect(`/login`);
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => null); // 防止 JSON 無法解析
        throw {
            status: response.status,
            statusText: response.statusText,
            errorData,
        };
    }

    return response.json();
}

export default apiRequest;
