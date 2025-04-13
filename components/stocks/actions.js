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

export async function getStockChanges(status = null) {
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

export async function postNewPendingStockChange({ stock_no, start_date, end_date }) {
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

export async function postGetStockPrice({ stock_no, start_date, end_date }) {
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
