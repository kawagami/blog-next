'use client';

import ReactMarkdown from 'react-markdown';
import { useAppContext } from "@/provider/app-provider";

export default function BlogPreviewComponent({ markdown }) {
    const { isDark } = useAppContext();

    return (
        <>
            <div className="h-[calc(100svh-120px)] overflow-auto">
                <div className={`markdown-body ${isDark ? 'dark-theme' : 'light-theme'}`}>
                    <ReactMarkdown>
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </>
    );
}