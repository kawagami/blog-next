"use server";

import { revalidatePath } from "next/cache";
import apiRequest from "@/libs/apiRequest";

export async function patchOneStockChangePending({ id }) {
    const url = `${process.env.API_URL}/stocks/update_one_stock_change_pending`;

    try {
        // 發送請求
        const response = await apiRequest({
            url: url,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        revalidatePath("/"); // 重新載入該頁面

        // 返回解析後的 JSON 數據
        return await response;
    } catch (error) {
        console.error("Error patching to /stock-change:", error);
        throw error;
    }
}
