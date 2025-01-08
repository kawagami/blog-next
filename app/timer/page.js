'use client';

import { useState, useEffect } from "react";

const CountdownTimer = ({ durationInMinutes, alertTimes, isPaused, onAlert, onReset, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60); // 剩餘秒數
    const [triggeredAlerts, setTriggeredAlerts] = useState(new Set()); // 已觸發提示音的時間點

    useEffect(() => {
        if (isPaused) return; // 如果暫停，不執行計時邏輯

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const newTimeLeft = prev - 1;
                const minutesLeft = Math.ceil(newTimeLeft / 60);

                // 如果時間點符合且尚未觸發，發出提示音
                if (alertTimes.includes(minutesLeft) && !triggeredAlerts.has(minutesLeft)) {
                    onAlert();
                    setTriggeredAlerts((prevSet) => new Set(prevSet).add(minutesLeft)); // 標記為已觸發
                }

                if (newTimeLeft === 0) {
                    onComplete(); // 倒數完成
                }

                return Math.max(newTimeLeft, 0); // 確保時間不會低於 0
            });
        }, 1000);

        return () => clearInterval(timer); // 清除定時器
    }, [isPaused, alertTimes, onAlert, onComplete, triggeredAlerts]);

    // 將秒數轉換為 分鐘:秒 格式
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        setTimeLeft(durationInMinutes * 60); // 重置倒數
        setTriggeredAlerts(new Set()); // 重置已觸發的時間點
    }, [durationInMinutes, onReset]);

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-700">Countdown Timer</h2>
            <div className="text-5xl font-bold text-blue-600">
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};

export default function Home() {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [resetCounter, setResetCounter] = useState(0);
    const [completedRounds, setCompletedRounds] = useState(0);
    const [roundDuration, setRoundDuration] = useState(35); // 每輪持續時間，預設為 35 分鐘
    const [alertTimes, setAlertTimes] = useState("30,0"); // 提示音時間點，預設為 30 分鐘和 0 分鐘
    const [alertTimesRaw, setAlertTimesRaw] = useState("30,0"); // 用於顯示原始用戶輸入

    // 播放提示音
    const playAlertSound = () => {
        const audio = new Audio("/beep.mp3"); // 確保專案根目錄的 `public` 資料夾中有 `beep.mp3`
        audio.play();
    };

    // 當計時完成時觸發
    const handleComplete = () => {
        setCompletedRounds((prev) => prev + 1); // 增加完成次數
        setResetCounter((prev) => prev + 1); // 重置倒數，開始下一次
    };

    const startTimer = () => {
        setIsTimerActive(true);
        setIsPaused(false);
    };

    const pauseTimer = () => {
        setIsPaused((prev) => !prev); // 切換暫停狀態
    };

    const cancelTimer = () => {
        setIsTimerActive(false);
        setIsPaused(false);
        setCompletedRounds(0); // 重置完成次數
    };

    const resetTimer = () => {
        setResetCounter((prev) => prev + 1); // 增加重置計數器，觸發重置
        setIsPaused(false);
        setCompletedRounds(0); // 重置完成次數
    };

    const handleDurationChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setRoundDuration(value > 0 ? value : 1); // 確保輸入為正整數
    };

    const handleAlertTimesChange = (e) => {
        const value = e.target.value;

        // 更新原始輸入值，用於顯示
        setAlertTimesRaw(value);

        try {
            // 將輸入分隔為有效數字，過濾非數字與負數值
            const parsedTimes = value
                .split(",")
                .map((time) => parseInt(time.trim(), 10))
                .filter((time) => !isNaN(time) && time >= 0);

            setAlertTimes(parsedTimes); // 更新有效的提示時間點
        } catch {
            // 如果解析失敗，清空有效提示時間點
            setAlertTimes([]);
        }
    };

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto flex flex-col justify-start items-center py-10">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Flexible Countdown Timer
                </h1>
                {!isTimerActive ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="roundDuration" className="text-gray-600 font-bold">
                                Round Duration (minutes):
                            </label>
                            <input
                                type="number"
                                id="roundDuration"
                                value={roundDuration}
                                onChange={handleDurationChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="alertTimes" className="text-gray-600 font-bold">
                                Alert Times (minutes, separated by commas):
                            </label>
                            <input
                                type="text"
                                id="alertTimes"
                                value={alertTimesRaw} // 顯示用戶的原始輸入
                                onChange={handleAlertTimesChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={startTimer}
                            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                        >
                            Start Timer
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <CountdownTimer
                            durationInMinutes={roundDuration}
                            alertTimes={alertTimes}
                            isPaused={isPaused}
                            onAlert={playAlertSound}
                            onReset={resetCounter}
                            onComplete={handleComplete}
                        />
                        <p className="text-center text-lg font-bold text-green-600">
                            Completed Rounds: {completedRounds}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={pauseTimer}
                                className={`flex-1 py-2 text-white font-bold rounded ${isPaused
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-yellow-500 hover:bg-yellow-600"
                                    } transition`}
                            >
                                {isPaused ? "Resume" : "Pause"}
                            </button>
                            <button
                                onClick={cancelTimer}
                                className="flex-1 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={resetTimer}
                                className="flex-1 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
