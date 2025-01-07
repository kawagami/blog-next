'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { clearSession } from '@/app/login/actions';
import putBlog from '@/api/put-blog';
import { useAppContext } from "@/provider/app-provider";
import 'cherry-markdown/dist/cherry-markdown.min.css';

export default function BlogComponent({ id, blog }) {
    const editorRef = useRef(null);
    const cherryInstanceRef = useRef(null);
    const tokenRef = useRef(null);
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 新增模態框位置
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState(blog.tags || []);
    const { isDark, allTags } = useAppContext();

    useEffect(() => {
        const checkSession = () => {
            const cookies = document.cookie;
            const sessionMatch = cookies.match(/(?:^|;)\s*session=([^;]+)/);
            const session = sessionMatch ? decodeURIComponent(sessionMatch[1]) : null;
            if (!session) router.push('/login');
            tokenRef.current = session;
        };
        checkSession();
    }, [router]);

    /**
     * 上傳文件函數
     * @param {File} file 上傳文件的文件對象
     * @param {Function} callback 回調函數，接收文件上傳後的 url 和額外信息
     */
    const myFileUpload = (file, callback) => {
        const token = tokenRef.current;
        if (!token) return;

        const formData = new FormData();
        formData.append('file', file);

        fetch('https://axum.kawa.homes/firebase', {
            method: 'POST',
            body: formData,
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        })
            .then(response => response.ok ? response.json() : Promise.reject('Upload failed'))
            .then(data => callback(data.url))
            .catch(async () => {
                await clearSession();
                router.push('/login');
            });
    };

    useEffect(() => {
        let isMounted = true;
        if (editorRef.current && editorRef.current.id) {
            import('cherry-markdown').then((Cherry) => {
                if (isMounted) {
                    cherryInstanceRef.current = new Cherry.default({
                        id: editorRef.current.id,
                        value: blog.markdown || "New Blog",
                        fileUpload: myFileUpload,
                        config: {
                            height: '100%',
                            placeholder: 'Start writing here...',
                            editor: { autoHeight: false },
                        },
                    });
                }
            });
        }
        return () => { isMounted = false; };
    }, [blog.markdown]);

    useEffect(() => {
        if (cherryInstanceRef.current) {
            cherryInstanceRef.current.setTheme(isDark ? 'dark' : 'light');
        }
    }, [isDark]);

    const handleSave = async () => {
        setIsSaving(true);
        const markdown = cherryInstanceRef.current?.getMarkdown();
        const html = cherryInstanceRef.current?.getHtml();
        const tocs = cherryInstanceRef.current?.getToc();
        if (!markdown || !html) return setIsSaving(false);

        try {
            await putBlog(id, { id, markdown, html, tags, tocs });
            router.push('/admin/blogs');
        } catch (error) {
            setIsSaving(false);
        }
    };

    const handleShowTagModal = (event) => {
        // 獲取點擊位置
        const { clientX, clientY } = event;
        setModalPosition({ x: clientX, y: clientY });
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
            <div className="h-[calc(100svh-180px)] overflow-auto w-full">
                <div className="flex justify-evenly m-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${isSaving
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                            }`}
                    >
                        {isSaving ? '存檔中...' : '存檔'}
                    </button>

                    <button
                        onClick={handleShowTagModal} // 修改為追蹤點擊位置
                        className="px-6 py-2 font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        編輯類型
                    </button>
                </div>

                <div className="h-[calc(100svh-180px-72px)] overflow-auto w-full">
                    <div id="editor" ref={editorRef}></div>
                </div>
            </div>

            {showTagModal && (
                <div
                    className="fixed min-w-max z-10"
                    style={{
                        transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`, // 根據位置動態設置
                        left: 0,
                        top: 0,
                    }}
                >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">編輯類型</h2>

                        <input
                            tag="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
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

                        {/* 顯示所有 allTags */}
                        <div className="mt-4">
                            <h3 className="text-md font-medium mb-2">所有類型</h3>
                            <ul className="space-y-2 max-h-40 overflow-auto border-t pt-2">
                                {allTags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center"
                                    >
                                        <span>{tag}</span>
                                        <button
                                            onClick={() => {
                                                if (!tags.includes(tag)) {
                                                    setTags([...tags, tag]);
                                                }
                                            }}
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
