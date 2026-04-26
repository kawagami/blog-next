"use client";

import type { User } from "@/types";

export default function DeleteButton({ user }: { user: User }) {
    const handleDelete = async (user: User) => {
        alert(`收到 ${user.name} 的資料`);
    };

    return (
        <button onClick={() => handleDelete(user)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
        </button>
    );
}
