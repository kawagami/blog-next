// app/roster/page.js

"use client"; // 必須加上這一行，因為有 state 與互動

import { useState } from "react";
import { CalendarDays, Send, Loader2, UserPlus, Trash2 } from "lucide-react";
import ShiftBadge from "@/components/roster/ShiftBadge"; // 建議把小元件抽出來

export default function RosterPage() {
    // --- 狀態管理 ---
    const [names, setNames] = useState(["Kawa", "Alice"]); // 待排班人員
    const [newName, setNewName] = useState("");
    const [days, setDays] = useState(31);
    const [rule, setRule] = useState("fairness"); // 規則：例如 公平優先、成本優先
    const [loading, setLoading] = useState(false);
    const [rosterData, setRosterData] = useState(null); // 儲存後端回傳的結果

    // --- 邏輯處理 ---
    const addName = () => {
        if (newName.trim()) {
            setNames([...names, newName]);
            setNewName("");
        }
    };

    const removeName = (index) => {
        setNames(names.filter((_, i) => i !== index));
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // 呼叫你的 API
            const response = await fetch("/api/generate-roster", {
                method: "POST",
                body: JSON.stringify({ names, days, rule }),
            });
            const data = await response.json();
            setRosterData(data); // 假設後端回傳格式與 SHIFTS 相似
        } catch (error) {
            console.error("生成失敗", error);
            alert("排班生成出錯，請稍後再試");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl px-4 pb-10 space-y-8">
            {/* 1. 參數輸入區 */}
            <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CalendarDays className="text-blue-500" /> 排班參數設定
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 人員名單輸入 */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">參與人員 ({names.length})</label>
                        <div className="flex gap-2">
                            <input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="輸入姓名..."
                                className="flex-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700"
                            />
                            <button onClick={addName} className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                                <UserPlus size={20} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {names.map((name, i) => (
                                <span key={i} className="px-3 py-1 bg-white/80 dark:bg-gray-600 rounded-full text-sm flex items-center gap-2">
                                    {name}
                                    <button onClick={() => removeName(i)}><Trash2 size={14} className="text-red-400" /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 規則與天數設定 */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">排班天數 (最大 31 天)</label>
                            <input
                                type="number"
                                max="31"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                className="w-full mt-1 px-4 py-2 rounded-xl border dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">排班規則</label>
                            <select
                                value={rule}
                                onChange={(e) => setRule(e.target.value)}
                                className="w-full mt-1 px-4 py-2 rounded-xl border dark:bg-gray-700"
                            >
                                <option value="fairness">平均分配 (公平)</option>
                                <option value="morning_heavy">早班優先</option>
                                <option value="night_heavy">晚班優先</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading || names.length === 0}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    {loading ? "後端計算中..." : "開始自動排班"}
                </button>
            </section>

            {/* 2. 結果顯示區 (有資料才顯示) */}
            {rosterData && (
                <section className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100/50 dark:bg-gray-800/50">
                                    <th className="p-4 border-b dark:border-gray-700 font-semibold sticky left-0 bg-white/90 dark:bg-gray-800/90 z-10">人員</th>
                                    {Array.from({ length: days }).map((_, i) => (
                                        <th key={i} className="p-4 border-b dark:border-gray-700 font-semibold text-center min-w-[80px]">
                                            <div className="text-xs text-gray-500">Day {i + 1}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rosterData.map((staff) => (
                                    <tr key={staff.id} className="hover:bg-white/40 dark:hover:bg-gray-800/40">
                                        <td className="p-4 border-b dark:border-gray-700 font-bold sticky left-0 bg-white/90 dark:bg-gray-800/90 z-10">{staff.name}</td>
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
                </section>
            )}
        </div>
    );
}