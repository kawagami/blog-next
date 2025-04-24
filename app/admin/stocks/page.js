"use server";

import Link from "next/link";

export default async function Stocks() {

    return (
        <div className="w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <div className="w-full flex justify-center gap-4">
                <Link
                    href="/admin/stocks/list"
                    className="px-6 py-3 font-semibold text-white bg-green-600 border-2 border-green-700 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition duration-300"
                >
                    所有查詢後的資料
                </Link>
                <Link
                    href="/admin/stocks/get-stock-history-price"
                    className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                >
                    {/* get_stock_history_price */}
                    查詢特定股票歷史價格
                </Link>
                <Link
                    href="/admin/stocks/search"
                    className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                >
                    查詢特定股票
                </Link>
                <Link
                    href="/admin/stocks/new-pending"
                    className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                >
                    新增待查詢股票
                </Link>
            </div>
        </div>
    );
}