"use server";

import { fetchApi } from "@/libs/fetchApi";

export async function getBlogTags(): Promise<string[]> {
    return fetchApi(`${process.env.API_URL}/blogs/tags`);
}
