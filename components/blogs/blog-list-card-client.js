'use client';

import Link from "next/link";
import ShowClientTime from "@/components/blogs/show-client-time";

export default function BlogListCardClient({ id, toc, tags, created_at, updated_at }) {
    const sortedTags = tags.sort((a, b) => a.localeCompare(b));
    return (
        <Link
            href={`/blogs/${id}`}
            className="block bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 m-4"
        >
            {/* 卡片內容區域 */}
            <div className="p-4">
                {/* 標題 */}
                <h2 className="text-center text-4xl font-semibold text-gray-800 mb-2">
                    {toc || `Blog Post #${id}`}
                </h2>

                {/* Tags 區域 */}
                <div className="flex justify-center gap-2 mb-4">
                    {sortedTags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Time Information */}
                <div className="text-gray-500 text-xs text-right">
                    <p>
                        <strong>Created:</strong>{" "}
                        <ShowClientTime datetimeString={created_at} />
                    </p>
                    <p>
                        <strong>Updated:</strong>{" "}
                        <ShowClientTime datetimeString={updated_at} />
                    </p>
                </div>
            </div>
        </Link>
    );
}
