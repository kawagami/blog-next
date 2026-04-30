"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    redirect('/login');
}
