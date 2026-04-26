"use client";

import { useState, useEffect } from 'react';

export default function useTimer() {
    const [minutes, setMinutes] = useState(30);
    const [targetTime, setTargetTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isBeeping, setIsBeeping] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isRunning && targetTime) {
            timer = setInterval(() => {
                const now = new Date().getTime();
                const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));
                setTimeLeft(remaining);

                if (remaining === 0) {
                    setIsRunning(false);
                    setIsBeeping(true);
                    setTargetTime(null);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, targetTime]);

    useEffect(() => {
        if (!isRunning && !isPaused) {
            setTimeLeft(minutes * 60);
        }
    }, [minutes, isRunning, isPaused]);

    const startCountdown = () => {
        const now = new Date().getTime();

        if (!targetTime) {
            setTargetTime(now + minutes * 60 * 1000);
            setTimeLeft(minutes * 60);
        } else if (isPaused) {
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
        stopBeeping,
    };
}
