'use client';

// import postUser from "@/api/post-stock";

export default function PendingButton({ stock }) {

    const handlePending = async (stock) => {
        alert(`收到 ${stock.id} 的資料`);

        // todo
        // const response = await postUser(fake_user);
        // console.log(response);

    };

    return (
        <button
            onClick={() => handlePending(stock)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
        >
            再查詢
        </button>
    );
}
