"use client";

import { useState, useTransition } from "react";
import getLogs from "@/api/get-logs";
import type { Log, LogLevel } from "@/types";

const LIMIT = 100;

const LEVEL_BADGE: Record<LogLevel, string> = {
    ERROR: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    WARN: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    INFO: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
};

const ROW_BG: Record<LogLevel, string> = {
    ERROR: "bg-red-50 dark:bg-red-900/10 hover:bg-red-100/70 dark:hover:bg-red-900/20",
    WARN: "bg-yellow-50 dark:bg-yellow-900/10 hover:bg-yellow-100/70 dark:hover:bg-yellow-900/20",
    INFO: "hover:bg-gray-50 dark:hover:bg-gray-800/50",
};

type LevelFilter = '' | LogLevel;

interface Props {
    initialLogs: Log[];
}

export default function LogsClient({ initialLogs }: Props) {
    const [logs, setLogs] = useState<Log[]>(initialLogs);
    const [level, setLevel] = useState<LevelFilter>('');
    const [offset, setOffset] = useState(initialLogs.length);
    const [hasMore, setHasMore] = useState(initialLogs.length >= LIMIT);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleFilterChange(newLevel: LevelFilter) {
        if (newLevel === level || isPending) return;
        setError(null);
        startTransition(async () => {
            const result = await getLogs({ level: newLevel || undefined, limit: LIMIT, offset: 0 });
            if (!result.ok) {
                setError("無 log:read 權限");
                return;
            }
            setLevel(newLevel);
            setLogs(result.data);
            setOffset(result.data.length);
            setHasMore(result.data.length >= LIMIT);
        });
    }

    function handleLoadMore() {
        if (isPending) return;
        setError(null);
        startTransition(async () => {
            const result = await getLogs({ level: level || undefined, limit: LIMIT, offset });
            if (!result.ok) {
                setError("無 log:read 權限");
                return;
            }
            setLogs(prev => [...prev, ...result.data]);
            setOffset(prev => prev + result.data.length);
            setHasMore(result.data.length >= LIMIT);
        });
    }

    return (
        <div className="w-full h-screen overflow-auto p-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
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
                                        ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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

                <div className={`bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-opacity ${isPending ? 'opacity-60' : ''}`}>
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-16">ID</th>
                                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-20">Level</th>
                                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Message</th>
                                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 hidden lg:table-cell">Target</th>
                                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 hidden xl:table-cell">File</th>
                                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-44">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        {isPending ? 'Loading...' : 'No logs found'}
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className={`border-b border-gray-100 dark:border-gray-800 ${ROW_BG[log.level]}`}
                                    >
                                        <td className="px-4 py-2 text-gray-500 dark:text-gray-500 font-mono">{log.id}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_BADGE[log.level]}`}>
                                                {log.level}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-mono break-all">{log.message}</td>
                                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400 font-mono text-xs hidden lg:table-cell">{log.target}</td>
                                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400 font-mono text-xs hidden xl:table-cell">
                                            {log.file}:{log.line}
                                        </td>
                                        <td className="px-4 py-2 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
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
                            className="px-6 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 disabled:opacity-50 text-sm font-medium transition-colors"
                        >
                            {isPending ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
