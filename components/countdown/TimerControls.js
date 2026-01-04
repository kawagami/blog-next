"use client";

export default function TimerControls({
    isRunning,
    isPaused,
    isBeeping,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    stopBeeping
}) {
    return (
        <>
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
        </>
    );
}