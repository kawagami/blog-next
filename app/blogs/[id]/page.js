"use server";

import getBlog from "@/api/get-blog";
import BlogPreviewComponent from "@/components/blogs/blog-preview-component";

export default async function BlogPage({ params }) {
    const id = (await params).id
    const blog = await getBlog(id);

    return <BlogPreviewComponent markdown={blog.markdown} />
}
