"use server";

import { getUnfinishedBuybackPriceGap } from "@/components/stocks/actions";

export default async function Page() {
    const info = await getUnfinishedBuybackPriceGap();

    // 計算總和和平均
    const totalDiffPercent = info.reduce((sum, item) => {
        const percent = parseFloat(item.diff_percent);
        return sum + (isNaN(percent) ? 0 : percent);
    }, 0);
    const avgDiffPercent = info.length > 0 ? totalDiffPercent / info.length : 0;

    return (
        <div className="w-full lg:w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">執行中的庫藏股</h1>

            {/* 顯示總和與平均 */}
            <div className="mb-4 text-right text-sm text-gray-600 space-y-1">
                <div>資料數量：{info.length}</div>
                <div>價差 (%) 總和：{totalDiffPercent.toFixed(2)}%</div>
                <div>平均價差 (%)：{avgDiffPercent.toFixed(2)}%</div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2 border">股票代號</th>
                            <th className="px-4 py-2 border">股票名稱</th>
                            <th className="px-4 py-2 border">開始日</th>
                            <th className="px-4 py-2 border">結束日</th>
                            <th className="px-4 py-2 border">開始日價格</th>
                            <th className="px-4 py-2 border">最新價格</th>
                            <th className="px-4 py-2 border">價差</th>
                            <th className="px-4 py-2 border">價差 (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.map((item) => (
                            <tr key={item.stock_no} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border text-center">{item.stock_no}</td>
                                <td className="px-4 py-2 border text-center">{item.stock_name}</td>
                                <td className="px-4 py-2 border text-center">{item.start_date}</td>
                                <td className="px-4 py-2 border text-center">{item.end_date}</td>
                                <td className="px-4 py-2 border text-right">{item.price_on_start_date}</td>
                                <td className="px-4 py-2 border text-right">{item.latest_price}</td>
                                <td className={`px-4 py-2 border text-right ${parseFloat(item.diff) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.diff}
                                </td>
                                <td className={`px-4 py-2 border text-right ${parseFloat(item.diff_percent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.diff_percent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
