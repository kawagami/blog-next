"use server";

// import { getUnfinishedBuybackPriceGap } from "@/components/stocks/actions";

export default async function Page() {
    return (
        <div className="w-full lg:w-3/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            {/* 新增 執行中的庫藏股 */}
            <h1>
                實際執行中的庫藏股計畫清單
            </h1>
        </div>
    );
}
