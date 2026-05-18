"use client";

import { useRef } from 'react';

interface Props {
    hour: number;
    setHour: (n: number) => void;
    minute: number;
    setMinute: (n: number) => void;
    disabled: boolean;
    onEnterPress: () => void;
}

export default function AlarmSettings({ hour, setHour, minute, setMinute, disabled, onEnterPress }: Props) {
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);

    const selectOnHover = (ref: React.RefObject<HTMLInputElement | null>) => {
        if (!disabled && ref.current) {
            ref.current.focus();
            ref.current.select();
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!disabled) onEnterPress();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <label className="text-lg font-medium block mb-2 text-gray-700 dark:text-gray-300">設定鬧鐘時間：</label>
            <div className="flex items-center gap-2">
                <input
                    ref={hourRef}
                    type="number"
                    value={hour}
                    onChange={(e) => setHour(Math.min(23, Math.max(0, Number(e.target.value))))}
                    onFocus={(e) => e.target.select()}
                    onMouseEnter={() => selectOnHover(hourRef)}
                    min="0"
                    max="23"
                    disabled={disabled}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-xl"
                />
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">:</span>
                <input
                    ref={minuteRef}
                    type="number"
                    value={minute}
                    onChange={(e) => setMinute(Math.min(59, Math.max(0, Number(e.target.value))))}
                    onFocus={(e) => e.target.select()}
                    onMouseEnter={() => selectOnHover(minuteRef)}
                    min="0"
                    max="59"
                    disabled={disabled}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-xl"
                />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                鬧鐘設定：{String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
            </p>
            <button type="submit" className="hidden" />
        </form>
    );
}
