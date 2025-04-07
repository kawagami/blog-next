import PendingButton from "@/components/stocks/pending-button";
import DeleteButton from "@/components/stocks/delete-button";

export default function StockTableRow({ stock }) {
    return (
        <tr className="text-center">
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
    )
}
