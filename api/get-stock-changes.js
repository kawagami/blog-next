"use server";

import apiRequest from "@/libs/apiRequest";

async function getStockChanges(status = null) {
    const url = `${process.env.API_URL}/stocks/get_all_stock_changes`;
    const params = new URLSearchParams();

    if (status) {
        params.append("status", status);
    }

    const finalUrl = params.toString() ? `${url}?${params.toString()}` : url;

    try {
        // 發送請求
        const response = await apiRequest({
            url: finalUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // 返回解析後的 JSON 數據
        return await response;
    } catch (error) {
        console.error("Error fetching stock changes:", error);
        throw error;
    }
}

export default getStockChanges;