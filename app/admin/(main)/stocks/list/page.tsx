import { Suspense } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import StockTable from "@/components/stocks/stock-table";
import { StatusLink } from "@/components/stocks/status-link";
import { getStockChanges } from "@/app/admin/(main)/stocks/actions";
import type { StockChange } from "@/types";

const LIMIT = 50;

function buildHref(status: string | undefined, offset: number) {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (offset > 0) params.append("offset", String(offset));
    const qs = params.toString();
    return `/admin/stocks/list${qs ? `?${qs}` : ""}`;
}

async function StockContent({ status, offset }: { status: string | undefined; offset: number }) {
    const { data, total } = await getStockChanges(status ?? null, LIMIT, offset);
    const totalChange = data.reduce((sum: number, item: StockChange) => sum + (item.change ?? 0), 0);
    const totalCount = data.reduce((sum: number, item: StockChange) => sum + (item.change ? 1 : 0), 0);
    const hasPrev = offset > 0;
    const hasNext = offset + LIMIT < total;

    return (
        <>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4">
                <h1 className="text-xl font-bold dark:text-white">共 {total} 筆，本頁 {data.length} 筆</h1>
                <h1 className="text-xl font-bold dark:text-white">總變動 {totalChange.toFixed(2)} %</h1>
                <h1 className="text-xl font-bold dark:text-white">有資料 {totalCount} 筆</h1>
                <h1 className="text-xl font-bold dark:text-white">平均 {totalCount > 0 ? (totalChange / totalCount).toFixed(2) : '—'} %</h1>
            </div>
            <StockTable data={data} />
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {offset + 1}–{Math.min(offset + LIMIT, total)} / {total}
                </span>
                <div className="flex gap-2">
                    {hasPrev ? (
                        <Link
                            href={buildHref(status, offset - LIMIT)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                            <ChevronLeft className="w-4 h-4" /> 上一頁
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 text-sm cursor-not-allowed">
                            <ChevronLeft className="w-4 h-4" /> 上一頁
                        </span>
                    )}
                    {hasNext ? (
                        <Link
                            href={buildHref(status, offset + LIMIT)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                            下一頁 <ChevronRight className="w-4 h-4" />
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 text-sm cursor-not-allowed">
                            下一頁 <ChevronRight className="w-4 h-4" />
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}

function StockContentSkeleton() {
    return (
        <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
    );
}

export default async function List({ searchParams }: { searchParams: Promise<{ status?: string; offset?: string }> }) {
    const { status, offset: offsetStr } = await searchParams;
    const offset = Math.max(0, Number(offsetStr ?? 0));

    return (
        <div className="w-full p-6 bg-gray-100 dark:bg-gray-800">
            <div className="flex gap-2 mb-4">
                {["", "completed", "failed", "pending"].map((s) => (
                    <StatusLink key={s || 'all'} status={s} currentStatus={status ?? ''}>
                        {s || 'All'}
                    </StatusLink>
                ))}
            </div>
            <Suspense key={`${status ?? ''}-${offset}`} fallback={<StockContentSkeleton />}>
                <StockContent status={status} offset={offset} />
            </Suspense>
        </div>
    );
}
