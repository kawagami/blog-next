'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function login(currentState, formData) {
    const cookieStore = await cookies();

    const data = JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
    });

    const response = await fetch(`${process.env.API_URL}/jwt`, {
        headers: {
            'Content-Type': `application/json`
        },
        method: 'POST',
        body: data
    });

    // 檢查是否成功取得資料
    if (response.ok) {
        const token = await response.json();
        cookieStore.set("session", token, { maxAge: 60 * 60 });
        redirect(`/admin/images`);
    }

    return { error: '未通過驗證' };
    // console.log(token);

    // Redirect to the new post

}