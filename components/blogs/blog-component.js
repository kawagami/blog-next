"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import putBlog from '@/api/put-blog';
import uploadFirebaseImage from '@/api/upload-firebase-image';

function extractTocs(markdown) {
    return markdown.match(/^#{1,6}\s+(.+)$/gm)?.map(h => h.replace(/^#{1,6}\s+/, '')) || ['未命名 blog'];
}

export default function BlogComponent({ id, blog, allTags }) {
    const router = useRouter();
    const [markdown, setMarkdown] = useState(blog.markdown || '');
    const [tags, setTags] = useState(blog.tags || []);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [newTag, setNewTag] = useState('');
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleSave = async () => {
        setIsSaving(true);
        const tocs = extractTocs(markdown);
        try {
            await putBlog(id, { id, markdown, html: markdown, tags, tocs });
            router.push('/admin/blogs');
        } catch {
            setIsSaving(false);
        }
    };

    const insertAtCursor = (text) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        setMarkdown(markdown.slice(0, start) + text + markdown.slice(end));
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + text.length;
            textarea.focus();
        }, 0);
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const data = await uploadFirebaseImage(formData);
            insertAtCursor(`![image](${data.url})`);
        } catch {
            alert('圖片上傳失敗');
        } finally {
            setIsUploading(false);
        }
    };

    const handleShowTagModal = (event) => {
        setModalPosition({ x: event.clientX, y: event.clientY });
        setShowTagModal(true);
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    return (
        <>
            <div className="h-[calc(100svh-180px)] w-full flex flex-col">
                <div className="flex justify-evenly m-4 gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${isSaving
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        {isSaving ? '存檔中...' : '存檔'}
                    </button>
                    <button
                        onClick={handleShowTagModal}
                        className="px-6 py-2 font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        編輯類型
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-2 font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isUploading ? '上傳中...' : '上傳圖片'}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 flex-1 min-h-0">
                    <textarea
                        ref={textareaRef}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="w-full h-full p-4 rounded border border-gray-300 font-mono resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        placeholder="輸入 Markdown 內容..."
                    />
                    <div className="p-4 h-full overflow-auto border border-gray-300 bg-white dark:bg-gray-800 dark:text-white rounded prose max-w-none dark:prose-invert">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {showTagModal && (
                <div
                    className="fixed min-w-max z-10"
                    style={{ transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`, left: 0, top: 0 }}
                >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">編輯類型</h2>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
                            placeholder="輸入新類型..."
                        />
                        <button
                            onClick={handleAddTag}
                            className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            新增類型
                        </button>
                        <ul className="space-y-2">
                            {tags.map((tag, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{tag}</span>
                                    <button
                                        onClick={() => setTags(tags.filter((_, i) => i !== index))}
                                        className="text-red-600 hover:underline"
                                    >
                                        移除
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <h3 className="text-md font-medium mb-2">所有類型</h3>
                            <ul className="space-y-2 max-h-40 overflow-auto border-t pt-2">
                                {allTags.map((tag, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{tag}</span>
                                        <button
                                            onClick={() => { if (!tags.includes(tag)) setTags([...tags, tag]); }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            新增
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setShowTagModal(false)}
                            className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            關閉
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
