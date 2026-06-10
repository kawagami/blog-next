import { cache } from "react";
import type { Metadata } from "next";
import { getBlog } from "@/api/blogs";
import BlogPreviewComponent from "@/components/blogs/blog-preview-component";

const fetchBlog = cache(getBlog);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const id = (await params).id;
    const blog = await fetchBlog(id);
    const title = blog.tocs[0] ?? "Blog";
    return { title: `${title} | Kawa's Blog` };
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const blog = await fetchBlog(id);
    return <BlogPreviewComponent markdown={blog.markdown} />;
}
