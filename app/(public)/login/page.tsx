'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const ERROR_MESSAGES: Record<string, string> = {
    oauth_failed: '登入失敗，請重試',
    oauth_denied: '已取消授權',
}

async function handleLogin(provider: string) {
    const res = await fetch(`/api/auth/${provider}`)
    if (!res.ok) return
    const { url } = await res.json()
    window.location.href = url
}

function LoginContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const errorMsg = error ? (ERROR_MESSAGES[error] ?? '登入失敗，請重試') : null

    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-16">
            <h1 className="text-2xl font-bold">登入</h1>
            {errorMsg && (
                <p className="text-red-500 dark:text-red-400 text-sm">{errorMsg}</p>
            )}
            <div className="flex flex-col gap-3 w-64">
                <button
                    onClick={() => handleLogin('google')}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                    Google 登入
                </button>
                <button
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700 cursor-not-allowed"
                >
                    GitHub 登入 <span className="text-xs">（即將推出）</span>
                </button>
                <button
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700 cursor-not-allowed"
                >
                    LINE 登入 <span className="text-xs">（即將推出）</span>
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
