"use client";

import { useEffect, useRef } from 'react';
import TimerDisplay from './timer-display';
import TimerControls from './timer-controls';
import TimerSettings from './timer-settings';
import useTimer from '@/hooks/useTimer';

export default function Timer() {
    const {
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
    } = useTimer();

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

    const handleEnterPress = () => {
        if (!isRunning && !isPaused && !isBeeping) startCountdown();
    };

    return (
        <div className="h-[calc(100svh-120px)] overflow-auto flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600 dark:text-blue-400">倒數計時器</h1>
                <TimerSettings
                    minutes={minutes}
                    setMinutes={setMinutes}
                    disabled={isRunning || isPaused || isBeeping}
                    onEnterPress={handleEnterPress}
                />
                <TimerDisplay timeLeft={timeLeft} />
                <TimerControls
                    isRunning={isRunning}
                    isPaused={isPaused}
                    isBeeping={isBeeping}
                    startCountdown={startCountdown}
                    pauseCountdown={pauseCountdown}
                    resetCountdown={resetCountdown}
                    stopBeeping={stopBeeping}
                />
            </div>
            <audio ref={audioRef} src="/beep.mp3" loop />
        </div>
    );
}
