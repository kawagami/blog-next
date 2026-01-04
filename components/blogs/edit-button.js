"use client";

import { useAppContext } from "@/provider/app-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditButton({ uuid, tags }) {
    const router = useRouter();
    const { setAllTags } = useAppContext();

    // 使用 useEffect 来设置 tags
    useEffect(() => {
        setAllTags(tags);
    }, [tags, setAllTags]);

    return (
        <button
            onClick={() => router.push(`/admin/blogs/${uuid}`)}
            className="ml-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200"
        >
            編輯
        </button>
    );
}
