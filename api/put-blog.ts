"use server";

import adminRequest from "@/libs/adminRequest";
import type { BlogInput, Blog } from "@/types";

async function putBlog(id: string, blog: BlogInput): Promise<Blog> {
    return adminRequest({
        url: `${process.env.API_URL}/blogs/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(blog),
    });
}

export default putBlog;
