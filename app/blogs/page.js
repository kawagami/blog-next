import BlogCard from "@/components/blog-card";
import getBlogs from "@/api/get-blogs";

export const metadata = {
    title: "Blogs",
    description: "Blogs",
};

export default async function Blogs() {
    const blogs = await getBlogs();
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {blogs.reverse().map((blog) => (
                    <BlogCard
                        key={blog.id}
                        href={`/blogs/${blog.id}`}
                        title={blog.name}
                        short_content={blog.short_content}
                        blog={blog}
                    />
                ))}
            </div>
        </>
    )
}
