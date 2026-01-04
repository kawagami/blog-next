"use client";

// import postUser from "@/api/post-stock";

export default function DeleteButton({ stock }) {

    const handleDelete = async (stock) => {
        alert(`DeleteButton 收到 ${stock.id} 的資料`);

        // todo
        // const response = await postUser(fake_user);
        // console.log(response);

    };

    return (
        <button
            onClick={() => handleDelete(stock)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
            DEL
        </button>
    );
}
