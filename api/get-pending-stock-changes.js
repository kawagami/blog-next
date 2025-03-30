"use server";

import apiRequest from "@/libs/apiRequest";

async function getPendingStockChanges() {
    const url = `${process.env.API_URL}/stocks/get_all_pending_stock_changes`;

    try {
        // 發送請求
        const response = await apiRequest({
            url: url,
            headers: {
                "Content-Type": "application/json"
            }
        });

        // 返回解析後的 JSON 數據
        return await response;
    } catch (error) {
        console.error("Error posting to /stock-change:", error);
        throw error;
    }
}

export default getPendingStockChanges;
