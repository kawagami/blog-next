"use client";

import { useWsContext } from "@/libs/ws-context";
import { useEffect, useState } from "react";
import type { WsEventType } from "@/types";

const EVENT_TYPES: WsEventType[] = [
    'stock_completed',
    'stock_failed',
    'blog_created',
    'user_joined',
    'user_left',
];

interface FeedEntry {
    key: number;
    type: WsEventType;
    data: unknown;
    ts: string;
}

let seq = 0;

export default function NotificationFeed() {
    const { subscribe, unsubscribe } = useWsContext();
    const [entries, setEntries] = useState<FeedEntry[]>([]);

    useEffect(() => {
        const handlers = EVENT_TYPES.map(type => {
            const fn = (data: unknown) => {
                setEntries(prev =>
                    [{ key: ++seq, type, data, ts: new Date().toLocaleTimeString() }, ...prev].slice(0, 100)
                );
            };
            subscribe(type, fn);
            return { type, fn };
        });

        return () => {
            handlers.forEach(({ type, fn }) => unsubscribe(type, fn));
        };
    }, [subscribe, unsubscribe]);

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto p-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">WS Notifications</h1>
                {entries.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Waiting for events…</p>
                ) : (
                    entries.map(entry => (
                        <div key={entry.key} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-sm font-mono">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{entry.type}</span>
                                <span className="text-gray-400 text-xs">{entry.ts}</span>
                            </div>
                            <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all text-xs">
                                {JSON.stringify(entry.data, null, 2)}
                            </pre>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
