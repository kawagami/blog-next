"use client";

import { useEffect, useState } from 'react';

export function useWsNotification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws/`);

        ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                if (msg.type !== 'stock_completed' && msg.type !== 'stock_failed') return;

                const id = Date.now() + Math.random();
                setNotifications(prev => [...prev, { id, type: msg.type, data: msg.data }]);
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== id));
                }, 5000);
            } catch {
                // ignore non-JSON frames
            }
        };

        return () => ws.close();
    }, []);

    const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

    return { notifications, dismiss };
}
