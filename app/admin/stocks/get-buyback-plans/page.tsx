import { getStockBuybackPeriods } from "@/app/admin/stocks/actions";

export default async function Page() {
    const data = await getStockBuybackPeriods();

    return (
        <div className="w-full lg:w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-xl font-bold mb-4 dark:text-white">庫藏股計畫清單</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">共 {data.length} 筆</div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm">
                    <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">股票代號</th>
                            <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">起始日</th>
                            <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">結束日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200">
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">{item.stock_no}</td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">{item.start_date}</td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">{item.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
