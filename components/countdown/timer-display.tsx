"use client";

export default function TimerDisplay({ timeLeft }: { timeLeft: number }) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="text-6xl font-mono text-center text-blue-800 dark:text-blue-300 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md mb-6">
            {formatTime(timeLeft)}
        </div>
    );
}
