import BlogCard from "@/components/blog-card";
import getBlogs from "@/api/get-blogs";
import { hset, hgetAll } from "@/lib/redis";

export const metadata = {
    title: "Blogs",
    description: "Blogs",
};

export default async function Blogs() {
    let blogs;

    const redisData = await hgetAll("blogs");

    if (redisData && Object.keys(redisData) > 0) {
        // console.log(redisData);
        blogs = Object.values(redisData);
        blogs = blogs.map(blog => JSON.parse(blog));
    } else {
        blogs = await getBlogs();
        blogs.map(async blog => await hset("blogs", blog.id, JSON.stringify(blog)));
    }

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
