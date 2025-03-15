'use client';

export default function DeleteButton({ user }) {

    const handleDelete = async (user) => {
        alert(`收到 ${user.id} 的資料`);
    };

    return (
        <button
            onClick={() => handleDelete(user)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
            Delete
        </button>
    );
}
