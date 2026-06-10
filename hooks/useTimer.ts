"use client";

import { useState, useEffect, useCallback } from 'react';

export default function useTimer() {
    const [minutes, setMinutes] = useState(30);
    const [targetTime, setTargetTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(() => minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBeeping, setIsBeeping] = useState(false);
    const isPaused = !isRunning && targetTime !== null;

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

    const updateMinutes = useCallback((m: number) => {
        setMinutes(m);
        if (!isRunning && targetTime === null) {
            setTimeLeft(m * 60);
        }
    }, [isRunning, targetTime]);

    const stopBeeping = useCallback(() => {
        setIsBeeping(false);
    }, []);

    const startCountdown = useCallback(() => {
        const now = new Date().getTime();

        if (!targetTime) {
            setTargetTime(now + minutes * 60 * 1000);
            setTimeLeft(minutes * 60);
        } else if (isPaused) {
            setTargetTime(now + timeLeft * 1000);
        } else {
            return;
        }

        setIsRunning(true);
    }, [targetTime, minutes, timeLeft, isPaused]);

    const pauseCountdown = useCallback(() => {
        setIsRunning(false);
    }, []);

    const resetCountdown = useCallback(() => {
        setIsRunning(false);
        setIsBeeping(false);
        setTargetTime(null);
        setTimeLeft(minutes * 60);
    }, [minutes]);

    return {
        minutes,
        setMinutes: updateMinutes,
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
