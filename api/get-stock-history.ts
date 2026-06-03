"use server";

export interface StockDayRecord {
    date: string;       // YYYY-MM-DD
    close: number;
    change: number;     // price change (positive = up)
}

// TWSE returns dates in ROC calendar format "113/01/02" → parse to YYYY-MM-DD
function parseRocDate(rocDate: string): string {
    const [year, month, day] = rocDate.split('/');
    return `${parseInt(year) + 1911}-${month}-${day}`;
}

// Fetch one month of daily data from TWSE
async function fetchMonthData(stockCode: string, yyyymm: string): Promise<StockDayRecord[]> {
    const date = `${yyyymm}01`;
    const url = `https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=${date}&stockNo=${stockCode}&response=json`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];

    const json = await res.json();
    if (json.stat !== 'OK' || !json.data) return [];

    return (json.data as string[][]).map(row => ({
        date: parseRocDate(row[0].trim()),
        close: parseFloat(row[6].replace(/,/g, '')) || 0,
        change: parseFloat(row[7].replace(/,/g, '').replace('X', '')) || 0,
    }));
}

// Generate list of YYYYMM strings from startDate to today
function monthsBetween(startDate: string): string[] {
    const start = new Date(startDate);
    const now = new Date();
    const months: string[] = [];

    const cur = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cur <= now) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, '0');
        months.push(`${y}${m}`);
        cur.setMonth(cur.getMonth() + 1);
    }
    return months;
}

export async function getStockHistory(stockCode: string, buyDate: string): Promise<StockDayRecord[]> {
    const months = monthsBetween(buyDate);

    const results = await Promise.all(
        months.map(ym => fetchMonthData(stockCode, ym))
    );

    const all = results.flat();
    return all.filter(r => r.date >= buyDate);
}
