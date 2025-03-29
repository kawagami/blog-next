"use server";

import Link from "next/link";

export default async function Stocks() {

    return (
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            <div className="w-full flex justify-center gap-4">
                <Link
                    href="/admin/stocks/list"
                    className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                >
                    List
                </Link>
                <Link
                    href="/admin/stocks/search"
                    className="px-6 py-3 font-semibold text-white bg-indigo-600 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
                >
                    Search
                </Link>
            </div>
        </div>
    );
}