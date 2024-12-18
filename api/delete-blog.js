"use server";

import apiRequest from "@/libs/apiRequest";

async function deleteBlog(id) {
    const data = await apiRequest({
        url: `${process.env.API_URL}/blogs/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    });

    return data;
}

export default deleteBlog;