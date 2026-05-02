import PendingButton from "@/components/stocks/pending-button";
import type { StockChange } from "@/types";

export default function StockTableRow({ stock }: { stock: StockChange }) {
    return (
        <tr className="text-center dark:text-gray-200">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.stock_no}</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.stock_name}</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.status}</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.start_date}</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.start_price}</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.end_date}</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stock.end_price}</td>
            <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${stock.change < 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {stock.change ? `${stock.change}%` : ``}
            </td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <PendingButton id={stock.id} />
            </td>
        </tr>
    );
}
