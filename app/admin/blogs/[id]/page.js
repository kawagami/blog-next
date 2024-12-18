'use server';

import getBlog from "@/api/get-blog";
import BlogComponent from "@/components/blogs/blog-component";

export default async function BlogPage({ params }) {
    const id = (await params).id
    const blog = await getBlog(id);

    return <BlogComponent id={id} blog={blog} />
}
