'use client'

import getBlog from '@/api/get-blog'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function MarkdownEditorPage() {
    const [markdown, setMarkdown] = useState('')
    const params = useParams()

    useEffect(() => {
        if (!params?.id) return

        const fetchBlog = async () => {
            try {
                const blog = await getBlog(params.id)
                console.log(blog);
                
                setMarkdown(blog.markdown || '') // 假設 blog 裡有 markdown 欄位
            } catch (err) {
                console.error('Failed to load blog:', err)
            }
        }

        fetchBlog()
    }, [params.id])

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto">
            <h1 className="text-3xl font-bold mb-6">📝 Markdown 編輯器</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 編輯區 */}
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="w-full h-96 p-4 rounded border border-gray-300 font-mono resize-none"
                    placeholder="輸入 Markdown 內容..."
                />

                {/* 預覽區 */}
                <div className="p-4 h-96 overflow-auto border border-gray-300 bg-white rounded prose max-w-none">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
