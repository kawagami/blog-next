"use server";

import getStockChanges from "@/api/get-stock-changes";

export default async function List() {
    const info = await getStockChanges();

    return (
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">股票變動列表</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">股票代號</th>
                        <th className="border border-gray-300 px-4 py-2">股票名稱</th>
                        <th className="border border-gray-300 px-4 py-2">起始日期</th>
                        <th className="border border-gray-300 px-4 py-2">起始價格</th>
                        <th className="border border-gray-300 px-4 py-2">結束日期</th>
                        <th className="border border-gray-300 px-4 py-2">結束價格</th>
                        <th className="border border-gray-300 px-4 py-2">變動 (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((stock) => (
                        <tr key={stock.stock_no} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{stock.stock_no}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.stock_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.start_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.start_price}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.end_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.end_price}</td>
                            <td className={`border border-gray-300 px-4 py-2 ${stock.change < 0 ? "text-green-600" : "text-red-600"}`}>
                                {stock.change}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
