import { getStockBuybackPeriods } from "@/app/admin/(main)/stocks/actions";

export default async function Page() {
    const data = await getStockBuybackPeriods();

    return (
        <div className="w-full p-6 bg-stone-100 dark:bg-stone-800">
            <h1 className="text-xl font-bold mb-4 dark:text-white">庫藏股計畫清單</h1>
            <div className="text-sm text-stone-600 dark:text-stone-400 mb-2">共 {data.length} 筆</div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 text-sm">
                    <thead className="bg-stone-200 dark:bg-stone-700 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2 border border-stone-300 dark:border-stone-600 dark:text-stone-200">股票代號</th>
                            <th className="px-4 py-2 border border-stone-300 dark:border-stone-600 dark:text-stone-200">起始日</th>
                            <th className="px-4 py-2 border border-stone-300 dark:border-stone-600 dark:text-stone-200">結束日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800 dark:text-stone-200">
                                <td className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-center">{item.stock_no}</td>
                                <td className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-center">{item.start_date}</td>
                                <td className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-center">{item.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
