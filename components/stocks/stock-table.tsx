import StockTableRow from "@/components/stocks/stock-table-row";
import { Th } from "@/components/stocks/table-cells";
import type { StockChange } from "@/types";

export default function StockTable({ data }: { data: StockChange[] }) {
    return (
        <table className="w-full border-collapse border border-stone-300 dark:border-stone-600">
            <thead>
                <tr className="bg-stone-200 dark:bg-stone-700">
                    <Th>股票代號</Th>
                    <Th>股票名稱</Th>
                    <Th>狀態</Th>
                    <Th>起始日期</Th>
                    <Th>起始價格</Th>
                    <Th>結束日期</Th>
                    <Th>結束價格</Th>
                    <Th>變動 (%)</Th>
                    <Th>動作</Th>
                </tr>
            </thead>
            <tbody>
                {data.map((stock) => (
                    <StockTableRow key={`${stock.stock_no}${stock.start_date}${stock.end_date}`} stock={stock} />
                ))}
            </tbody>
        </table>
    );
}
