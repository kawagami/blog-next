"use server";

import type { BlogPaginatedResponse } from "@/types";

interface GetBlogsParams {
    page?: number;
    per_page?: number;
    tag?: string | null;
}

async function getBlogs({ page = 1, per_page = 10, tag }: GetBlogsParams = {}): Promise<BlogPaginatedResponse> {
    const params = new URLSearchParams({ page: String(page), per_page: String(per_page) });
    if (tag) params.set('tag', tag);
    const res = await fetch(`${process.env.API_URL}/blogs?${params}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    return res.json();
}

export default getBlogs;
