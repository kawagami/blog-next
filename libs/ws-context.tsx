"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

type Listener = (data: unknown) => void;

interface WsContextValue {
    subscribe: (type: string, fn: Listener) => void;
    unsubscribe: (type: string, fn: Listener) => void;
    send: (type: string, data?: unknown) => void;
}

const WsContext = createContext<WsContextValue | null>(null);

const RECONNECT_BASE_MS = 3000;
const RECONNECT_MAX_MS = 30000;

export function WsProvider({ children, jwt, wsUrl }: { children: React.ReactNode; jwt: string | null; wsUrl: string }) {
    const listenersRef = useRef<Map<string, Set<Listener>>>(new Map());
    const wsRef = useRef<WebSocket | null>(null);
    // open 前送的訊息暫存，onopen 時 flush（給 mount 即送的 join_queue 用）
    const pendingRef = useRef<string[]>([]);

    useEffect(() => {
        // WS_URL 未設定時直接不建立連線（例如本地後端沒開）
        if (!wsUrl) return;

        let destroyed = false;
        let attempt = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        const url = jwt ? `${wsUrl}/ws?jwt=${jwt}` : `${wsUrl}/ws`;

        const connect = () => {
            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onmessage = (event: MessageEvent) => {
                try {
                    const msg = JSON.parse(event.data as string);
                    listenersRef.current.get(msg.type)?.forEach(fn => fn(msg.data));
                } catch {
                    // ignore non-JSON frames
                }
            };

            ws.onopen = () => {
                attempt = 0;
                const pending = pendingRef.current;
                pendingRef.current = [];
                pending.forEach(frame => ws.send(frame));
            };

            ws.onclose = () => {
                if (wsRef.current === ws) wsRef.current = null;
                if (destroyed) return;
                const delay = Math.min(RECONNECT_BASE_MS * 2 ** attempt, RECONNECT_MAX_MS);
                attempt++;
                timeoutId = setTimeout(connect, delay);
            };
        };

        connect();

        return () => {
            destroyed = true;
            clearTimeout(timeoutId);
            wsRef.current?.close();
            wsRef.current = null;
        };
    }, [jwt, wsUrl]);

    const value = useMemo<WsContextValue>(() => ({
        subscribe: (type, fn) => {
            const map = listenersRef.current;
            if (!map.has(type)) map.set(type, new Set());
            map.get(type)!.add(fn);
        },
        unsubscribe: (type, fn) => {
            listenersRef.current.get(type)?.delete(fn);
        },
        send: (type, data) => {
            const frame = JSON.stringify(data === undefined ? { type } : { type, data });
            const ws = wsRef.current;
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(frame);
            } else {
                // 連線未開：暫存，onopen flush
                pendingRef.current.push(frame);
            }
        },
    }), []);

    return <WsContext.Provider value={value}>{children}</WsContext.Provider>;
}

export function useWsContext() {
    const ctx = useContext(WsContext);
    if (!ctx) throw new Error('useWsContext must be used within WsProvider');
    return ctx;
}
