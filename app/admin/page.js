'use server';

import Link from "next/link";

export default async function AdminPage() {
    return (
        <>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
                <div className="space-y-4">
                    <Link
                        href="/admin/images"
                        className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Manage Images
                    </Link>
                    <Link
                        href="/admin/blogs"
                        className="px-6 py-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                    >
                        Manage Blogs
                    </Link>
                </div>
            </div>

        </>
    );
}
