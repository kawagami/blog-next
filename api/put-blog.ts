"use server";

import adminRequest from "@/libs/adminRequest";
import type { BlogInput } from "@/types";

async function putBlog(id: string, blog: BlogInput): Promise<void> {
    await adminRequest({
        url: `${process.env.API_URL}/admin/blogs/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(blog),
    });
}

export default putBlog;
