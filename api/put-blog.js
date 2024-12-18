"use server";

import apiRequest from "@/libs/apiRequest";

async function putBlog(id, blog) {
    const data = await apiRequest({
        url: `${process.env.API_URL}/blogs/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(blog),
    });

    return data;
}

export default putBlog;