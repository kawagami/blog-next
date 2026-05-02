"use client";

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
    status: string;
    currentStatus: string;
    children: React.ReactNode;
}

export const StatusLink = ({ status, currentStatus, children }: Props) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isActive = currentStatus === status || (!currentStatus && status === '');

    const href = status ? `/admin/stocks/list?status=${status}` : '/admin/stocks/list';

    return (
        <button
            onClick={() => startTransition(() => router.push(href))}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition flex items-center gap-1 ${isActive ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'} ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
            {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
            {children}
        </button>
    );
};
