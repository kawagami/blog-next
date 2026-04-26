"use server";

import Link from "next/link";
import ShowClientTime from "@/components/blogs/show-client-time";

interface Props {
    id: string;
    toc: string;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export default async function BlogListCard({ id, toc, tags, created_at, updated_at }: Props) {
    return (
        <Link
            href={`/blogs/${id}`}
            className="block bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 m-4"
        >
            <div className="p-4">
                <h2 className="text-center text-4xl font-semibold text-gray-800 mb-2">
                    {toc || `Blog Post #${id}`}
                </h2>
                <div className="flex justify-center gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
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
