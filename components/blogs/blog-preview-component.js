"use client";

import { useEffect, useRef } from 'react';
import 'cherry-markdown/dist/cherry-markdown.min.css';
import { useAppContext } from "@/provider/app-provider";

export default function BlogPreviewComponent({ markdown }) {
    const editorRef = useRef(null);
    const cherryInstanceRef = useRef(null);
    const { isDark } = useAppContext();

    useEffect(() => {
        let isMounted = true;

        if (editorRef.current && editorRef.current.id) {
            import('cherry-markdown').then((Cherry) => {
                if (isMounted) {
                    cherryInstanceRef.current = new Cherry.default({
                        id: editorRef.current.id,
                        value: markdown,
                        config: {
                            height: '100%', // 繼承父容器高度
                            placeholder: 'Start writing here...',
                            editor: {
                                autoHeight: false, // 防止編輯器自適應高度
                            },
                        },
                    });

                    cherryInstanceRef.current.switchModel('previewOnly');
                    // 根據當前主題設置初始主題
                    cherryInstanceRef.current.setTheme(isDark ? 'dark' : 'light');
                }
            });
        }

        return () => {
            isMounted = false; // 防止卸載後繼續操作
        };
    }, [markdown]); // 僅在 markdown 改變時重新初始化

    useEffect(() => {
        if (cherryInstanceRef.current) {
            // 根據 isDark 切換主題
            cherryInstanceRef.current.setTheme(isDark ? 'dark' : 'light');
        }
    }, [isDark]); // 監聽 isDark 的變化

    return (
        <>
            <div className="h-[calc(100svh-120px)] overflow-auto">
                <div id="show_markdown" ref={editorRef}></div>
            </div>
        </>
    );
}