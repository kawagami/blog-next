'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function exchangeOAuthCode(provider: string, code: string, state: string) {
    const res = await fetch(`${process.env.API_URL}/auth/${provider}/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
    })

    if (!res.ok) {
        redirect('/login?error=oauth_failed')
    }

    const { access_token, refresh_token } = await res.json()
    const cookieStore = await cookies()

    cookieStore.set('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60,
    })
    cookieStore.set('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
    })

    redirect('/')
}

export async function refreshTokens(): Promise<boolean> {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (!refreshToken) return false

    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!res.ok) {
        cookieStore.delete('access_token')
        cookieStore.delete('refresh_token')
        return false
    }

    const { access_token, refresh_token } = await res.json()
    cookieStore.set('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60,
    })
    cookieStore.set('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
    })
    return true
}

export async function callApi(path: string, options: RequestInit = {}): Promise<Response> {
    const cookieStore = await cookies()
    let accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        redirect('/login')
    }

    const res = await fetch(`${process.env.API_URL}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            ...(options.headers as Record<string, string>),
        },
    })

    if (res.status === 401) {
        const refreshed = await refreshTokens()
        if (!refreshed) redirect('/login')

        accessToken = cookieStore.get('access_token')?.value
        return fetch(`${process.env.API_URL}${path}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...(options.headers as Record<string, string>),
            },
        })
    }

    return res
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
    redirect('/login')
}
