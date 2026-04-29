"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import putBlog from '@/api/put-blog';
import uploadFirebaseImage from '@/api/upload-image';
import type { Blog, Toc } from '@/types';

function extractTocs(markdown: string): Toc[] {
    return markdown.match(/^#{1,6}\s+(.+)$/gm)?.map((h, index) => ({
        id: String(index),
        level: h.match(/^#+/)![0].length,
        text: h.replace(/^#{1,6}\s+/, ''),
    })) || [];
}

interface Props {
    id: string;
    blog: Blog;
    allTags: string[];
}

export default function BlogComponent({ id, blog, allTags }: Props) {
    const router = useRouter();
    const [markdown, setMarkdown] = useState(blog.markdown || '');
    const [tags, setTags] = useState<string[]>(blog.tags || []);
    const [isSaving, setIsSaving] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [newTag, setNewTag] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pendingImagesRef = useRef<Map<string, File>>(new Map());

    useEffect(() => {
        return () => {
            pendingImagesRef.current.forEach((_, blobUrl) => URL.revokeObjectURL(blobUrl));
        };
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let updatedMarkdown = markdown;
            const matches = [...updatedMarkdown.matchAll(/!\[([^\]]*)\]\((blob:[^)]+)\)/g)];
            for (const match of matches) {
                const blobUrl = match[2];
                const file = pendingImagesRef.current.get(blobUrl);
                if (!file) continue;
                const formData = new FormData();
                formData.append('file', file);
                const data = await uploadFirebaseImage(formData);
                updatedMarkdown = updatedMarkdown.replace(blobUrl, data.url);
                URL.revokeObjectURL(blobUrl);
                pendingImagesRef.current.delete(blobUrl);
            }
            const tocs = extractTocs(updatedMarkdown);
            await putBlog(id, { markdown: updatedMarkdown, tags, tocs });
            router.push('/admin/blogs');
        } catch {
            setIsSaving(false);
        }
    };

    const insertAtCursor = (text: string) => {
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

    const handleImageUpload = (file: File | undefined) => {
        if (!file) return;
        const blobUrl = URL.createObjectURL(file);
        pendingImagesRef.current.set(blobUrl, file);
        insertAtCursor(`![image](${blobUrl})`);
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'));
        if (!file) return;
        e.preventDefault();
        handleImageUpload(file);
    };

    const handleShowTagModal = (event: React.MouseEvent) => {
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
                        disabled={isSaving}
                        className="px-6 py-2 font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        上傳圖片
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
                    <div className="relative h-full">
                    <textarea
                        ref={textareaRef}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        onPaste={handlePaste}
                        className="w-full h-full p-4 rounded border border-gray-300 font-mono resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        placeholder="輸入 Markdown 內容..."
                    />
                    </div>
                    <div className="p-4 h-full overflow-auto border border-gray-300 bg-white dark:bg-gray-800 dark:text-white rounded prose max-w-none dark:prose-invert">
                        <ReactMarkdown urlTransform={(url) => url.startsWith('blob:') || url.startsWith('https://') || url.startsWith('http://') || url.startsWith('/') ? url : ''}>{markdown}</ReactMarkdown>
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
