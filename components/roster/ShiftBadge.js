// components/roster/ShiftBadge.js

export default function ShiftBadge({ type }) {
    // 定義不同班別的樣式
    // 這裡可以根據你後端回傳的字串來彈性擴張，例如：'Middle' (中班)
    const shiftStyles = {
        "早班": {
            container: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
            dot: "bg-blue-500"
        },
        "晚班": {
            container: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
            dot: "bg-purple-500"
        },
        "休": {
            container: "bg-gray-100 text-gray-400 dark:bg-gray-800/60 dark:text-gray-500 border-gray-200 dark:border-gray-700",
            dot: "bg-gray-400"
        },
        // 預設樣式（防止後端回傳了未定義的班別）
        "default": {
            container: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800",
            dot: "bg-orange-500"
        }
    };

    const currentStyle = shiftStyles[type] || shiftStyles["default"];

    return (
        <span
            className={`
        inline-flex items-center justify-center gap-1.5 
        px-2.5 py-1 rounded-full text-xs font-bold border 
        transition-all duration-200 shadow-sm
        ${currentStyle.container}
      `}
        >
            {/* 小圓點裝飾，增加視覺辨識度 */}
            <span className={`w-1.5 h-1.5 rounded-full ${currentStyle.dot}`} />
            {type}
        </span>
    );
}