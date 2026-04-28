"use client";

import ReactMarkdown from 'react-markdown';

export default function BlogPreviewComponent({ markdown }: { markdown: string }) {
    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto px-4 py-6">
            <div className="prose prose-gray dark:prose-invert max-w-prose mx-auto">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
}
