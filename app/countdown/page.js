'use client';

import { useState, useEffect, useRef } from 'react';

export default function CountDownPage() {
    const [minutes, setMinutes] = useState(30); // 預設 30 分鐘
    const [targetTime, setTargetTime] = useState(null); // 絕對時間
    const [timeLeft, setTimeLeft] = useState(0); // 剩餘秒數
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // 暫停狀態
    const [isBeeping, setIsBeeping] = useState(false);
    const audioRef = useRef(null);

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

    // 控制音效的播放
    useEffect(() => {
        let beepTimer;
        if (isBeeping) {
            audioRef.current.play();
            beepTimer = setTimeout(() => {
                setIsBeeping(false);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }, 5 * 60 * 1000); // 5 分鐘後停止
        }
        return () => clearTimeout(beepTimer);
    }, [isBeeping]);

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
    }, [isBeeping]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

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
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const stopBeeping = () => {
        setIsBeeping(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    return (
        <div className="h-[calc(100svh-120px)] overflow-auto flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600">倒數計時器</h1>
                <div className="mb-6">
                    <label className="text-lg font-medium block mb-2 text-gray-700">
                        設定分鐘數：
                    </label>
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        min="1"
                        max="120"
                        disabled={isRunning || isPaused || isBeeping}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div className="text-6xl font-mono text-center text-blue-800 bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                    {formatTime(timeLeft)}
                </div>
                {!isRunning && !isPaused && !isBeeping && (
                    <button
                        onClick={startCountdown}
                        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        開始倒數
                    </button>
                )}
                {isRunning && (
                    <button
                        onClick={pauseCountdown}
                        className="w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        暫停
                    </button>
                )}
                {isPaused && (
                    <button
                        onClick={startCountdown}
                        className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        繼續
                    </button>
                )}
                {(isRunning || isPaused || isBeeping) && (
                    <button
                        onClick={resetCountdown}
                        className="w-full px-6 py-3 mt-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        重置
                    </button>
                )}
                {isBeeping && (
                    <div className="text-center mt-6">
                        <p className="text-xl text-red-600 font-medium mb-4">時間到！播放提醒中...</p>
                        <button
                            onClick={stopBeeping}
                            className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            停止播放
                        </button>
                    </div>
                )}
            </div>
            <audio ref={audioRef} src="/beep.mp3" loop />
        </div>
    );
}
