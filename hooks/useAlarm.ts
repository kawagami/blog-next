"use client";

import { useState, useEffect, useCallback } from 'react';

export default function useAlarm() {
    const now = new Date();
    const [hour, setHour] = useState(now.getHours());
    const [minute, setMinute] = useState(now.getMinutes());
    const [targetTime, setTargetTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isBeeping, setIsBeeping] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isRunning && targetTime !== null) {
            timer = setInterval(() => {
                const remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
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

    const startAlarm = useCallback(() => {
        const target = new Date();
        target.setHours(hour, minute, 0, 0);
        if (target.getTime() <= Date.now()) {
            target.setDate(target.getDate() + 1);
        }
        const remaining = Math.floor((target.getTime() - Date.now()) / 1000);
        setTargetTime(target.getTime());
        setTimeLeft(remaining);
        setIsRunning(true);
        setIsBeeping(false);
    }, [hour, minute]);

    const resetAlarm = useCallback(() => {
        setIsRunning(false);
        setIsBeeping(false);
        setTargetTime(null);
        setTimeLeft(0);
    }, []);

    const stopBeeping = useCallback(() => {
        setIsBeeping(false);
    }, []);

    return {
        hour,
        setHour,
        minute,
        setMinute,
        timeLeft,
        isRunning,
        isBeeping,
        startAlarm,
        resetAlarm,
        stopBeeping,
    };
}
