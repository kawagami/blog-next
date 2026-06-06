"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Bell, BellOff } from 'lucide-react';

function msToNextHour(): number {
    const now = new Date();
    const next = new Date(now);
    next.setHours(now.getHours() + 1, 0, 0, 0);
    return next.getTime() - now.getTime();
}

function formatTimeLeft(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

export default function HourlyChime() {
    const [enabled, setEnabled] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const [lastChime, setLastChime] = useState<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const clockRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const chime = useCallback(() => {
        const hour = new Date().getHours();
        const utterance = new SpeechSynthesisUtterance(`現在 ${hour} 點整`);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
        setLastChime(`${hour.toString().padStart(2, '0')}:00`);
    }, []);

    const schedule = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            chime();
            schedule();
        }, msToNextHour());
    }, [chime]);

    useEffect(() => {
        if (enabled) {
            schedule();
        } else {
            if (timerRef.current) clearTimeout(timerRef.current);
            speechSynthesis.cancel();
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [enabled, schedule]);

    useEffect(() => {
        clockRef.current = setInterval(() => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${h}:${m}:${s}`);
            setTimeLeft(formatTimeLeft(msToNextHour()));
        }, 1000);
        return () => {
            if (clockRef.current) clearInterval(clockRef.current);
        };
    }, []);

    return (
        <div className="h-[calc(100svh-120px)] overflow-auto flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400">整點報時</h1>

                <div className="text-6xl font-mono font-bold text-gray-800 dark:text-gray-100 tabular-nums">
                    {currentTime || '--:--:--'}
                </div>

                <button
                    onClick={() => setEnabled(v => !v)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-colors ${
                        enabled
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                    }`}
                >
                    {enabled ? <Bell size={20} /> : <BellOff size={20} />}
                    {enabled ? '報時中' : '已停用'}
                </button>

                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                        <span>距下一個整點</span>
                        <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{timeLeft || '--:--'}</span>
                    </div>
                    {lastChime && (
                        <div className="flex justify-between">
                            <span>最近報時</span>
                            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{lastChime}</span>
                        </div>
                    )}
                </div>

                {!enabled && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                        開啟後，每個整點自動播報語音
                    </p>
                )}
            </div>
        </div>
    );
}
