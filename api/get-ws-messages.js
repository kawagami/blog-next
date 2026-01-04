"use server";

async function getWsMessages({ limit, before_id } = {}) {
    // 建立查詢參數物件
    const queryParams = new URLSearchParams();

    if (limit) queryParams.append('limit', limit);
    if (before_id) queryParams.append('before_id', before_id);

    // 動態生成 URL
    const url = `${process.env.API_URL}/ws/messages${queryParams.toString() ? `?${queryParams}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch messages');
    }

    return res.json();
}

export default getWsMessages;
