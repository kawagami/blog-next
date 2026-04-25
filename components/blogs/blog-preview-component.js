"use client";

import ReactMarkdown from 'react-markdown';

export default function BlogPreviewComponent({ markdown }) {
    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto px-4">
            <div className="prose max-w-none dark:prose-invert mx-auto">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
}
