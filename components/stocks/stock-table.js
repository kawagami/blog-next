import StockTableRow from "@/components/stocks/stock-table-row";

export default function StockTable({ data }) {
    return (
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
                {data.map((stock) => (
                    <StockTableRow
                        key={stock.stock_no + stock.start_date + stock.end_date}
                        stock={stock}
                    />
                ))}
            </tbody>
        </table>
    )
}
