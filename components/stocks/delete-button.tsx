"use client";

export default function DeleteButton({ id }: { id: string | number }) {
    return (
        <button onClick={() => alert(`DeleteButton 收到 ${id} 的資料`)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            DEL
        </button>
    );
}
