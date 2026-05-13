"use client";

import { useEffect, useRef } from 'react';
import AlarmDisplay from './alarm-display';
import AlarmControls from './alarm-controls';
import AlarmSettings from './alarm-settings';
import useAlarm from '@/hooks/useAlarm';

export default function Alarm() {
    const {
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
    } = useAlarm();

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (isBeeping && audioRef.current) {
            audioRef.current.play().catch(err => console.error("播放音效失敗:", err));
        } else if (!isBeeping && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        let beepTimer: ReturnType<typeof setTimeout> | undefined;
        if (isBeeping) {
            beepTimer = setTimeout(() => stopBeeping(), 2 * 60 * 1000);
        }

        return () => clearTimeout(beepTimer);
    }, [isBeeping, stopBeeping]);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible' && isBeeping) {
                resetAlarm();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [isBeeping, resetAlarm]);

    return (
        <div className="h-[calc(100svh-120px)] overflow-auto flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-purple-600 dark:text-purple-400">鬧鐘</h1>
                <AlarmSettings
                    hour={hour}
                    setHour={setHour}
                    minute={minute}
                    setMinute={setMinute}
                    disabled={isRunning || isBeeping}
                />
                <AlarmDisplay timeLeft={timeLeft} isRunning={isRunning} />
                <AlarmControls
                    isRunning={isRunning}
                    isBeeping={isBeeping}
                    startAlarm={startAlarm}
                    resetAlarm={resetAlarm}
                />
            </div>
            <audio ref={audioRef} src="/beep.mp3" loop />
        </div>
    );
}
