"use client";

import type { StockChange } from "@/types";

export default function DeleteButton({ stock }: { stock: StockChange }) {
    const handleDelete = async (stock: StockChange) => {
        alert(`DeleteButton 收到 ${stock.id} 的資料`);
    };

    return (
        <button onClick={() => handleDelete(stock)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            DEL
        </button>
    );
}
