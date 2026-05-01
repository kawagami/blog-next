"use client";

import { useWsNotification } from '@/hooks/useWsNotification';
import { X } from 'lucide-react';

interface StockData {
    stock_name?: string;
    stock_no?: string;
}

interface BlogData {
    id?: string;
    title?: string;
}

export default function StockToast() {
    const { notifications, dismiss } = useWsNotification();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {notifications.map(({ id, type, data }) => {
                if (type === 'blog_created') {
                    const blog = data as BlogData;
                    return (
                        <div key={id} className="flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[260px] max-w-sm bg-blue-600">
                            <div className="flex-1 text-sm">
                                <p className="font-semibold">新文章發布</p>
                                <p>{blog.title}</p>
                            </div>
                            <button onClick={() => dismiss(id)} className="mt-0.5 hover:opacity-75">
                                <X size={16} />
                            </button>
                        </div>
                    );
                }

                const isSuccess = type === 'stock_completed';
                const stockData = data as StockData;
                return (
                    <div
                        key={id}
                        className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[260px] max-w-sm ${isSuccess ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        <div className="flex-1 text-sm">
                            {isSuccess ? (
                                <>
                                    <p className="font-semibold">股票完成 ✓</p>
                                    <p>{stockData.stock_name}（{stockData.stock_no}）</p>
                                </>
                            ) : (
                                <>
                                    <p className="font-semibold">股票失敗 ✗</p>
                                    <p>股票代號：{stockData.stock_no}</p>
                                </>
                            )}
                        </div>
                        <button onClick={() => dismiss(id)} className="mt-0.5 hover:opacity-75">
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
