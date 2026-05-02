"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Loader2 } from "lucide-react";

export default function CreateButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => startTransition(() => router.push(`/admin/blogs/${uuidv4()}`))}
            disabled={isPending}
            className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${isPending ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            新增 Blog
        </button>
    );
}
