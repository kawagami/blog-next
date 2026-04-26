"use server";

import { revalidatePath } from "next/cache";
import apiRequest from "@/libs/apiRequest";
import type { StockDayAll, StockBuybackPeriod, StockChange } from "@/types";

export async function patchOneStockChangePending({ id }: { id: string | number }): Promise<StockChange> {
    const response = await apiRequest<StockChange>({
        url: `${process.env.API_URL}/stocks/update_one_stock_change_pending`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    revalidatePath("/");
    return response;
}

export async function getStockChanges(status: string | null = null): Promise<StockChange[]> {
    const url = `${process.env.API_URL}/stocks/get_all_stock_changes`;
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    const finalUrl = params.toString() ? `${url}?${params}` : url;

    return apiRequest<StockChange[]>({
        url: finalUrl,
        headers: { "Content-Type": "application/json" },
    });
}

export async function postNewPendingStockChange({ stock_no, start_date, end_date }: { stock_no: string; start_date: string; end_date: string }): Promise<unknown> {
    return apiRequest({
        url: `${process.env.API_URL}/stocks/new_pending_stock_change`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock_no, start_date, end_date }),
    });
}

export async function postGetStockPrice({ stock_no, start_date, end_date }: { stock_no: string; start_date: string; end_date: string }): Promise<unknown> {
    return apiRequest({
        url: `${process.env.API_URL}/stocks/get_stock_change_info`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock_no, start_date, end_date }),
    });
}

function isValidDateFormat(dateStr: string): boolean {
    if (!/^\d{8}$/.test(dateStr)) return false;
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);
    if (month < 1 || month > 12) return false;
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
}

export async function getStockHistoryPrice({ stock_no, date }: { stock_no: string; date: string }): Promise<unknown> {
    if (!isValidDateFormat(date)) throw new Error("日期格式錯誤，必須是 YYYYMMDD 格式");
    const url = new URL(`${process.env.API_URL}/stocks/get_stock_history_price`);
    url.searchParams.append("stock_no", stock_no);
    url.searchParams.append("date", date);
    return apiRequest({ url: url.toString(), method: "GET" });
}

export async function fetchStockClosingPricePair({ stock_no, start_date, end_date }: { stock_no: string; start_date: string; end_date: string }): Promise<unknown> {
    if (!isValidDateFormat(start_date) || !isValidDateFormat(end_date)) throw new Error("日期格式錯誤，必須是 YYYYMMDD 格式");
    const url = new URL(`${process.env.API_URL}/stocks/fetch_stock_closing_price_pair_stats`);
    url.searchParams.append("stock_no", stock_no);
    url.searchParams.append("start_date", start_date);
    url.searchParams.append("end_date", end_date);
    return apiRequest({ url: url.toString(), method: "GET" });
}

export async function buybackStockRecord({ start_date, end_date }: { start_date: string; end_date: string }): Promise<unknown> {
    return apiRequest({
        url: `${process.env.API_URL}/stocks/buyback_stock_record`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start_date, end_date }),
    });
}

export async function getStockDayAll({ trade_date = "", limit = 50, offset = 0 } = {}): Promise<StockDayAll[]> {
    const url = new URL(`${process.env.API_URL}/stocks/get_stock_day_all`);
    if (trade_date) url.searchParams.append("trade_date", trade_date);
    url.searchParams.append("limit", String(limit));
    url.searchParams.append("offset", String(offset));
    return apiRequest<StockDayAll[]>({ url: url.toString() });
}

export async function getStockBuybackPeriods(): Promise<StockBuybackPeriod[]> {
    return apiRequest<StockBuybackPeriod[]>({ url: `${process.env.API_URL}/stocks/get_stock_buyback_periods_v2` });
}

export async function getUnfinishedBuybackPriceGap(): Promise<unknown> {
    return apiRequest({
        url: `${process.env.API_URL}/stocks/get_unfinished_buyback_price_gap`,
        headers: { "Content-Type": "application/json" },
    });
}
