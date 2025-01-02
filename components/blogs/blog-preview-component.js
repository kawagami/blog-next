'use client';

import { useEffect, useRef } from 'react';
import 'cherry-markdown/dist/cherry-markdown.min.css';

export default function BlogPreviewComponent({ markdown }) {
    const editorRef = useRef(null);
    const cherryInstanceRef = useRef(null);

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
                    // cherryInstanceRef.current.setTheme('dark');
                }
            });
        }

        return () => {
            isMounted = false; // 防止卸載後繼續操作
        };
    }, []);

    return (
        <>
            <div className="h-[800px]">
                <div id="show_markdown" ref={editorRef}></div>
            </div>
        </>
    );
}
