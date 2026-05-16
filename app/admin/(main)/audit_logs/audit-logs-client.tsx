"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import getAuditLogs, { AuditLogAuthError } from "@/api/get-audit-logs";
import type { AuditLog, HttpMethod } from "@/types";
import { METHOD_BADGE, httpStatusBadgeClass } from "@/libs/badge-styles";

const LIMIT = 100;
const REDIRECT = '/admin/audit_logs';

interface Filters {
    user_email: string;
    method: HttpMethod | '';
    path: string;
    from: string;
    to: string;
}

const defaultFilters: Filters = { user_email: '', method: '', path: '', from: '', to: '' };

export default function AuditLogsClient() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [appliedFilters, setAppliedFilters] = useState<Filters>(defaultFilters);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const logsRef = useRef<AuditLog[]>([]);
    const appliedFiltersRef = useRef<Filters>(defaultFilters);

    useEffect(() => { logsRef.current = logs; }, [logs]);
    useEffect(() => { appliedFiltersRef.current = appliedFilters; }, [appliedFilters]);

    function handleRedirect(status: 401 | 403) {
        if (status === 401) {
            window.location.href = `/admin/login?redirect=${encodeURIComponent(REDIRECT)}`;
        } else {
            setError("無 audit:read 權限");
        }
    }

    function handleAuthError(e: unknown) {
        if (e instanceof AuditLogAuthError) {
            handleRedirect(e.status);
        }
    }

    useEffect(() => {
        startTransition(async () => {
            try {
                const data = await getAuditLogs({ limit: LIMIT, offset: 0 });
                setLogs(data);
                setOffset(data.length);
                setHasMore(data.length >= LIMIT);
            } catch (e) { handleAuthError(e); }
        });
    }, []);

    useEffect(() => {
        const id = setInterval(async () => {
            try {
                const fresh = await getAuditLogs({ ...appliedFiltersRef.current, limit: LIMIT, offset: 0 });
                const existingIds = new Set(logsRef.current.map(l => l.id));
                const newEntries = fresh.filter(l => !existingIds.has(l.id));
                if (newEntries.length > 0) {
                    setLogs(prev => [...newEntries, ...prev]);
                    setOffset(prev => prev + newEntries.length);
                }
            } catch { /* silent */ }
        }, 600_000);
        return () => clearInterval(id);
    }, []);

    function handleSearch() {
        if (isPending) return;
        setError(null);
        setAppliedFilters(filters);
        startTransition(async () => {
            try {
                const data = await getAuditLogs({ ...filters, limit: LIMIT, offset: 0 });
                setLogs(data);
                setOffset(data.length);
                setHasMore(data.length >= LIMIT);
            } catch (e) { handleAuthError(e); }
        });
    }

    function handleReset() {
        setFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
        setError(null);
        startTransition(async () => {
            try {
                const data = await getAuditLogs({ limit: LIMIT, offset: 0 });
                setLogs(data);
                setOffset(data.length);
                setHasMore(data.length >= LIMIT);
            } catch (e) { handleAuthError(e); }
        });
    }

    function handleLoadMore() {
        if (isPending) return;
        startTransition(async () => {
            try {
                const data = await getAuditLogs({ ...appliedFilters, limit: LIMIT, offset });
                setLogs(prev => [...prev, ...data]);
                setOffset(prev => prev + data.length);
                setHasMore(data.length >= LIMIT);
            } catch (e) { handleAuthError(e); }
        });
    }

    const inputClass = "px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-400";

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Audit Logs</h1>

                {/* Filter bar */}
                <div className="flex flex-wrap gap-2 items-end bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400">User email</label>
                        <input
                            type="text"
                            value={filters.user_email}
                            onChange={e => setFilters(f => ({ ...f, user_email: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            placeholder="admin@example.com"
                            className={`${inputClass} w-48`}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400">Method</label>
                        <select
                            value={filters.method}
                            onChange={e => setFilters(f => ({ ...f, method: e.target.value as HttpMethod | '' }))}
                            className={inputClass}
                        >
                            <option value="">ALL</option>
                            {(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as HttpMethod[]).map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400">Path</label>
                        <input
                            type="text"
                            value={filters.path}
                            onChange={e => setFilters(f => ({ ...f, path: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            placeholder="/images"
                            className={`${inputClass} w-36`}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
                        <input
                            type="datetime-local"
                            value={filters.from}
                            onChange={e => setFilters(f => ({ ...f, from: e.target.value }))}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
                        <input
                            type="datetime-local"
                            value={filters.to}
                            onChange={e => setFilters(f => ({ ...f, to: e.target.value }))}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSearch}
                            disabled={isPending}
                            className="px-4 py-1.5 text-sm font-medium rounded bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
                        >
                            Search
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={isPending}
                            className="px-4 py-1.5 text-sm font-medium rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 text-red-700 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className={`bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-opacity ${isPending ? 'opacity-60' : ''}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-44">Time</th>
                                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">User</th>
                                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-20">Method</th>
                                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Path</th>
                                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 hidden lg:table-cell">Query</th>
                                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-20">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            {isPending ? 'Loading...' : 'No audit logs found'}
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map(log => (
                                        <tr
                                            key={log.id}
                                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        >
                                            <td className="px-4 py-2 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100 text-xs font-mono">
                                                {log.user_email}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${METHOD_BADGE[log.method] ?? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                                    {log.method}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-mono text-xs break-all">
                                                {log.path}
                                            </td>
                                            <td className="px-4 py-2 text-gray-500 dark:text-gray-400 font-mono text-xs hidden lg:table-cell">
                                                {log.query ?? '—'}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${httpStatusBadgeClass(log.status_code)}`}>
                                                    {log.status_code}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
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
