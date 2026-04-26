"use server";

import type { Blog } from "@/types";

async function getBlog(id: string): Promise<Blog> {
    const res = await fetch(`${process.env.API_URL}/blogs/${id}`, { cache: 'no-store' });
    return res.json();
}

export default getBlog;
