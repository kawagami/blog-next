'use server';

import getBlogs from '@/api/get-blogs';
import CreateButton from '@/components/blogs/create-button';
import EditButton from '@/components/blogs/edit-button';
import DeleteButton from '@/components/blogs/delete-button';

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100">
            {/* Page Header */}
            <div className="mb-8 flex justify-center">
                <CreateButton />
            </div>

            {/* Blogs List */}
            <div className="bg-white shadow rounded-lg p-6">
                {blogs.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <li
                                key={blog.id}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                            >
                                {/* Blog Title */}
                                <span className="text-gray-800 font-medium truncate max-w-xs">
                                    {blog.tocs[0] || '未命名 blog'}
                                </span>

                                {/* Actions */}
                                <div className="flex space-x-2">
                                    <EditButton uuid={blog.id} />
                                    <DeleteButton uuid={blog.id} />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">暫無 blog 內容</p>
                )}
            </div>
        </div>
    );
}
