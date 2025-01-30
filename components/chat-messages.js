'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import OnlineUsers from '@/components/ws/OnlineUsers';
import MessagesList from '@/components/ws/MessageList';
import MessageInput from '@/components/ws/MessageInput';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function ChatMessages(props) {
    const [username] = useState(Math.random().toString(36).slice(-6));
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageBoxRef = useRef(null);

    // 處理收到的訊息
    const handleMessage = useCallback((message) => {
        setMessages((prevMessages) => [...prevMessages, message]);

        if (message.message_type === "Join" || message.message_type === "Leave") {
            setOnlineUsers(message.content.split(','));
        }
    }, []);

    // 使用自訂 Hook
    const { isConnected, sendMessage: sendWsMessage } = useWebSocket(username, handleMessage);

    useEffect(() => {
        // 先 render 歷史訊息
        props.messages.reverse().forEach(historyMessage => {
            setMessages(prevMessages => [...prevMessages, historyMessage]);
        });
    }, [props.messages]);

    useEffect(() => {
        // 自動捲動到底部
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = useCallback(() => {
        if (inputMessage.trim() === '') return;
        const msg = {
            message_type: "Message",
            from: username,
            content: inputMessage,
            to: "All"
        };
        sendWsMessage(msg);
        setInputMessage('');
    }, [inputMessage, username, sendWsMessage]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }, [sendMessage]);

    return (
        <div className="flex flex-col w-[850px] justify-center items-center bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl">
            <div className="w-full max-w-4xl h-[calc(100svh-250px)] bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex">
                <OnlineUsers users={onlineUsers} />
                <MessagesList
                    messages={messages}
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