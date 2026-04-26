"use client";

import { useState, useEffect, useRef } from 'react';
import OnlineUsers from '@/components/ws/online-users';
import MessagesList from '@/components/ws/message-list';
import MessageInput from '@/components/ws/message-input';
import type { ChatMessage } from '@/types';

interface Props {
    messages: ChatMessage[];
}

export default function ChatMessages({ messages: initialMessages }: Props) {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [username] = useState(Math.random().toString(36).slice(-6));
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageBoxRef = useRef<HTMLDivElement>(null);
    const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        initialMessages.slice().reverse().forEach(historyMessage =>
            setMessages(prev => [...prev, {
                message_type: historyMessage.message_type,
                content: historyMessage.content,
                from: historyMessage.from,
                to: historyMessage.to,
                created_at: historyMessage.created_at,
            }])
        );

        const webSocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws?token=${username}`);
        setWs(webSocket);

        webSocket.onopen = () => {
            setIsConnected(true);
            pingIntervalRef.current = setInterval(() => {
                if (webSocket.readyState === WebSocket.OPEN) {
                    webSocket.send(JSON.stringify({ message_type: "PING", from: username, content: "PING", to: "Myself" }));
                }
            }, 45000);
        };

        webSocket.onmessage = (event: MessageEvent) => {
            const message: ChatMessage = JSON.parse(event.data as string);
            setMessages(prev => [...prev, message]);
            if (message.message_type === "Join" || message.message_type === "Leave") {
                setOnlineUsers(message.content.split(','));
            }
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
    }, [username]);

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (inputMessage.trim() === '') return;
        const msg = { message_type: "Message", from: username, content: inputMessage, to: "All" };
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(msg));
            setInputMessage('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') sendMessage();
    };

    return (
        <div className="flex flex-col w-[850px] justify-center items-center bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl">
            <div className="w-full max-w-4xl h-[calc(100svh-250px)] bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex">
                <OnlineUsers users={onlineUsers} />
                <MessagesList
                    messages={messages}
                    setMessages={setMessages}
                    username={username}
                    messageBoxRef={messageBoxRef}
                />
            </div>
            <MessageInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                isConnected={isConnected}
                handleKeyDown={handleKeyDown}
            />
        </div>
    );
}
