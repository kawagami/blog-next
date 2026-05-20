"use client"

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    tags: string[]
    selectedTag: string | null
}

export default function TagFilterBar({ tags, selectedTag }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function selectTag(tag: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('page')
        if (selectedTag === tag) {
            params.delete('tag')
        } else {
            params.set('tag', tag)
        }
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="sticky top-2 flex flex-col gap-1.5">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => selectTag(tag)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors text-left ${
                        selectedTag === tag
                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}
