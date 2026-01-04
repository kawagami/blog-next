"use client";

import { useRef } from 'react';

export default function TimerSettings({ minutes, setMinutes, disabled, onEnterPress }) {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!disabled) {
            onEnterPress();
        }
    };

    const handleMouseEnter = () => {
        if (!disabled && inputRef.current) {
            // 讓輸入欄位獲得焦點
            inputRef.current.focus();
            // 全選當前輸入值
            inputRef.current.select();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <label className="text-lg font-medium block mb-2 text-gray-700">
                設定分鐘數：
            </label>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    min="1"
                    max="999"
                    disabled={disabled}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    onMouseEnter={handleMouseEnter}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !disabled) {
                            e.preventDefault();
                            onEnterPress();
                        }
                    }}
                />
                {!disabled && (
                    <div className="absolute inset-0 pointer-events-none bg-transparent" />
                )}
            </div>
        </form>
    );
}