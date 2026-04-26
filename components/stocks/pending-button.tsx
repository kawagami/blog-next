"use client";

import { patchOneStockChangePending } from "./actions";
import type { StockChange } from "@/types";

export default function PendingButton({ stock }: { stock: StockChange }) {
    const handlePending = async (stock: StockChange) => {
        await patchOneStockChangePending({ id: stock.id });
    };

    return (
        <button onClick={() => handlePending(stock)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
            再查詢
        </button>
    );
}
