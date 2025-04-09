'use client';

import { useState, useEffect, useRef } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSettings from './TimerSettings';
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
        stopBeeping
    } = useTimer();

    const audioRef = useRef(null);

    // 控制音效的播放
    useEffect(() => {
        if (isBeeping && audioRef.current) {
            audioRef.current.play().catch(err => console.error("播放音效失敗:", err));
        } else if (!isBeeping && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        let beepTimer;
        if (isBeeping) {
            beepTimer = setTimeout(() => {
                stopBeeping();
            }, 5 * 60 * 1000); // 5 分鐘後停止
        }

        return () => clearTimeout(beepTimer);
    }, [isBeeping, stopBeeping]);

    // 偵測頁面焦點變化
    useEffect(() => {
        const handleFocus = () => {
            if (isBeeping) {
                stopBeeping();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [isBeeping, stopBeeping]);

    // 處理按下Enter鍵開始倒數
    const handleEnterPress = () => {
        if (!isRunning && !isPaused && !isBeeping) {
            startCountdown();
        }
    };

    return (
        <div className="h-[calc(100svh-120px)] overflow-auto flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600">倒數計時器</h1>
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