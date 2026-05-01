"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

type Listener = (data: unknown) => void;

interface WsContextValue {
    subscribe: (type: string, fn: Listener) => void;
    unsubscribe: (type: string, fn: Listener) => void;
}

const WsContext = createContext<WsContextValue | null>(null);

export function WsProvider({ children }: { children: React.ReactNode }) {
    const listenersRef = useRef<Map<string, Set<Listener>>>(new Map());

    useEffect(() => {
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);

        ws.onmessage = (event: MessageEvent) => {
            try {
                const msg = JSON.parse(event.data as string);
                listenersRef.current.get(msg.type)?.forEach(fn => fn(msg.data));
            } catch {
                // ignore non-JSON frames
            }
        };

        return () => ws.close();
    }, []);

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
