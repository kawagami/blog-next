import { useState, useEffect, useRef, useCallback } from 'react';

export function useWebSocket(username, onMessage) {
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const pingIntervalRef = useRef(null);

    useEffect(() => {
        const webSocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws?token=${username}`);
        setWs(webSocket);

        webSocket.onopen = () => {
            setIsConnected(true);

            // 每 45 秒發送一次 PING 訊息
            pingIntervalRef.current = setInterval(() => {
                if (webSocket.readyState === WebSocket.OPEN) {
                    const ping = {
                        message_type: "PING",
                        from: username,
                        content: "PING",
                        to: "Myself"
                    };
                    webSocket.send(JSON.stringify(ping));
                }
            }, 45000);
        };

        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            onMessage(message); // 將收到的訊息傳遞給父元件處理
        };

        webSocket.onclose = () => {
            setIsConnected(false);
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
                pingIntervalRef.current = null;
            }
        };

        return () => {
            webSocket.close();
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
                pingIntervalRef.current = null;
            }
        };
    }, [username, onMessage]);

    const sendMessage = useCallback((message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
            console.log('WebSocket 尚未連接');
        }
    }, [ws]);

    return { ws, isConnected, sendMessage };
}