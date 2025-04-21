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

// 跟後端取 input date 的歷史價格
export async function getStockHistoryPrice({ stock_no, date }) {
    // 檢查日期格式是否為 YYYYMMDD
    if (!isValidDateFormat(date)) {
        throw new Error("日期格式錯誤，必須是 YYYYMMDD 格式");
    }

    const url = new URL(`${process.env.API_URL}/stocks/get_stock_history_price`);

    // 加上必要的 query 參數
    url.searchParams.append("stock_no", stock_no);
    url.searchParams.append("date", date);

    try {
        // 發送 GET 請求
        const response = await apiRequest({
            url: url.toString(),
            method: "GET"
        });

        // 返回解析後的 JSON 數據
        return await response;
    } catch (error) {
        console.error("Error getting stock history price:", error);
        throw error;
    }
}

// 檢查日期是否為 YYYYMMDD 格式
function isValidDateFormat(dateStr) {
    // 使用正則表達式檢查是否為 8 位數字
    if (!/^\d{8}$/.test(dateStr)) {
        return false;
    }

    // 提取年、月、日
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);

    // 檢查月份是否在 1-12 範圍內
    if (month < 1 || month > 12) {
        return false;
    }

    // 檢查日期是否在該月的有效範圍內
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}