"use server";

import { revalidatePath } from "next/cache";
import adminRequest from "@/libs/adminRequest";
import type { StockDayAll, StockBuybackPeriod, StockChange, StockChangePaginatedResponse } from "@/types";

export async function patchStockPendingAction(formData: FormData): Promise<void> {
    const id = Number(formData.get('id'));
    await patchOneStockChangePending({ id });
}


export async function patchOneStockChangePending({ id }: { id: string | number }): Promise<StockChange> {
    const response = await adminRequest<StockChange>({
        url: `${process.env.API_URL}/admin/stocks/update_one_stock_change_pending`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    revalidatePath("/");
    return response;
}

export async function getStockChanges(
    status: string | null = null,
    limit = 50,
    offset = 0,
): Promise<StockChangePaginatedResponse> {
    const url = `${process.env.API_URL}/admin/stocks/get_all_stock_changes`;
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    params.append("limit", String(limit));
    params.append("offset", String(offset));

    return adminRequest<StockChangePaginatedResponse>({
        url: `${url}?${params}`,
    });
}

function isValidDateFormat(dateStr: string): boolean {
    if (!/^\d{8}$/.test(dateStr)) return false;
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);
    if (month < 1 || month > 12) return false;
    const daysInMonth = new Date(parseInt(dateStr.substring(0, 4), 10), month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
}

export async function fetchStockClosingPricePair({ stock_no, start_date, end_date }: { stock_no: string; start_date: string; end_date: string }): Promise<unknown> {
    if (!isValidDateFormat(start_date) || !isValidDateFormat(end_date)) throw new Error("日期格式錯誤，必須是 YYYYMMDD 格式");
    const url = new URL(`${process.env.API_URL}/admin/stocks/fetch_stock_closing_price_pair_stats`);
    url.searchParams.append("stock_no", stock_no);
    url.searchParams.append("start_date", start_date);
    url.searchParams.append("end_date", end_date);
    return adminRequest({ url: url.toString(), method: "GET" });
}

export async function getStockDayAll({ trade_date = "", stock_code = "", limit = 50, offset = 0 } = {}): Promise<StockDayAll[]> {
    const url = new URL(`${process.env.API_URL}/admin/stocks/get_stock_day_all`);
    if (trade_date) url.searchParams.append("trade_date", trade_date);
    if (stock_code) url.searchParams.append("stock_code", stock_code);
    url.searchParams.append("limit", String(limit));
    url.searchParams.append("offset", String(offset));
    return adminRequest<StockDayAll[]>({ url: url.toString() });
}

export async function getStockBuybackPeriods(): Promise<StockBuybackPeriod[]> {
    return adminRequest<StockBuybackPeriod[]>({ url: `${process.env.API_URL}/admin/stocks/get_stock_buyback_periods_v2` });
}

export async function getUnfinishedBuybackPriceGap(): Promise<unknown> {
    return adminRequest({
        url: `${process.env.API_URL}/admin/stocks/get_unfinished_buyback_price_gap`,
        headers: { "Content-Type": "application/json" },
    });
}
