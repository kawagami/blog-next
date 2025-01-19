'use client'

import { useState, useEffect, useRef } from 'react';
import OnlineUsers from '@/components/ws/OnlineUsers';
import MessagesList from '@/components/ws/MessageList';
import MessageInput from '@/components/ws/MessageInput';

export default function ChatMessages(props) {
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false); // 追蹤 WebSocket 連線狀態
    const [username] = useState(Math.random().toString(36).slice(-6)); // 固定 username 避免重渲染
    const [messages, setMessages] = useState([]); // 儲存收到的訊息
    const [onlineUsers, setOnlineUsers] = useState([]); // 儲存目前線上的使用者
    const [inputMessage, setInputMessage] = useState(''); // 儲存輸入框的訊息
    const messageBoxRef = useRef(null); // 用來自動捲動的參考
    const pingIntervalRef = useRef(null); // 用來儲存 setInterval 的參考

    useEffect(() => {
        // 先 render 歷史訊息
        props.messages.reverse().map(historyMessage => setMessages(prevMessages => [...prevMessages, { message_type: historyMessage.message_type, content: historyMessage.content, from: historyMessage.from, to: historyMessage.to, created_at: historyMessage.created_at }]));

        const webSocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws?token=${username}`);
        setWs(webSocket);

        webSocket.onopen = () => {
            console.log('WebSocket 已連接');
            setIsConnected(true); // 更新連線狀態

            // 每 45 秒發送一次 PING 訊息
            pingIntervalRef.current = setInterval(() => {
                if (webSocket.readyState === WebSocket.OPEN) {
                    let ping = {
                        message_type: "PING",
                        from: username,
                        content: "PING",
                        to: "Myself"
                    };
                    webSocket.send(JSON.stringify(ping));
                    console.log('PING 發送');
                }
            }, 45000); // 45 秒
        };

        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data); // 假設接收到的是 JSON 格式
            setMessages(prevMessages => [...prevMessages, message]);

            // 如果是 Join 或 Leave 訊息，更新在線使用者
            if (message.message_type === "Join" || message.message_type === "Leave") {
                setOnlineUsers(message.content.split(','));
            }
        };

        webSocket.onclose = () => {
            console.log('WebSocket 已斷線');
            setIsConnected(false); // 更新連線狀態

            // 清理 PING 的定時器
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
                pingIntervalRef.current = null;
            }
        };

        // 清理：元件卸載時關閉 WebSocket 並清除定時器
        return () => {
            webSocket.close();
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
                pingIntervalRef.current = null;
            }
        };
    }, [username]);

    useEffect(() => {
        // 每當 messages 更新後，將訊息區自動捲動到底部
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (inputMessage.trim() === '') return; // 避免發送空訊息
        const msg = {
            message_type: "Message",
            from: username, // 記得在發送訊息時帶上發送者
            content: inputMessage,
            to: "All"
        };
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(msg));
            setInputMessage(''); // 發送後清空輸入框
        } else {
            console.log('WebSocket 尚未連接');
        }
    };

    // 處理按下 Enter 發送訊息
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col w-[850px] justify-center items-center bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl">
            <div className="w-full max-w-4xl h-[calc(100svh-250px)] bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex">
                {/* 左側：目前在線使用者 */}
                <OnlineUsers users={onlineUsers} />

                {/* 右側：訊息列表 */}
                <MessagesList messages={messages} username={username} messageBoxRef={messageBoxRef} />
            </div>

            {/* 訊息輸入區域 */}
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
