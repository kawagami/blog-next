'use client';

import deleteBlog from "@/api/delete-blog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ uuid }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return; // 防止多次點擊
        const confirmed = confirm("確定要刪除這篇 blog 嗎？");
        if (!confirmed) return;

        setIsDeleting(true);
        try {
            await deleteBlog(uuid);
            router.refresh(); // 刷新頁面以更新 blog 列表
        } catch (error) {
            console.error("刪除失敗：", error);
            alert("刪除失敗，請稍後再試。");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`ml-2 px-4 py-2 font-medium rounded-lg text-white transition duration-200 ${isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                }`}
        >
            {isDeleting ? "刪除中..." : "刪除"}
        </button>
    );
}
