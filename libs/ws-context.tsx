"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

type Listener = (data: unknown) => void;

interface WsContextValue {
    subscribe: (type: string, fn: Listener) => void;
    unsubscribe: (type: string, fn: Listener) => void;
}

const WsContext = createContext<WsContextValue | null>(null);

const RECONNECT_BASE_MS = 3000;
const RECONNECT_MAX_MS = 30000;

export function WsProvider({ children, jwt }: { children: React.ReactNode; jwt: string | null }) {
    const listenersRef = useRef<Map<string, Set<Listener>>>(new Map());

    useEffect(() => {
        let destroyed = false;
        let attempt = 0;
        let timeoutId: ReturnType<typeof setTimeout>;
        let currentWs: WebSocket | null = null;

        const url = jwt
            ? `${process.env.NEXT_PUBLIC_WS_URL}/ws?jwt=${jwt}`
            : `${process.env.NEXT_PUBLIC_WS_URL}/ws`;

        const connect = () => {
            const ws = new WebSocket(url);
            currentWs = ws;

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
            };

            ws.onclose = () => {
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
            currentWs?.close();
        };
    }, [jwt]);

    const value = useMemo<WsContextValue>(() => ({
        subscribe: (type, fn) => {
            const map = listenersRef.current;
            if (!map.has(type)) map.set(type, new Set());
            map.get(type)!.add(fn);
        },
        unsubscribe: (type, fn) => {
            listenersRef.current.get(type)?.delete(fn);
        },
    }), []);

    return <WsContext.Provider value={value}>{children}</WsContext.Provider>;
}

export function useWsContext() {
    const ctx = useContext(WsContext);
    if (!ctx) throw new Error('useWsContext must be used within WsProvider');
    return ctx;
}
