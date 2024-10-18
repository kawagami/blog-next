'use client'

import { useState, useEffect, useRef } from 'react';

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
        props.messages.reverse().map(historyMessage => setMessages(prevMessages => [...prevMessages, { message_type: historyMessage.message_type, content: historyMessage.content, from: historyMessage.from, to: historyMessage.to }]));

        const webSocket = new WebSocket(`wss://axum.kawa.homes/ws?token=${username}`);
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
        let msg = {
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
        <>
            <div className="flex flex-col h-full w-[850px] justify-center items-center bg-gray-200 dark:bg-gray-800 p-6">
                <div className="w-full max-w-4xl bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex">
                    {/* 左側：目前在線使用者 */}
                    <div className="w-1/4 bg-blue-100 dark:bg-gray-600 rounded-lg p-4 h-96 overflow-y-auto">
                        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">目前在線使用者</h2>
                        <ul>
                            {onlineUsers.map((user, index) => (
                                <li key={index} className="text-sm text-gray-800 dark:text-gray-300">{user}</li>
                            ))}
                        </ul>
                    </div>

                    {/* 右側：訊息列表 */}
                    <div className="w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 ml-4 h-96 overflow-y-auto" ref={messageBoxRef}>
                        <ul className="space-y-2">
                            {
                                messages.map((msg, index) => {
                                    let content;

                                    switch (msg.message_type) {
                                        case "Message":
                                            content = (
                                                <li
                                                    key={index}
                                                    className={`p-2 shadow-sm rounded-lg ${msg.from === username ? 'bg-green-100 dark:bg-green-600 text-right ml-auto' : 'bg-white dark:bg-gray-700 text-left'}`}
                                                >
                                                    {msg.from !== username ? (
                                                        <div className="text-left">
                                                            <span className="font-bold text-gray-900 dark:text-white">{msg.from}:</span>
                                                            <div className="text-gray-800 dark:text-gray-300">{msg.content}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-right">
                                                            <span className="font-bold text-gray-900 dark:text-white">{msg.from}:</span>
                                                            <div className="text-gray-800 dark:text-gray-300">{msg.content}</div>
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                            break;

                                        case "Join":
                                            content = (
                                                <li key={index} className="p-2 shadow-sm rounded-lg bg-blue-100 dark:bg-gray-600 text-center">
                                                    <div className="text-gray-800 dark:text-gray-300">{`${msg.from} has joined the chat.`}</div>
                                                </li>
                                            );
                                            break;

                                        case "Leave":
                                            content = (
                                                <li key={index} className="p-2 shadow-sm rounded-lg bg-red-100 dark:bg-gray-600 text-center">
                                                    <div className="text-gray-800 dark:text-gray-300">{`${msg.from} has left the chat.`}</div>
                                                </li>
                                            );
                                            break;

                                        default:
                                            content = null;
                                    }

                                    return content;
                                })
                            }

                        </ul>
                    </div>

                </div>

                {/* 訊息輸入區域 */}
                <div className="mt-4 w-full max-w-4xl flex items-center space-x-4">
                    <input
                        type="text"
                        className="flex-1 bg-white dark:bg-gray-700 shadow-sm rounded-lg p-2 border border-gray-300 dark:border-gray-600 focus:outline-none"
                        placeholder="輸入訊息..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!isConnected} // 當 WebSocket 斷線時禁用輸入框
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!isConnected} // 當 WebSocket 斷線時禁用按鈕
                        className={`${isConnected
                            ? 'bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800'
                            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    >
                        {isConnected ? '發送訊息' : '正在連線...'}
                    </button>
                </div>
            </div>
        </>
    );
}
