"use server";

import getStockChanges from "@/api/get-stock-changes";
import DeleteButton from "@/components/stocks/delete-button";
import PendingButton from "@/components/stocks/pending-button";

export default async function List(props) {
    const searchParams = await props.searchParams
    const status = searchParams.status

    const info = await getStockChanges(status);

    return (
        <div className="w-full lg:w-3/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">
                股票變動列表 ({info.length} 筆)
            </h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">股票代號</th>
                        <th className="border border-gray-300 px-4 py-2">股票名稱</th>
                        <th className="border border-gray-300 px-4 py-2">狀態</th>
                        <th className="border border-gray-300 px-4 py-2">起始日期</th>
                        <th className="border border-gray-300 px-4 py-2">起始價格</th>
                        <th className="border border-gray-300 px-4 py-2">結束日期</th>
                        <th className="border border-gray-300 px-4 py-2">結束價格</th>
                        <th className="border border-gray-300 px-4 py-2">變動 (%)</th>
                        <th className="border border-gray-300 px-4 py-2">動作</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((stock) => (
                        <tr key={stock.stock_no + stock.start_date + stock.end_date} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{stock.stock_no}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.stock_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.status}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.start_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.start_price}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.end_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{stock.end_price}</td>
                            <td className={`border border-gray-300 px-4 py-2 ${stock.change < 0 ? "text-green-600" : "text-red-600"}`}>
                                {stock.change ? `${stock.change}%` : ``}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <PendingButton stock={stock} />
                                <DeleteButton stock={stock} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
