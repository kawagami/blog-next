'use client';

export default function TimerSettings({ minutes, setMinutes, disabled, onEnterPress }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onEnterPress();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <label className="text-lg font-medium block mb-2 text-gray-700">
                設定分鐘數：
            </label>
            <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                min="1"
                max="120"
                disabled={disabled}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !disabled) {
                        e.preventDefault();
                        onEnterPress();
                    }
                }}
            />
        </form>
    );
}