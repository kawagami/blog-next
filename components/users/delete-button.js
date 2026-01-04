"use client";

import postUser from "@/api/post-user";

export default function DeleteButton({ user }) {

    const handleDelete = async (user) => {
        const fake_user = { name: "name", password: "password", email: "testemail" };
        alert(`收到 ${user.name} 的資料`);

        // todo
        // const response = await postUser(fake_user);
        // console.log(response);

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
