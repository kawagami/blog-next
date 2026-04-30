"use client";

import Link from "next/link";

export default function BlogError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100svh-120px)] gap-4 text-center px-4">
            <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-200">載入失敗</h1>
            <p className="text-gray-500 dark:text-gray-400">無法載入這篇文章。</p>
            {process.env.NODE_ENV === 'development' && (
                <pre className="text-xs text-red-400 max-w-sm overflow-auto">{error.message}</pre>
            )}
            <div className="flex gap-3">
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    重試
                </button>
                <Link href="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    回首頁
                </Link>
            </div>
        </div>
    );
}
