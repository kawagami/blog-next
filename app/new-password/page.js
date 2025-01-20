'use client';

import { useState } from "react";
import getNewPassword from "@/api/get-new-password";

export default function NewPasswordPage() {
    const [count, setCount] = useState(5);
    const [length, setLength] = useState(12);
    const [newPasswords, setNewPasswords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(""); // 用於顯示通知訊息

    const fetchNewPasswords = async () => {
        setIsLoading(true);
        try {
            const passwords = await getNewPassword(count, length);
            setNewPasswords(passwords);
        } catch (error) {
            setNewPasswords(["Failed to fetch passwords"]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (password) => {
        navigator.clipboard.writeText(password)
            .then(() => {
                setNotification("密碼已複製");
                setTimeout(() => setNotification(""), 2000); // 2秒後清除通知
            })
            .catch(() => {
                setNotification("複製失敗");
                setTimeout(() => setNotification(""), 2000);
            });
    };

    const handleCountChange = (value) => {
        const newValue = Math.min(Math.max(Number(value), 1), 50);
        setCount(newValue);
    };

    const handleLengthChange = (value) => {
        const newValue = Math.min(Math.max(Number(value), 1), 300);
        setLength(newValue);
    };

    return (
        <div className="w-full h-[calc(100svh-120px)] text-center overflow-auto p-4">
            {/* 通知訊息 */}
            {notification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
                    {notification}
                </div>
            )}

            {/* 輸入框部分 */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <div>
                    <label htmlFor="count" className="mr-2">個數:</label>
                    <input
                        id="count"
                        type="number"
                        value={count}
                        onChange={(e) => handleCountChange(e.target.value)}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
                <div>
                    <label htmlFor="length" className="mr-2">長度:</label>
                    <input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => handleLengthChange(e.target.value)}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
            </div>

            {/* 按鈕 */}
            <button
                onClick={fetchNewPasswords}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Generate Passwords"}
            </button>

            {/* 密碼顯示部分 */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">生成密碼:</h2>
                {isLoading ? (
                    <div className="mt-4">Loading...</div>
                ) : newPasswords.length > 0 ? (
                    <ul className="mt-2 text-center">
                        {newPasswords.map((password, index) => (
                            <li key={index} className="mb-1 flex justify-center items-center gap-2">
                                <span>{password}</span>
                                <button
                                    onClick={() => handleCopy(password)}
                                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                                >
                                    複製
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>尚未生成密碼</p>
                )}
            </div>
        </div>
    );
}
