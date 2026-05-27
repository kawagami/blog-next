"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import LoadingButton from "@/components/blogs/loading-button";

export default function EditButton({ uuid }: { uuid: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <LoadingButton
            loading={isPending}
            onClick={() => startTransition(() => router.push(`/admin/blogs/${uuid}`))}
            className={`ml-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200 ${isPending ? "opacity-60 cursor-not-allowed" : "hover:bg-green-600"}`}
        >
            編輯
        </LoadingButton>
    );
}
