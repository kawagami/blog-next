"use server";

import apiRequest from "@/libs/apiRequest";

async function deleteBlog(id: string): Promise<void> {
    await apiRequest({
        url: `${process.env.API_URL}/blogs/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    });
}

export default deleteBlog;
