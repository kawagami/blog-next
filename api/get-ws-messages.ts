"use server";

import type { ChatMessage } from "@/types";

interface GetWsMessagesParams {
    limit?: number;
    before_id?: number;
}

async function getWsMessages({ limit, before_id }: GetWsMessagesParams = {}): Promise<ChatMessage[]> {
    const queryParams = new URLSearchParams();

    if (limit) queryParams.append('limit', String(limit));
    if (before_id) queryParams.append('before_id', String(before_id));

    const url = `${process.env.API_URL}/ws/messages${queryParams.toString() ? `?${queryParams}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch messages');
    }

    return res.json();
}

export default getWsMessages;
