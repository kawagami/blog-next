'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { clearSession } from '@/app/login/actions'; // 確保此路徑正確
import putBlog from '@/api/put-blog';

// 動態載入樣式，避免 SSR 衝突
const CherryEditor = dynamic(
    () => import('cherry-markdown').then((mod) => mod.default),
    { ssr: false }
);
import 'cherry-markdown/dist/cherry-markdown.min.css';

export default function BlogComponent({ id, blog }) {
    const editorRef = useRef(null);
    const cherryInstanceRef = useRef(null);
    const tokenRef = useRef(null);
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false); // 新增狀態

    useEffect(() => {
        const checkSession = () => {
            // 從 cookies 中讀取 session
            const cookies = document.cookie;
            const sessionMatch = cookies.match(/(?:^|;)\s*session=([^;]+)/);
            const session = sessionMatch ? decodeURIComponent(sessionMatch[1]) : null;

            if (!session) {
                // 若未找到 session，跳轉到 /login
                router.push('/login');
                return;
            }

            // 若有 session，可將其存儲到 ref 或進行其他操作
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
        const token = tokenRef.current; // 從 ref 獲取 token
        if (!token) {
            console.log('Session token is not available.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const headers = token ? {
            'Authorization': `Bearer ${token}`,
        } : {};

        fetch('https://axum.kawa.homes/firebase', {
            method: 'POST',
            body: formData,
            headers: headers, // Include the headers in the request
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
                return response.json();
            })
            .then((data) => {
                if (data.url) {
                    callback(data.url);
                } else {
                    throw new Error(data.error || 'Upload failed');
                }
            })
            .catch(async (err) => {
                console.error(err.message);
                await clearSession(); // 清除 session
                router.push('/login'); // 跳轉到 /login
            });
    };

    useEffect(() => {
        let isMounted = true;

        if (editorRef.current && editorRef.current.id) {
            import('cherry-markdown').then((Cherry) => {
                if (isMounted) {
                    cherryInstanceRef.current = new Cherry.default({
                        id: editorRef.current.id,
                        value: blog.markdown ?? "New Blog",
                        fileUpload: myFileUpload,
                        config: {
                            height: '100%', // 繼承父容器高度
                            placeholder: 'Start writing here...',
                            editor: {
                                autoHeight: false, // 防止編輯器自適應高度
                            },
                        },
                    });

                    // cherryInstanceRef.current.setTheme('dark');
                }
            });
        }

        return () => {
            isMounted = false; // 防止卸載後繼續操作
        };
    }, []);

    const handleSave = async () => {
        setIsSaving(true); // 點擊後禁用按鈕
        const markdown = cherryInstanceRef.current?.getMarkdown();
        const html = cherryInstanceRef.current?.getHtml();
        const tocs = cherryInstanceRef.current?.getToc();
        if (!markdown || !html) {
            console.error('No content to save.');
            setIsSaving(false); // 若失敗則恢復按鈕
            return;
        }

        try {
            const response = await putBlog(id, { id: id, markdown: markdown, html: html, tags: [], tocs: tocs });
            console.log('Blog saved:', response);
            router.push('/admin/blogs');
        } catch (error) {
            console.error('Failed to save blog:', error);
            setIsSaving(false); // 若失敗則恢復按鈕
        }
    };

    return (
        <>
            <div style={{ height: '800px', width: '100%' }}>
                {/* 點擊後使用 putBlog */}
                <div className="flex justify-center m-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving} // 根據狀態禁用按鈕
                        className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${isSaving
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                            }`}
                    >
                        {isSaving ? '存檔中...' : '存檔'}
                    </button>
                </div>
                <div id="editor" ref={editorRef}></div>
            </div>
        </>
    );
}
