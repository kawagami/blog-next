// app/roster/page.js
import { CalendarDays, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";

export const metadata = {
    title: "Roster Management | Kawa's Blog",
    description: "Manage and view staff shifts",
};

// 模擬資料 (實際開發時可從 API 獲取)
const SHIFTS = [
    { id: 1, name: "Kawa", role: "Frontend", shifts: ["早班", "早班", "休", "晚班", "晚班", "休", "休"] },
    { id: 2, name: "Alice", role: "Backend", shifts: ["晚班", "休", "早班", "早班", "休", "早班", "早班"] },
    { id: 3, name: "Bob", role: "Designer", shifts: ["休", "晚班", "晚班", "休", "晚班", "晚班", "早班"] },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function Roster() {
    return (
        <div className="w-full max-w-6xl px-4 pb-10">
            {/* 頂部控制列 */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <CalendarDays className="text-blue-500" />
                        2024 年 5 月排班表
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-full transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="font-medium px-4">本週 (05/20 - 05/26)</span>
                    <button className="p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-full transition-all">
                        <ChevronRight size={20} />
                    </button>
                    <button className="ml-4 flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-md">
                        <UserPlus size={16} /> 新增排班
                    </button>
                </div>
            </div>

            {/* 排班表主體 */}
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100/50 dark:bg-gray-800/50">
                                <th className="p-4 border-b dark:border-gray-700 font-semibold text-gray-600 dark:text-gray-300">人員 / 職位</th>
                                {DAYS.map((day) => (
                                    <th key={day} className="p-4 border-b dark:border-gray-700 font-semibold text-center">
                                        <div className="text-xs uppercase text-gray-500">{day}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {SHIFTS.map((staff) => (
                                <tr key={staff.id} className="hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
                                    <td className="p-4 border-b dark:border-gray-700">
                                        <div className="font-bold">{staff.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{staff.role}</div>
                                    </td>
                                    {staff.shifts.map((shift, idx) => (
                                        <td key={idx} className="p-2 border-b dark:border-gray-700 text-center">
                                            <ShiftBadge type={shift} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 底部備註 */}
            <div className="mt-6 flex gap-6 justify-center text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span> 早班 (08:00 - 16:00)
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span> 晚班 (16:00 - 00:00)
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span> 休假
                </div>
            </div>
        </div>
    );
}

// 狀態標籤小元件
function ShiftBadge({ type }) {
    const styles = {
        早班: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200",
        晚班: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200",
        休: "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 border-gray-200",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[type] || ""}`}>
            {type}
        </span>
    );
}