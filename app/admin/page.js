"use server";

import Link from "next/link";

export default async function AdminPage() {
    return (
        <>
            <div className="w-full h-[calc(100svh-180px)] overflow-auto flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 my-8">Admin Dashboard</h1>
                <div className="w-full flex justify-center gap-4">
                    <Link
                        href="/admin/stocks"
                        className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                    >
                        股票
                    </Link>
                    <Link
                        href="/admin/users"
                        className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                    >
                        Manage Users
                    </Link>
                    <Link
                        href="/admin/images"
                        className="px-6 py-3 font-semibold text-white bg-blue-600 border-2 border-blue-700 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition duration-300"
                    >
                        Manage Images
                    </Link>
                    <Link
                        href="/admin/blogs"
                        className="px-6 py-3 font-semibold text-white bg-green-600 border-2 border-green-700 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition duration-300"
                    >
                        Manage Blogs
                    </Link>
                </div>
            </div>
        </>
    );
}
