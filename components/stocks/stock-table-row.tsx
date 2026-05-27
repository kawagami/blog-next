import PendingButton from "@/components/stocks/pending-button";
import { Td } from "@/components/stocks/table-cells";
import type { StockChange } from "@/types";

export default function StockTableRow({ stock }: { stock: StockChange }) {
    return (
        <tr className="text-center dark:text-gray-200">
            <Td>{stock.stock_no}</Td>
            <Td>{stock.stock_name}</Td>
            <Td>{stock.status}</Td>
            <Td>{stock.start_date}</Td>
            <Td>{stock.start_price}</Td>
            <Td>{stock.end_date}</Td>
            <Td>{stock.end_price}</Td>
            <Td className={stock.change < 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                {stock.change ? `${stock.change}%` : ``}
            </Td>
            <Td><PendingButton id={stock.id} /></Td>
        </tr>
    );
}
