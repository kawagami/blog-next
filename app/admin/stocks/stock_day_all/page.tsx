"use server";

import { getStockDayAll } from "@/app/admin/stocks/actions";

export default async function Page({ searchParams }: { searchParams: Promise<{ trade_date?: string; limit?: string; offset?: string }> }) {
    const params = await searchParams;
    const trade_date = params.trade_date ?? "";
    const limit = parseInt(params.limit ?? "50", 10);
    const offset = parseInt(params.offset ?? "0", 10);

    const data = await getStockDayAll({ trade_date, limit, offset });

    return (
        <div className="w-full lg:w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">全市場行情</h1>
            <form method="get" className="flex gap-2 mb-4 items-end flex-wrap">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">交易日期</label>
                    <input type="text" name="trade_date" defaultValue={trade_date} placeholder="YYYYMMDD" className="border px-2 py-1 text-sm rounded" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">筆數</label>
                    <input type="number" name="limit" defaultValue={limit} min={1} max={500} className="border px-2 py-1 text-sm rounded w-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">偏移</label>
                    <input type="number" name="offset" defaultValue={offset} min={0} className="border px-2 py-1 text-sm rounded w-20" />
                </div>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">查詢</button>
            </form>
            <div className="text-sm text-gray-600 mb-2">共 {data.length} 筆</div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="px-3 py-2 border">股票代號</th>
                            <th className="px-3 py-2 border">股票名稱</th>
                            <th className="px-3 py-2 border">開盤</th>
                            <th className="px-3 py-2 border">最高</th>
                            <th className="px-3 py-2 border">最低</th>
                            <th className="px-3 py-2 border">收盤</th>
                            <th className="px-3 py-2 border">成交量</th>
                            <th className="px-3 py-2 border">成交筆數</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={`${item.stock_no}-${i}`} className="hover:bg-gray-50">
                                <td className="px-3 py-1 border text-center">{item.stock_no}</td>
                                <td className="px-3 py-1 border">{item.stock_name}</td>
                                <td className="px-3 py-1 border text-right">{item.open}</td>
                                <td className="px-3 py-1 border text-right">{item.high}</td>
                                <td className="px-3 py-1 border text-right">{item.low}</td>
                                <td className="px-3 py-1 border text-right">{item.close}</td>
                                <td className="px-3 py-1 border text-right">{item.volume?.toLocaleString()}</td>
                                <td className="px-3 py-1 border text-right">{item.transaction_count?.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-2 mt-4">
                {offset > 0 && (
                    <a href={`?trade_date=${trade_date}&limit=${limit}&offset=${Math.max(0, offset - limit)}`} className="px-3 py-1 bg-gray-300 rounded text-sm hover:bg-gray-400">上一頁</a>
                )}
                {data.length === limit && (
                    <a href={`?trade_date=${trade_date}&limit=${limit}&offset=${offset + limit}`} className="px-3 py-1 bg-gray-300 rounded text-sm hover:bg-gray-400">下一頁</a>
                )}
            </div>
        </div>
    );
}
