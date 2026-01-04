"use client";

import { useRouter } from "next/navigation";

export default function NewEditButton({ uuid, tags }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(`/admin/blogs2/${uuid}`)}
            className="ml-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200"
        >
            編輯
        </button>
    );
}
