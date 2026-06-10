import { getBlogs } from '@/api/blogs';
import { CreateButton, EditButton, DeleteButton } from '@/components/blogs/blog-action-buttons';

export default async function BlogsPage() {
    const { data: blogs } = await getBlogs({ per_page: 1000 });

    return (
        <div className="w-full p-6 bg-stone-100 dark:bg-stone-900">
            <div className="mb-8 flex justify-center">
                <CreateButton />
            </div>
            <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-6">
                {blogs.length > 0 ? (
                    <ul className="divide-y divide-stone-200 dark:divide-stone-700">
                        {blogs.map((blog) => (
                            <li key={blog.id} className="flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-700 transition">
                                <span className="text-stone-800 dark:text-stone-100 font-medium truncate max-w-xs">
                                    {blog.tocs[0] || '未命名 blog'}
                                </span>
                                <div className="flex space-x-2">
                                    <EditButton uuid={blog.id} />
                                    <DeleteButton uuid={blog.id} />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-stone-500 dark:text-stone-400 text-center">暫無 blog 內容</p>
                )}
            </div>
        </div>
    );
}
