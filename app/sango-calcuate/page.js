'use client';

import { useState } from 'react';
import getSangoCalculate from '@/api/get-sango-calculate';

export default function SangoCalculate() {
    // 狀態管理
    const [now, setNow] = useState('');
    const [remainingTroops, setRemainingTroops] = useState('');
    const [full, setFull] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 提交表單處理
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 驗證必填項
        if (!now) {
            setError('now 參數是必須的');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // 準備參數
            const nowValue = parseInt(now, 10);
            const remainingValue = remainingTroops ? parseInt(remainingTroops, 10) : undefined;
            const fullValue = full ? parseInt(full, 10) : undefined;

            // 調用 API
            const data = await getSangoCalculate(nowValue, remainingValue, fullValue);
            setResult(data);
        } catch (err) {
            setError(`計算失敗: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 清除表單
    const handleReset = () => {
        setNow('');
        setRemainingTroops('');
        setFull('');
        setResult(null);
        setError('');
    };

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">三國計算工具</h1>

            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left">
                        <label className="block text-sm font-medium mb-1">
                            現在兵力 (必填)
                            <input
                                type="number"
                                value={now}
                                onChange={(e) => setNow(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="例如: 15688"
                            />
                        </label>
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium mb-1">
                            剩餘存兵 (選填)
                            <input
                                type="number"
                                value={remainingTroops}
                                onChange={(e) => setRemainingTroops(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="例如: 5680"
                            />
                        </label>
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium mb-1">
                            滿兵數量 (選填)
                            <input
                                type="number"
                                value={full}
                                onChange={(e) => setFull(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="例如: 29400"
                            />
                        </label>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-left">{error}</div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            disabled={loading}
                        >
                            {loading ? '計算中...' : '計算'}
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
                            disabled={loading}
                        >
                            重置
                        </button>
                    </div>
                </form>

                {result && (
                    <div className="mt-6 p-4 border rounded bg-gray-50">
                        <h2 className="text-lg font-semibold mb-2">計算結果</h2>
                        <pre className="text-left text-sm overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}