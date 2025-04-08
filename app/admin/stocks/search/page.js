"use client";

import postGetStockPrice from "@/api/post-get-stock-price";
import { useActionState } from "react";

async function fetchStockData(prevState, formData) {
    const stockNo = formData.get("stockNo")?.toString().trim();
    const startDate = formData.get("startDate")?.toString().trim();
    const endDate = formData.get("endDate")?.toString().trim();

    // 基本欄位檢查
    if (!stockNo || !startDate || !endDate) {
        return { stockData: null, error: "請輸入完整資料！" };
    }

    try {
        const data = await postGetStockPrice({ stock_no: stockNo, start_date: startDate, end_date: endDate });
        return { stockData: data, error: null };
    } catch {
        return { stockData: null, error: "無法取得資料，請稍後再試。" };
    }
}

export default function Search() {
    const [state, formAction, isPending] = useActionState(fetchStockData, {
        stockData: null,
        error: null,
    });

    return (
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">庫藏股頁面</h1>
            <form action={formAction} className="mb-4">
                <input
                    type="text"
                    name="stockNo"
                    placeholder="輸入股票代號"
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="text"
                    name="startDate"
                    placeholder="輸入起始時間 (民國年月日)"
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="text"
                    name="endDate"
                    placeholder="輸入結束時間 (民國年月日)"
                    className="p-2 border rounded w-full mb-2"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full" disabled={isPending}>
                    {isPending ? "查詢中..." : "查詢"}
                </button>
            </form>

            {state.error && <p className="text-red-500">{state.error}</p>}

            {state.stockData && (
                <div className="p-4 bg-white rounded shadow">
                    <p>股票代號: {state.stockData.stock_no}</p>
                    <p>股票名稱: {state.stockData.stock_name}</p>
                    <p>起始日期: {state.stockData.start_date}</p>
                    <p>起始價格: {state.stockData.start_price}</p>
                    <p>結束日期: {state.stockData.end_date}</p>
                    <p>結束價格: {state.stockData.end_price}</p>
                    <p>變化率: {state.stockData.change}%</p>
                </div>
            )}
        </div>
    );
}
