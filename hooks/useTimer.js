'use client';

import { useState, useEffect } from 'react';

export default function useTimer() {
    const [minutes, setMinutes] = useState(30); // 預設 30 分鐘
    const [targetTime, setTargetTime] = useState(null); // 絕對時間
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 剩餘秒數
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // 暫停狀態
    const [isBeeping, setIsBeeping] = useState(false);

    // 更新倒數計時
    useEffect(() => {
        let timer;
        if (isRunning && targetTime) {
            timer = setInterval(() => {
                const now = new Date().getTime();
                const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));
                setTimeLeft(remaining);

                // 只有當時間到時，才會觸發提醒
                if (remaining === 0) {
                    setIsRunning(false);
                    setIsBeeping(true);
                    setTargetTime(null);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, targetTime]);

    // 當 minutes 更改時同步更新 timeLeft
    useEffect(() => {
        if (!isRunning && !isPaused) {
            setTimeLeft(minutes * 60);
        }
    }, [minutes, isRunning, isPaused]);

    const startCountdown = () => {
        const now = new Date().getTime();

        // 如果未設置目標時間，使用新的目標時間
        if (!targetTime) {
            setTargetTime(now + minutes * 60 * 1000);
            setTimeLeft(minutes * 60); // 設置剩餘秒數為選定的分鐘數
        } else if (isPaused) {
            // 如果是從暫停恢復，計算新的目標時間
            setTargetTime(now + timeLeft * 1000);
        }

        setIsRunning(true);
        setIsPaused(false);
    };

    const pauseCountdown = () => {
        setIsPaused(true);
        setIsRunning(false);
    };

    const resetCountdown = () => {
        setIsRunning(false);
        setIsPaused(false);
        setIsBeeping(false);
        setTargetTime(null);
        setTimeLeft(minutes * 60);
    };

    const stopBeeping = () => {
        setIsBeeping(false);
    };

    return {
        minutes,
        setMinutes,
        timeLeft,
        isRunning,
        isPaused,
        isBeeping,
        startCountdown,
        pauseCountdown,
        resetCountdown,
        stopBeeping
    };
}