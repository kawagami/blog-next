"use server";

import apiRequest from "@/libs/apiRequest";

async function postGetStockPrice({ stock_no, start_date, end_date }) {
    const url = `${process.env.API_URL}/stocks/get_stock_change_info`;

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
        console.error("Error posting to /stock-change:", error);
        throw error;
    }
}

export default postGetStockPrice;
