"use server";

import { fetchApi } from "@/libs/fetchApi";
import type { BlogPaginatedResponse } from "@/types";

interface GetBlogsParams {
    page?: number;
    per_page?: number;
    tag?: string | null;
}

async function getBlogs({ page = 1, per_page = 10, tag }: GetBlogsParams = {}): Promise<BlogPaginatedResponse> {
    const params = new URLSearchParams({ page: String(page), per_page: String(per_page) });
    if (tag) params.set('tag', tag);
    return fetchApi(`${process.env.API_URL}/blogs?${params}`, { cache: 'no-store' });
}

export default getBlogs;
