'use client';

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export default function CreateButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(`/admin/blogs/${uuidv4()}`)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
            新增 Blog
        </button>
    );
}
