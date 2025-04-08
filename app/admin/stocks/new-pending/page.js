"use client";

import postNewPendingStockChange from "@/api/post-new-pending-stock-change";
import { useState } from "react";

export default function NewPending() {
    const [stockNo, setStockNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStockData(null);

        try {
            const data = await postNewPendingStockChange({ stock_no: stockNo, start_date: startDate, end_date: endDate });
            setStockData(data);
        } catch (err) {
            setError("無法取得資料，請稍後再試。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">新增排程查詢股票</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={stockNo}
                    onChange={(e) => setStockNo(e.target.value)}
                    placeholder="輸入股票代號"
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="輸入起始時間 (民國年月日)"
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="輸入結束時間 (民國年月日)"
                    className="p-2 border rounded w-full mb-2"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                    排程
                </button>
            </form>
            {loading && <p className="text-gray-500">排程中...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {stockData && (
                <div className="p-4 bg-white rounded shadow">
                    <p>股票代號: {stockData.stock_no}</p>
                    <p>股票名稱: {stockData.stock_name}</p>
                    <p>起始日期: {stockData.start_date}</p>
                    <p>起始價格: {stockData.start_price}</p>
                    <p>結束日期: {stockData.end_date}</p>
                    <p>結束價格: {stockData.end_price}</p>
                    <p>變化率: {stockData.change}%</p>
                </div>
            )}
        </div>
    );
}