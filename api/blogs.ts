"use server";

import { fetchApi } from "@/libs/fetchApi";
import adminRequest from "@/libs/adminRequest";
import type { Blog, BlogInput, BlogPaginatedResponse } from "@/types";

interface GetBlogsParams {
    page?: number;
    per_page?: number;
    tag?: string | null;
}

export async function getBlogs({ page = 1, per_page = 10, tag }: GetBlogsParams = {}): Promise<BlogPaginatedResponse> {
    const params = new URLSearchParams({ page: String(page), per_page: String(per_page) });
    if (tag) params.set('tag', tag);
    return fetchApi(`${process.env.API_URL}/blogs?${params}`, { cache: 'no-store' });
}

export async function getBlog(id: string): Promise<Blog> {
    return fetchApi(`${process.env.API_URL}/blogs/${id}`, { cache: 'no-store' });
}

export async function getBlogTags(): Promise<string[]> {
    return fetchApi(`${process.env.API_URL}/blogs/tags`);
}

export async function putBlog(id: string, blog: BlogInput): Promise<void> {
    await adminRequest({
        url: `${process.env.API_URL}/admin/blogs/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(blog),
    });
}

export async function deleteBlog(id: string): Promise<void> {
    await adminRequest({
        url: `${process.env.API_URL}/admin/blogs/${id}`,
        method: 'DELETE',
    });
}
