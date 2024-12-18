'use client';

import { useRouter } from "next/navigation";

export default function BlogListCard({ id, toc }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/blogs/${id}`)}
            className="
                cursor-pointer max-w-sm rounded-lg border border-gray-300 
                shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white 
                m-4" /* 增加外邊距 */
        >
            {/* 卡片內容區域 */}
            <div className="p-4">
                {/* 標題 */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {toc || `Blog Post #${id}`}
                </h2>

                {/* 描述 */}
                <p className="text-gray-600 text-sm">
                    {`Click to read more about "${toc || `Blog Post #${id}`}."`}
                </p>
            </div>
        </div>
    );
}
