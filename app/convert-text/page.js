'use client';

import postConvertText from "@/api/post-convert-text";
import { useState, useEffect } from "react";

export default function ConvertText() {
    const [inputText, setInputText] = useState(""); // 用戶輸入的簡體中文
    const [outputText, setOutputText] = useState(""); // 轉換後的繁體中文
    const [notification, setNotification] = useState(null); // 通知訊息

    const handleConvert = async () => {
        if (!inputText.trim()) {
            setNotification({ type: "error", message: "請輸入簡體中文文本" });
            return;
        }
        try {
            const result = await postConvertText(inputText);
            setOutputText(result.converted_text); // 更新轉換結果
            setNotification({ type: "success", message: "轉換成功！" });
        } catch (error) {
            console.error("轉換失敗:", error);
            setNotification({ type: "error", message: "轉換失敗，請稍後再試" });
        }
    };

    const handleCopy = async () => {
        if (!outputText.trim()) {
            setNotification({ type: "error", message: "沒有可以複製的文本" });
            return;
        }
        try {
            await navigator.clipboard.writeText(outputText);
            setNotification({ type: "success", message: "文本已成功複製到剪貼板" });
        } catch (error) {
            console.error("複製失敗:", error);
            setNotification({ type: "error", message: "複製失敗，請手動嘗試" });
        }
    };

    // 自動隱藏通知
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer); // 清理計時器
        }
    }, [notification]);

    return (
        <div className="p-5 font-sans relative">
            <h1 className="text-2xl font-bold mb-4">簡體中文轉繁體中文</h1>
            <textarea
                rows="5"
                cols="50"
                placeholder="請輸入簡體中文"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full mb-3 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleConvert}
                className="px-5 py-2 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            >
                轉換為繁體
            </button>
            <h2 className="text-xl font-semibold mb-2">轉換結果：</h2>
            <textarea
                rows="5"
                cols="50"
                readOnly
                value={outputText}
                className="w-full p-3 text-lg border border-gray-300 rounded-md bg-gray-100"
            />
            <button
                onClick={handleCopy}
                className="px-5 py-2 text-lg bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mt-3"
            >
                複製結果
            </button>

            {/* 通知框 */}
            {notification && (
                <div
                    className={`absolute top-5 right-5 px-4 py-2 rounded-md shadow-lg text-white ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
}
