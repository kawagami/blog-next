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

    const commonStyle = "p-2 border-2 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white hover:scale-105";

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
                                ? "invert bg-blue-500 hover:bg-blue-400"
                                : "hover:bg-blue-100 bg-gray-300";
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
