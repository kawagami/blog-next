"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LINKS = [
    { href: "/admin/stocks/list", label: "所有查詢後的資料", color: "green" },
    { href: "/admin/stocks/fetch_stock_closing_price_pair", label: "查詢特定區間特定股票歷史價格", color: "indigo" },
    { href: "/admin/stocks/get_unfinished_buyback_price_gap", label: "執行中的庫藏股", color: "green" },
    { href: "/admin/stocks/stock_day_all", label: "全市場行情", color: "blue" },
    { href: "/admin/stocks/get_buyback_plans", label: "庫藏股計畫", color: "blue" },
];

const COLOR_MAP = {
    green: "bg-green-600 border-green-700 hover:bg-green-700",
    indigo: "bg-indigo-600 border-indigo-700 hover:bg-indigo-700",
    blue: "bg-blue-600 border-blue-700 hover:bg-blue-700",
};

export default function Stocks() {
    const router = useRouter();
    const [loading, setLoading] = useState(null);

    function navigate(href) {
        setLoading(href);
        router.push(href);
    }

    return (
        <div className="w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <div className="w-full flex flex-wrap justify-center gap-4">
                {LINKS.map(({ href, label, color }) => {
                    const isLoading = loading === href;
                    const isDisabled = loading !== null;
                    return (
                        <button
                            key={href}
                            onClick={() => navigate(href)}
                            disabled={isDisabled}
                            className={`px-6 py-3 font-semibold text-white border-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2
                                ${COLOR_MAP[color]}
                                ${isDisabled ? "opacity-60 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}`}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}