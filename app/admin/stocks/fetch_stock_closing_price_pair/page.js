"use client";

import { fetchStockClosingPricePair } from "@/components/stocks/actions";
import { useActionState } from "react";

// 轉換輸入日期 (民國 or 西元) → 西元 YYYYMMDD
function parseDateInput(input) {
    const trimmed = input.trim();

    if (/^\d{7}$/.test(trimmed)) {
        // 民國格式 (7 碼)
        const year = parseInt(trimmed.slice(0, 3), 10);
        const monthDay = trimmed.slice(3); // MMDD

        const gregorianYear = year + 1911;
        return `${gregorianYear}${monthDay}`;
    }

    if (/^\d{8}$/.test(trimmed)) {
        // 西元格式 (8 碼)
        return trimmed;
    }

    // 格式不符
    return null;
}

// 轉 YYYYMMDD → Date 物件
function yyyymmddToDate(yyyymmdd) {
    const year = parseInt(yyyymmdd.slice(0, 4), 10);
    const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1; // 月份 0-based
    const day = parseInt(yyyymmdd.slice(6, 8), 10);
    return new Date(year, month, day);
}

async function fetchStockData(prevState, formData) {
    const stockNo = formData.get("stockNo")?.toString().trim();
    const startInput = formData.get("start_date")?.toString().trim();
    const endInput = formData.get("end_date")?.toString().trim();

    // 基本欄位檢查
    if (!stockNo || !startInput || !endInput) {
        return { stockData: null, error: "請輸入完整資料！" };
    }

    // 轉換日期
    const start_date = parseDateInput(startInput);
    const end_date = parseDateInput(endInput);

    if (!start_date || !end_date) {
        return { stockData: null, error: "日期格式錯誤，請輸入 7 碼民國年或 8 碼西元年 (例如 1130101 或 20240101)" };
    }

    // 檢查是否有未來日期
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 只比年月日

    const startDateObj = yyyymmddToDate(start_date);
    const endDateObj = yyyymmddToDate(end_date);

    if (startDateObj > today || endDateObj > today) {
        return { stockData: null, error: "日期不能超過今天，請重新輸入。" };
    }

    try {
        const data = await fetchStockClosingPricePair({ stock_no: stockNo, start_date, end_date });
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

    const renderStats = (data) => {
        if (!data || !data.stats) return null;

        const { price_diff, percent_change, is_increase, day_span } = data.stats;
        const priceChangeClass = is_increase ? "text-green-600" : "text-red-600";

        return (
            <div className="bg-blue-50 p-3 rounded mb-4">
                {data.prices.length >= 2 && (
                    <>
                        <p><span className="font-medium">起始收盤價：</span> {data.prices[0].close_price}</p>
                        <p><span className="font-medium">結束收盤價：</span> {data.prices[data.prices.length - 1].close_price}</p>
                    </>
                )}
                <p>
                    <span className="font-medium">漲跌點數：</span>
                    <span className={priceChangeClass}>{price_diff.toFixed(2)}</span>
                </p>
                <p>
                    <span className="font-medium">漲跌幅 (%)：</span>
                    <span className={priceChangeClass}>{percent_change.toFixed(2)}%</span>
                </p>
                <p><span className="font-medium">經過天數：</span> {day_span} 天</p>
            </div>
        );
    };

    return (
        <div className="w-full lg:w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            {/* 查詢表單 */}
            <form action={formAction} className="space-y-4 bg-white p-4 rounded shadow">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="stockNo" className="font-medium">股票代號</label>
                    <input type="text" name="stockNo" id="stockNo" className="border p-2 rounded w-full" placeholder="例如: 3036" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="start_date" className="font-medium">起始日期 (YYYYMMDD 或 民國)</label>
                    <input type="text" name="start_date" id="start_date" className="border p-2 rounded w-full" placeholder="1130101 或 20240101" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="end_date" className="font-medium">結束日期 (YYYYMMDD 或 民國)</label>
                    <input
                        type="text"
                        name="end_date"
                        id="end_date"
                        className="border p-2 rounded w-full"
                        placeholder="1130430 或 20240430"
                        defaultValue={new Date().toISOString().slice(0, 10).replace(/-/g, "")}
                    />
                </div>
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                    {isPending ? "查詢中…" : "查詢"}
                </button>
            </form>

            {/* 錯誤訊息 */}
            {state.error && (
                <div className="bg-red-100 text-red-800 p-3 rounded">
                    {state.error}
                </div>
            )}

            {/* 結果顯示 */}
            {state.stockData && state.stockData.prices && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-3">查詢結果</h2>

                    {/* 統計數字 */}
                    {renderStats(state.stockData)}

                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">股票代號</th>
                                <th className="border px-2 py-1">日期</th>
                                <th className="border px-2 py-1">收盤價</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.stockData.prices.map((item) => (
                                <tr key={item.date}>
                                    <td className="border px-2 py-1 text-center">{item.stock_no}</td>
                                    <td className="border px-2 py-1 text-center">{item.date}</td>
                                    <td className="border px-2 py-1 text-center">{item.close_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
