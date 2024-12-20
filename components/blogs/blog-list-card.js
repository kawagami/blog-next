'use server';

import Link from "next/link";
import ShowClientTime from "./show-client-time";

export default async function BlogListCard({ id, toc, created_at, updated_at }) {
    return (
        <Link
            href={`/blogs/${id}`}
            className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 m-4"
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

                {/* Time Information */}
                <div className="text-gray-500 text-xs">
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
