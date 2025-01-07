'use server';

import getBlogs from '@/api/get-blogs';
import Blogs from '@/components/blogs/blogs';
import Tags from '@/components/blogs/tags';

export default async function BlogsPage() {
    const blogs = await getBlogs();
    const flattenedTags = Array.from(new Set(blogs.flatMap(item => item.tags)));

    return (
        <div className="w-full h-[calc(100svh-120px)] flex">
            <div className="w-1/5 p-4">
                <Tags tags={flattenedTags || []} />
            </div>
            <div className="w-3/5 overflow-auto">
                <Blogs blogs={blogs || []} />
            </div>
            <div className="w-1/5"></div>

        </div>
    );
}
