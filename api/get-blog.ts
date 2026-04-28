"use server";

import type { Blog } from "@/types";

async function getBlog(id: string): Promise<Blog> {
    const res = await fetch(`${process.env.API_URL}/blogs/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch blog ${id}: ${res.status}`);
    return res.json();
}

export default getBlog;
