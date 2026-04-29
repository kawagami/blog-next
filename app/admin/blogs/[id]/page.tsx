import getBlog from "@/api/get-blog";
import getBlogs from "@/api/get-blogs";
import BlogComponent from "@/components/blogs/blog-component";
import type { Blog } from "@/types";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const [blogResult, blogs] = await Promise.all([
        getBlog(id).catch((): Blog => ({ id, markdown: '', tags: [], tocs: [] })),
        getBlogs(),
    ]);
    const allTags = Array.from(new Set(blogs.flatMap(item => item.tags))).sort((a, b) => a.localeCompare(b));

    return <BlogComponent id={id} blog={blogResult} allTags={allTags} />;
}
