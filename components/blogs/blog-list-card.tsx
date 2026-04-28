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
            className="block bg-white dark:bg-gray-800 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 m-4"
        >
            <div className="p-4">
                <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {toc || `Blog Post #${id}`}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="text-gray-400 dark:text-gray-500 text-xs text-right">
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
