"use client";

import { useAppContext } from "@/provider/app-provider";
import BlogListCardClient from "@/components/blogs/blog-list-card-client";

export default function Blogs({ blogs }) {
    const { visibleBlogs } = useAppContext();

    // 過濾 blogs，如果沒有選中標籤 (visibleBlogs === null)，顯示所有
    const filteredBlogs = visibleBlogs
        ? blogs.filter((blog) => blog.tags?.includes(visibleBlogs))
        : blogs;

    return (
        <>
            {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                    <BlogListCardClient
                        key={blog.id}
                        id={blog.id}
                        toc={blog.tocs[0] || '未命名 blog'}
                        tags={blog.tags || []}
                        created_at={blog.created_at}
                        updated_at={blog.updated_at}
                    />
                ))
            ) : (
                <div className="text-center text-gray-500 mt-4">
                    找不到符合條件
                </div>
            )}
        </>
    );
}
