'use client';

import { patchOneStockChangePending } from "./actions";

export default function PendingButton({ stock }) {

    const handlePending = async (stock) => {
        await patchOneStockChangePending({ id: stock.id });
    };

    return (
        <button
            onClick={() => handlePending(stock)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
        >
            再查詢
        </button>
    );
}
