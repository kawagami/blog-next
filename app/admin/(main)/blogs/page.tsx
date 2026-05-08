import getBlogs from '@/api/get-blogs';
import CreateButton from '@/components/blogs/create-button';
import EditButton from '@/components/blogs/edit-button';
import DeleteButton from '@/components/blogs/delete-button';

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="w-full p-6 bg-gray-100 dark:bg-gray-900">
            <div className="mb-8 flex justify-center">
                <CreateButton />
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                {blogs.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {blogs.map((blog) => (
                            <li key={blog.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <span className="text-gray-800 dark:text-gray-100 font-medium truncate max-w-xs">
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
                    <p className="text-gray-500 dark:text-gray-400 text-center">暫無 blog 內容</p>
                )}
            </div>
        </div>
    );
}
