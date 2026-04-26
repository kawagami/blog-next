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
        cookieStore.set("session", token, { maxAge: 60 * 60 });
        const redirectUrl = (formData.get('redirect') as string) || '/admin';
        redirect(redirectUrl);
    }

    return { error: '未通過驗證' };
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
