import { getStockDayAll } from "@/app/admin/(main)/stocks/actions";

export default async function Page({ searchParams }: { searchParams: Promise<{ trade_date?: string; limit?: string; offset?: string }> }) {
    const params = await searchParams;
    const trade_date = params.trade_date ?? "";
    const limit = parseInt(params.limit ?? "50", 10);
    const offset = parseInt(params.offset ?? "0", 10);

    const data = await getStockDayAll({ trade_date, limit, offset });

    return (
        <div className="w-full lg:w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-xl font-bold mb-4 dark:text-white">全市場行情</h1>
            <form method="get" className="flex gap-2 mb-4 items-end flex-wrap">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 dark:text-gray-400">交易日期</label>
                    <input type="text" name="trade_date" defaultValue={trade_date} placeholder="YYYYMMDD" className="border dark:border-gray-600 px-2 py-1 text-sm rounded bg-white dark:bg-gray-700 dark:text-gray-200" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 dark:text-gray-400">筆數</label>
                    <input type="number" name="limit" defaultValue={limit} min={1} max={500} className="border dark:border-gray-600 px-2 py-1 text-sm rounded w-20 bg-white dark:bg-gray-700 dark:text-gray-200" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 dark:text-gray-400">偏移</label>
                    <input type="number" name="offset" defaultValue={offset} min={0} className="border dark:border-gray-600 px-2 py-1 text-sm rounded w-20 bg-white dark:bg-gray-700 dark:text-gray-200" />
                </div>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">查詢</button>
            </form>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">共 {data.length} 筆</div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm">
                    <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
                        <tr>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">交易日期</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">股票代號</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">股票名稱</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">開盤</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">最高</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">最低</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">收盤</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">漲跌</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">成交量</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">成交金額</th>
                            <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">成交筆數</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={`${item.stock_code}-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-center">{item.trade_date}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-center">{item.stock_code}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600">{item.stock_name}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.open_price}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.high_price}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.low_price}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.close_price}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.price_change}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.trade_volume?.toLocaleString()}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.trade_amount?.toLocaleString()}</td>
                                <td className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-right">{item.transaction_count?.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-2 mt-4">
                {offset > 0 && (
                    <a href={`?trade_date=${trade_date}&limit=${limit}&offset=${Math.max(0, offset - limit)}`} className="px-3 py-1 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500">上一頁</a>
                )}
                {data.length === limit && (
                    <a href={`?trade_date=${trade_date}&limit=${limit}&offset=${offset + limit}`} className="px-3 py-1 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500">下一頁</a>
                )}
            </div>
        </div>
    );
}
