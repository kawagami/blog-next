"use client";

import { useState, useEffect } from "react";
import getLogs from "@/api/get-logs";
import usePagedList from "@/hooks/usePagedList";
import type { Log, LogLevel } from "@/types";
import { LEVEL_BADGE, LEVEL_ROW_BG } from "@/libs/badge-styles";

const LIMIT = 100;

type LevelFilter = '' | LogLevel;

export default function LogsClient() {
    const { items: logs, hasMore, isPending, load, loadMore } = usePagedList<Log>(LIMIT);
    const [level, setLevel] = useState<LevelFilter>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        load(page => getLogs({ page, per_page: LIMIT }));
    }, [load]);

    function handleFilterChange(newLevel: LevelFilter) {
        if (newLevel === level || isPending) return;
        setError(null);
        setLevel(newLevel);
        load(page => getLogs({ level: newLevel || undefined, page, per_page: LIMIT }));
    }

    function handleLoadMore() {
        if (isPending) return;
        setError(null);
        loadMore();
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <h1 className="text-xl font-semibold text-stone-800 dark:text-stone-100">
                        Logs
                    </h1>
                    <div className="flex gap-2">
                        {(['', 'INFO', 'WARN', 'ERROR'] as LevelFilter[]).map((lv) => (
                            <button
                                key={lv || 'ALL'}
                                onClick={() => handleFilterChange(lv)}
                                disabled={isPending}
                                className={`px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
                                    level === lv
                                        ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                                }`}
                            >
                                {lv || 'ALL'}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 text-red-700 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className={`bg-white dark:bg-stone-900 shadow-lg rounded-lg overflow-hidden transition-opacity ${isPending ? 'opacity-60' : ''}`}>
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-stone-100 dark:bg-stone-800">
                                <th className="px-4 py-2 text-left text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 w-16">ID</th>
                                <th className="px-4 py-2 text-left text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 w-20">Level</th>
                                <th className="px-4 py-2 text-left text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700">Message</th>
                                <th className="px-4 py-2 text-left text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 hidden lg:table-cell">Target</th>
                                <th className="px-4 py-2 text-left text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 hidden xl:table-cell">File</th>
                                <th className="px-4 py-2 text-left text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 w-44">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-stone-500 dark:text-stone-400">
                                        {isPending ? 'Loading...' : 'No logs found'}
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className={`border-b border-stone-100 dark:border-stone-800 ${LEVEL_ROW_BG[log.level]}`}
                                    >
                                        <td className="px-4 py-2 text-stone-500 dark:text-stone-500 font-mono">{log.id}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_BADGE[log.level]}`}>
                                                {log.level}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-stone-900 dark:text-stone-100 font-mono break-all">{log.message}</td>
                                        <td className="px-4 py-2 text-stone-600 dark:text-stone-400 font-mono text-xs hidden lg:table-cell">{log.target}</td>
                                        <td className="px-4 py-2 text-stone-600 dark:text-stone-400 font-mono text-xs hidden xl:table-cell">
                                            {log.file}:{log.line}
                                        </td>
                                        <td className="px-4 py-2 text-stone-500 dark:text-stone-400 text-xs whitespace-nowrap">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {hasMore && (
                    <div className="flex justify-center pb-4">
                        <button
                            onClick={handleLoadMore}
                            disabled={isPending}
                            className="px-6 py-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 rounded hover:bg-stone-700 dark:hover:bg-stone-300 disabled:opacity-50 text-sm font-medium transition-colors"
                        >
                            {isPending ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
