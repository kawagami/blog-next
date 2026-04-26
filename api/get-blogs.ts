"use server";

import type { Blog } from "@/types";

async function getBlogs(): Promise<Blog[]> {
    const res = await fetch(`${process.env.API_URL}/blogs`, { cache: 'no-store' });
    return res.json();
}

export default getBlogs;
