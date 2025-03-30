"use server";

import apiRequest from "@/libs/apiRequest";

async function postNewPendingStockChange({ stock_no, start_date, end_date }) {
    const url = `${process.env.API_URL}/stocks/new_pending_stock_change`;

    try {
        // 發送請求
        const response = await apiRequest({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ stock_no, start_date, end_date })
        });

        // 返回解析後的 JSON 數據
        return await response;
    } catch (error) {
        console.error("Error posting to /stocks/new_pending_stock_change:", error);
        throw error;
    }
}

export default postNewPendingStockChange;
