"use client";

import { useState } from "react";
import type { HackmdTag } from "@/types";

interface Props {
    tags: HackmdTag[];
    openArray: string[];
    setOpenArray: (arr: string[]) => void;
}

export default function HackmdNoteTagButtons({ tags, openArray, setOpenArray }: Props) {
    const [showFilter, setShowFilter] = useState(false);

    const checkExist = (name: string) => {
        const result = openArray.includes(name)
            ? openArray.filter(o => o !== name)
            : [name, ...openArray];
        setOpenArray(result);
    };

    const commonStyle = "p-2 border-2 rounded-lg bg-stone-200 dark:bg-stone-800 dark:text-white hover:border-primary-400 transition-colors";

    return (
        <>
            <div className="gap-1 text-center p-2 mb-2">
                <button type="button" className={commonStyle} onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? "隱藏分類" : "顯示分類"}
                </button>
            </div>
            {showFilter && (
                <div>
                    <div className="flex flex-wrap justify-center gap-2 p-2 mb-2">
                        <button type="button" className={commonStyle} onClick={() => setOpenArray(tags.map(t => t.name))}>全選</button>
                        <button type="button" className={commonStyle} onClick={() => setOpenArray([])}>全不選</button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map(tag => {
                            const tailwindStyle = openArray.includes(tag.name)
                                ? "invert bg-primary-500 hover:bg-primary-400"
                                : "hover:bg-primary-100 dark:hover:bg-primary-900 bg-stone-300 dark:bg-stone-600";
                            return (
                                <button
                                    type="button"
                                    className={`${commonStyle} ${tailwindStyle}`}
                                    key={tag.id}
                                    onClick={() => checkExist(tag.name)}
                                >
                                    {tag.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
