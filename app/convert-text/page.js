"use client";

import { useState, useEffect, useActionState } from "react";
import { convertTextAction } from "@/app/actions/convert";

export default function ConvertText() {
    // 初始狀態
    const initialState = {
        status: null,
        message: null,
        converted_text: ''
    };

    // 使用 useActionState 替代多個 useState
    const [state, formAction, isPending] = useActionState(convertTextAction, initialState);
    const [notification, setNotification] = useState(null);

    // 處理複製功能
    const handleCopy = async () => {
        if (!state.converted_text.trim()) {
            setNotification({ type: "error", message: "沒有可以複製的文本" });
            return;
        }

        try {
            await navigator.clipboard.writeText(state.converted_text);
            setNotification({ type: "success", message: "文本已成功複製到剪貼板" });
        } catch (error) {
            console.error("複製失敗:", error);
            setNotification({ type: "error", message: "複製失敗，請手動嘗試" });
        }
    };

    // 處理通知顯示
    useEffect(() => {
        // 當狀態變化且有 message 時，更新通知
        if (state.status && state.message) {
            setNotification({
                type: state.status,
                message: state.message
            });
        }
    }, [state.status, state.message]);

    // 自動隱藏通知
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">簡體中文轉繁體中文</h1>

            <form action={formAction} className="w-4/6 flex flex-col items-center">
                <textarea
                    name="inputText"
                    rows="5"
                    cols="50"
                    placeholder="請輸入簡體中文"
                    className="w-full mb-3 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-5 py-2 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                    disabled={isPending}
                >
                    {isPending ? "處理中..." : "轉換為繁體"}
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-2">轉換結果：</h2>
            <textarea
                rows="5"
                cols="50"
                readOnly
                value={state.converted_text}
                className="w-4/6 p-3 text-lg border border-gray-300 rounded-md bg-gray-100"
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
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-md shadow-lg text-white ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
}