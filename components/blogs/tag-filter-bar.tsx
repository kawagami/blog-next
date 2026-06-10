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
                            ? 'bg-primary-600 text-white dark:bg-primary-500'
                            : 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}
