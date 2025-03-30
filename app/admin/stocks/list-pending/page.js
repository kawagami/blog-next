"use server";

import getPendingStockChanges from "@/api/get-pending-stock-changes";

export default async function ListPending() {
    const info = await getPendingStockChanges();

    return (
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">
                待處理股票變動列表 ({info.length} 筆)
            </h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">股票代號</th>
                        <th className="border border-gray-300 px-4 py-2">起始日期</th>
                        <th className="border border-gray-300 px-4 py-2">結束日期</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((stock) => (
                        <tr key={stock.stock_no + stock.start_date + stock.end_date} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{stock.stock_no}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.start_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.end_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
