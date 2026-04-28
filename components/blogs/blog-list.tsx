"use server";

import getBlogs from '@/api/get-blogs';
import BlogListCard from '@/components/blogs/blog-list-card';

export default async function BlogList() {
    const blogs = await getBlogs();

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto">
            <div className="max-w-2xl mx-auto">
                {blogs.map((blog) => (
                    <BlogListCard
                        key={blog.id}
                        id={blog.id}
                        toc={blog.tocs[0] || '未命名 blog'}
                        tags={blog.tags || []}
                        created_at={blog.created_at ?? ''}
                        updated_at={blog.updated_at ?? ''}
                    />
                ))}
            </div>
        </div>
    );
}
