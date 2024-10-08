'use client'
import getWsMessages from '@/api/get-ws-messages';
import { useState, useEffect, useRef } from 'react';

export default function ChatMessages(props) {
    const [ws, setWs] = useState(null);
    const [username] = useState(Math.random().toString(36).slice(-6)); // 固定 username 避免重渲染
    const [messages, setMessages] = useState([]); // 儲存收到的訊息
    const [inputMessage, setInputMessage] = useState(''); // 儲存輸入框的訊息
    const messageBoxRef = useRef(null); // 用來自動捲動的參考

    useEffect(() => {
        // 先取得歷史訊息
        // let historyMessages = await getWsMessages();
        props.messages.map(historyMessage => setMessages(prevMessages => [...prevMessages, { content: historyMessage.message, from: historyMessage.from }]));

        const webSocket = new WebSocket(`wss://axum.kawa.homes/ws?token=${username}`);
        setWs(webSocket);

        webSocket.onopen = () => {
            console.log('WebSocket 已連接');
        };

        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data); // 假設接收到的是 JSON 格式
            setMessages(prevMessages => [...prevMessages, message]); // 將新訊息加到列表中
        };

        webSocket.onclose = () => {
            console.log('WebSocket 已斷線');
        };

        // 清理：元件卸載時關閉 WebSocket
        return () => {
            webSocket.close();
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
            <div className="flex flex-col h-full w-[800px] justify-center items-center bg-gray-100 p-6">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">簡易聊天室</h1>

                    <div className="bg-gray-200 rounded-lg p-4 h-96 overflow-y-auto" ref={messageBoxRef}>
                        <ul className="space-y-2">
                            {messages.map((msg, index) => (
                                <li
                                    key={index}
                                    className={`p-2 shadow-sm rounded-lg ${msg.from === username ? 'bg-green-100 text-right ml-auto' : 'bg-white text-left'}`}
                                >
                                    {msg.from !== username ? (
                                        <div className="text-left">
                                            <span className="font-bold">{msg.from}:</span>
                                            <div>{msg.content}</div>
                                        </div>
                                    ) : (
                                        <div className="text-right">
                                            <span className="font-bold">{msg.from}:</span>
                                            <div>{msg.content}</div>
                                        </div>
                                    )}
                                </li>

                            ))}
                        </ul>
                    </div>

                </div>

                <div className="mt-4 w-full max-w-lg flex items-center space-x-4">
                    <input
                        type="text"
                        className="flex-1 bg-white shadow-sm rounded-lg p-2 border border-gray-300 focus:outline-none"
                        placeholder="輸入訊息..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        發送訊息
                    </button>
                </div>

            </div>
        </>
    );
}
