"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2 } from 'lucide-react';
import { putBlog } from '@/api/blogs';
import { uploadImages } from '@/api/images';
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
    const [isUploading, setIsUploading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [showTagModal, setShowTagModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [newTag, setNewTag] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveError(null);
        try {
            const tocs = extractTocs(markdown);
            await putBlog(id, { markdown, tags, tocs });
            router.push('/admin/blogs');
        } catch (err) {
            if ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) throw err;
            setSaveError('存檔失敗，請再試一次');
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

    const handleImageUpload = async (files: File | FileList | null) => {
        if (!files || isUploading) return;
        const fileArray = files instanceof File ? [files] : Array.from(files);
        if (!fileArray.length) return;
        setIsUploading(true);
        const formData = new FormData();
        fileArray.forEach(f => formData.append('file', f));
        try {
            const data = await uploadImages(formData);
            insertAtCursor(data.map(d => `![image](${d.url})`).join('\n') + '\n');
        } catch (err) {
            setSaveError('圖片上傳失敗，請再試一次');
        } finally {
            setIsUploading(false);
        }
    };

    const INDENT = '  ';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = textarea;
            const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
            const hasSelection = selectionStart !== selectionEnd;
            const multiLine = value.slice(selectionStart, selectionEnd).includes('\n');

            if (e.shiftKey) {
                // unindent each line in (or touching) the selection
                const blockEnd = selectionEnd;
                const before = value.slice(0, lineStart);
                const block = value.slice(lineStart, blockEnd);
                const after = value.slice(blockEnd);
                let removedFirst = 0;
                let removedTotal = 0;
                const newBlock = block.split('\n').map((line, i) => {
                    const m = line.match(/^( {1,2}|\t)/);
                    const cut = m ? m[0].length : 0;
                    if (i === 0) removedFirst = cut;
                    removedTotal += cut;
                    return line.slice(cut);
                }).join('\n');
                const newValue = before + newBlock + after;
                setMarkdown(newValue);
                setTimeout(() => {
                    textarea.selectionStart = Math.max(lineStart, selectionStart - removedFirst);
                    textarea.selectionEnd = blockEnd - removedTotal;
                    textarea.focus();
                }, 0);
                return;
            }

            if (multiLine) {
                // indent every line in the selection
                const before = value.slice(0, lineStart);
                const block = value.slice(lineStart, selectionEnd);
                const after = value.slice(selectionEnd);
                const lines = block.split('\n');
                const newBlock = lines.map(l => INDENT + l).join('\n');
                setMarkdown(before + newBlock + after);
                setTimeout(() => {
                    textarea.selectionStart = selectionStart + INDENT.length;
                    textarea.selectionEnd = selectionEnd + INDENT.length * lines.length;
                    textarea.focus();
                }, 0);
                return;
            }

            // single cursor (or single-line selection) → insert indent
            const newValue = value.slice(0, selectionStart) + INDENT + value.slice(selectionEnd);
            setMarkdown(newValue);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + INDENT.length;
                textarea.focus();
            }, 0);
            return;
        }

        if (e.key !== 'Enter') return;
        const { selectionStart, selectionEnd, value } = textarea;
        const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
        const currentLine = value.slice(lineStart, selectionStart);
        const match = currentLine.match(/^(\s*[-*]\s)/);
        if (!match) return;
        e.preventDefault();
        const prefix = match[1];
        const lineContent = currentLine.slice(prefix.length);
        if (!lineContent) {
            // empty list item → exit list
            const newValue = value.slice(0, lineStart) + '\n' + value.slice(selectionEnd);
            setMarkdown(newValue);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = lineStart + 1;
                textarea.focus();
            }, 0);
            return;
        }
        const insertion = '\n' + prefix;
        const newValue = value.slice(0, selectionStart) + insertion + value.slice(selectionEnd);
        setMarkdown(newValue);
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + insertion.length;
            textarea.focus();
        }, 0);
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'))
            ?? Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'))?.getAsFile()
            ?? undefined;
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
                {saveError && <p className="text-red-500 text-sm text-center mt-2">{saveError}</p>}
                <div className="flex justify-evenly m-4 gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${isSaving
                            ? 'bg-neutral-400 text-neutral-700 cursor-not-allowed'
                            : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {isSaving ? (
                            <span className="flex items-center gap-1"><Loader2 className="w-4 h-4 animate-spin" />存檔中...</span>
                        ) : '存檔'}
                    </button>
                    <button
                        onClick={handleShowTagModal}
                        className="px-6 py-2 font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        編輯類型
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isSaving || isUploading}
                        className="px-6 py-2 font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isUploading ? '上傳中...' : '上傳圖片'}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 flex-1 min-h-0">
                    <div className="relative h-full min-h-[300px]">
                        <textarea
                            ref={textareaRef}
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                            className="w-full h-full p-4 rounded border border-neutral-300 font-mono resize-none dark:bg-neutral-800 dark:text-white dark:border-neutral-600"
                            placeholder="輸入 Markdown 內容..."
                        />
                    </div>
                    <div className="p-4 h-full min-h-[300px] overflow-auto border border-neutral-300 bg-white dark:bg-neutral-800 dark:text-white rounded prose max-w-none dark:prose-invert">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            urlTransform={(url) => url.startsWith('blob:') || url.startsWith('https://') || url.startsWith('http://') || url.startsWith('/') ? url : ''}
                            components={{
                                img: ({ src, alt }) => (
                                    <Image
                                        src={typeof src === 'string' ? src : ''}
                                        alt={alt || ''}
                                        width={800}
                                        height={600}
                                        style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                                    />
                                )
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            {showTagModal && (
                <div
                    className="fixed min-w-max z-10"
                    style={{ transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`, left: 0, top: 0 }}
                >
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">編輯類型</h2>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                            className="w-full p-2 mb-4 border rounded dark:bg-neutral-700"
                            placeholder="輸入新類型..."
                        />
                        <button
                            onClick={handleAddTag}
                            className="w-full mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
                                            className="text-primary-600 hover:underline"
                                        >
                                            新增
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setShowTagModal(false)}
                            className="mt-4 w-full px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700"
                        >
                            關閉
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
