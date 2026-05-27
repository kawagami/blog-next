"use server";

import { fetchApi } from "@/libs/fetchApi";
import type { Blog } from "@/types";

async function getBlog(id: string): Promise<Blog> {
    return fetchApi(`${process.env.API_URL}/blogs/${id}`, { cache: 'no-store' });
}

export default getBlog;
