'use server';

import getBlogs from '@/api/get-blogs';
import BlogListCard from '@/components/blogs/blog-list-card';

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                {blogs.map((blog) => (
                    <BlogListCard key={blog.id} id={blog.id} toc={blog.tocs[0] || '未命名 blog'} />
                ))}
            </div>
        </>
    );
}
