"use client";

import { useAppContext } from "@/provider/app-provider";

export default function Tags({ tags }) {
    const { visibleBlogs, setVisibleBlogs } = useAppContext();

    return (
        <div className="flex flex-col gap-2 p-4">
            {/* 'All' button */}
            <button
                onClick={() => setVisibleBlogs(null)}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:ring-2 focus:outline-none ${visibleBlogs === null
                    ? "bg-blue-600 text-white focus:ring-blue-400"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
                    }`}
            >
                All
            </button>

            {/* Tags */}
            {tags.map((tag, index) => (
                <button
                    key={index}
                    onClick={() => setVisibleBlogs(tag)}
                    className={`px-4 py-2 text-sm font-medium rounded-md focus:ring-2 focus:outline-none ${visibleBlogs === tag
                        ? "bg-blue-600 text-white focus:ring-blue-400"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
                        }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
