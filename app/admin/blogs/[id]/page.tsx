"use server";

import getBlog from "@/api/get-blog";
import getBlogs from "@/api/get-blogs";
import BlogComponent from "@/components/blogs/blog-component";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const [blog, blogs] = await Promise.all([getBlog(id), getBlogs()]);
    const allTags = Array.from(new Set(blogs.flatMap(item => item.tags))).sort((a, b) => a.localeCompare(b));

    return <BlogComponent id={id} blog={blog} allTags={allTags} />;
}
