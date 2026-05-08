import StockTable from "@/components/stocks/stock-table";
import { StatusLink } from "@/components/stocks/status-link";
import { getStockChanges } from "@/app/admin/(main)/stocks/actions";

export default async function List({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    const { status } = await searchParams;
    const info = await getStockChanges(status ?? null);

    const totalChange = info.reduce((sum, item) => sum + (item.change ?? 0), 0);
    const totalCount = info.reduce((sum, item) => sum + (item.change ? 1 : 0), 0);

    return (
        <div className="w-full p-6 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-xl font-bold mb-4 dark:text-white">股票變動列表 {info.length} 筆</h1>
            <h1 className="text-xl font-bold mb-4 dark:text-white">總變動 % 數 {totalChange.toFixed(2)} %</h1>
            <h1 className="text-xl font-bold mb-4 dark:text-white">有資料的個數 {totalCount}</h1>
            <h1 className="text-xl font-bold mb-4 dark:text-white">平均變動 % 數 {totalCount > 0 ? (totalChange / totalCount).toFixed(2) : '—'} %</h1>
            <div className="flex gap-2 mb-4">
                {["", "completed", "failed", "pending"].map((s) => (
                    <StatusLink key={s || 'all'} status={s} currentStatus={status ?? ''}>
                        {s || 'All'}
                    </StatusLink>
                ))}
            </div>
            <StockTable data={info} />
        </div>
    );
}
