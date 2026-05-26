import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPreviewComponent({ markdown }: { markdown: string }) {
    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto px-4 py-6">
            <div className="prose prose-gray dark:prose-invert max-w-prose mx-auto">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        img: ({ src, alt }) => (
                            <Image
                                src={typeof src === 'string' ? src : ''}
                                alt={alt || ''}
                                width={800}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}
