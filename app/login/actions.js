"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function login(currentState, formData) {
    const cookieStore = await cookies();

    const data = JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    const response = await fetch(`${process.env.API_URL}/jwt`, {
        headers: {
            'Content-Type': `application/json`,
        },
        method: 'POST',
        body: data,
    });

    // 檢查是否成功取得資料
    if (response.ok) {
        const token = await response.json();
        cookieStore.set("session", token, { maxAge: 60 * 60 });

        // 從表單數據或狀態中取得 `redirect`（預設為 /admin）
        const redirectUrl = formData.get('redirect') || '/admin';

        redirect(redirectUrl);
    }

    return { error: '未通過驗證' };
}

// Function to clear the session cookie
export async function clearSession() {
    const cookieStore = cookies();
    cookieStore.delete("session"); // Clear session cookie
}
