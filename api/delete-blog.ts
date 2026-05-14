"use server";

import adminRequest from "@/libs/adminRequest";

async function deleteBlog(id: string): Promise<void> {
    await adminRequest({
        url: `${process.env.API_URL}/admin/blogs/${id}`,
        method: 'DELETE',
    });
}

export default deleteBlog;
