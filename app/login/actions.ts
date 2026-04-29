"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface LoginState {
    error?: string;
}

export async function login(currentState: LoginState | undefined, formData: FormData): Promise<LoginState> {
    const cookieStore = await cookies();

    const data = JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    const response = await fetch(`${process.env.API_URL}/jwt`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: data,
    });

    if (response.ok) {
        const token = await response.json();
        cookieStore.set("session", token, {
            maxAge: 60 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        const redirectUrl = (formData.get('redirect') as string) || '/admin';
        redirect(redirectUrl);
    }

    if (response.status === 401 || response.status === 403) {
        return { error: '帳號或密碼錯誤' };
    }

    return { error: `伺服器錯誤 (${response.status})，請稍後再試` };
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    redirect('/login');
}
