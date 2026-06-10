"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { v4 as uuidv4 } from 'uuid';
import LoadingButton from "@/components/blogs/loading-button";

export default function CreateButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <LoadingButton
            loading={isPending}
            onClick={() => startTransition(() => router.push(`/admin/blogs/${uuidv4()}`))}
            className={`px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75 ${isPending ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-600"}`}
        >
            新增 Blog
        </LoadingButton>
    );
}
