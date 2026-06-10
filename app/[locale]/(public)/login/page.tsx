'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

async function handleLogin(provider: string) {
    const res = await fetch(`/api/auth/${provider}`)
    if (!res.ok) return
    const { url } = await res.json()
    window.location.href = url
}

function LoginContent() {
    const searchParams = useSearchParams()
    const t = useTranslations('Login')
    const error = searchParams.get('error')

    const errorMsg = error
        ? (error === 'oauth_failed' ? t('errorOauthFailed') : error === 'oauth_denied' ? t('errorOauthDenied') : t('errorDefault'))
        : null

    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-16">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            {errorMsg && (
                <p className="text-red-500 dark:text-red-400 text-sm">{errorMsg}</p>
            )}
            <div className="flex flex-col gap-3 w-64">
                <button
                    onClick={() => handleLogin('google')}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 dark:bg-stone-800 dark:text-white dark:border-stone-600 dark:hover:bg-stone-700 transition-colors"
                >
                    {t('googleLogin')}
                </button>
                <button
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500 dark:border-stone-700 cursor-not-allowed"
                >
                    {t('githubLogin')} <span className="text-xs">（{t('comingSoon')}）</span>
                </button>
                <button
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500 dark:border-stone-700 cursor-not-allowed"
                >
                    {t('lineLogin')} <span className="text-xs">（{t('comingSoon')}）</span>
                </button>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginContent />
        </Suspense>
    )
}
