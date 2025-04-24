"use client";

import { getStockHistoryPrice } from "@/components/stocks/actions";
import { useActionState } from "react";

async function fetchStockData(prevState, formData) {
    const stockNo = formData.get("stockNo")?.toString().trim();
    const date = formData.get("date")?.toString().trim();

    // 基本欄位檢查
    if (!stockNo || !date) {
        return { stockData: null, error: "請輸入完整資料！" };
    }

    try {
        const data = await getStockHistoryPrice({ stock_no: stockNo, date: date });
        return { stockData: data, error: null };
    } catch (error) {
        return { stockData: null, error: error.message || "無法取得資料，請稍後再試。" };
    }
}

export default function Search() {
    const [state, formAction, isPending] = useActionState(fetchStockData, {
        stockData: null,
        error: null,
    });

    // 計算價格統計數據
    const calculateStats = (data) => {
        if (!data || !data.length) return null;

        // 最高價和最低價
        const highestPrice = Math.max(...data.map(item => item.close_price));
        const lowestPrice = Math.min(...data.map(item => item.close_price));

        // 平均價格
        const averagePrice = data.reduce((sum, item) => sum + item.close_price, 0) / data.length;

        // 起始和結束價格
        const startPrice = data[0].close_price;
        const endPrice = data[data.length - 1].close_price;

        // 計算漲跌幅
        const changeRate = ((endPrice - startPrice) / startPrice * 100).toFixed(2);

        return {
            highestPrice,
            lowestPrice,
            averagePrice: averagePrice.toFixed(2),
            startPrice,
            endPrice,
            changeRate
        };
    };

    const stats = state.stockData ? calculateStats(state.stockData) : null;

    return (
        <div className="w-full lg:w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">股票歷史價格查詢</h1>
            <form action={formAction} className="mb-4">
                <div className="flex flex-col md:flex-row md:space-x-2">
                    <input
                        type="text"
                        name="stockNo"
                        placeholder="輸入股票代號"
                        className="p-2 border rounded w-full mb-2 md:mb-0"
                    />
                    <input
                        type="text"
                        name="date"
                        placeholder="輸入日期 (YYYYMMDD 格式)"
                        className="p-2 border rounded w-full mb-2 md:mb-0"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded w-full md:w-auto md:px-4"
                        disabled={isPending}
                    >
                        {isPending ? "查詢中..." : "查詢"}
                    </button>
                </div>
            </form>

            {state.error && <p className="text-red-500">{state.error}</p>}

            {state.stockData && state.stockData.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">股票: {state.stockData[0].stock_no} 價格摘要</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="font-medium text-gray-600">日期區間</h3>
                            <p className="text-lg">{state.stockData[0].date} ~ {state.stockData[state.stockData.length - 1].date}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="font-medium text-gray-600">價格區間</h3>
                            <p className="text-lg">{stats.lowestPrice} ~ {stats.highestPrice}</p>
                        </div>
                        <div className={`bg-white p-4 rounded shadow ${parseFloat(stats.changeRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <h3 className="font-medium text-gray-600">漲跌幅</h3>
                            <p className="text-lg">{stats.changeRate}%</p>
                        </div>
                    </div>

                    <div className="bg-white rounded shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收盤價</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">漲跌</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {state.stockData.map((item, index) => {
                                    // 計算與前一天的價差
                                    const prevPrice = index > 0 ? state.stockData[index - 1].close_price : null;
                                    const priceDiff = prevPrice !== null ? item.close_price - prevPrice : null;
                                    const priceChangePercent = prevPrice !== null ? ((item.close_price - prevPrice) / prevPrice * 100).toFixed(2) : null;

                                    return (
                                        <tr key={item.date}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.close_price.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {priceDiff !== null && (
                                                    <span className={priceDiff > 0 ? 'text-green-600' : priceDiff < 0 ? 'text-red-600' : 'text-gray-500'}>
                                                        {priceDiff > 0 ? '▲' : priceDiff < 0 ? '▼' : '■'} {Math.abs(priceDiff).toFixed(2)} ({priceChangePercent}%)
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {state.stockData && state.stockData.length === 0 && (
                <div className="p-4 bg-yellow-100 text-yellow-700 rounded">
                    沒有找到相關股票的歷史資料
                </div>
            )}
        </div>
    );
}