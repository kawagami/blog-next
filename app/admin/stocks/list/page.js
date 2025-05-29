"use server";

import StockTable from "@/components/stocks/stock-table";
import { StatusLink } from "@/components/stocks/status-link";
import { getStockChanges } from "@/components/stocks/actions";

export default async function List(props) {
    const searchParams = await props.searchParams
    const status = searchParams.status

    const info = await getStockChanges(status);

    const totalChange = info.reduce((sum, item) => {
        return sum + (item.change ?? 0);
    }, 0);

    return (
        <div className="w-full lg:w-3/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-4">
                股票變動列表 ({info.length} 筆)
            </h1>
            <h1 className="text-xl font-bold mb-4">
                總變動數 {totalChange} %
            </h1>
            <div className="flex gap-2 mb-4">
                {["", "completed", "failed", "pending"].map((s) => (
                    <StatusLink key={s || 'all'} status={s} currentStatus={status}>
                        {s || 'All'}
                    </StatusLink>
                ))}
            </div>

            <StockTable data={info} />
        </div>
    );
}
