'use client';

import { useNoteContext } from "@/provider/note-provider";
import { useState } from "react";

export default function HackmdNoteTagButtons(props) {
    const [showFilter, setShowFilter] = useState(false);
    const { openArray, setOpenArray } = useNoteContext();

    const checkExist = (name) => {
        const result = openArray.includes(name) ? openArray.filter(o => o !== name) : [name, ...openArray];
        setOpenArray(result);
    };

    const commonStyle = [
        "p-2",
        "border-2",
        "rounded-lg",
        "bg-gray-200",
        "dark:bg-gray-800",
        "dark:text-white",
        "hover:scale-105", // 使用較小的縮放
        "transition-transform", // 添加過渡效果
        "duration-200", // 變化持續時間
        "ease-in-out", // 變化效果
    ].join(' ');

    const clickAll = () => {
        const all = props.tags.map(tag => tag.name);
        setOpenArray(all);
    };

    const clickNothing = () => {
        setOpenArray([""]);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-1 text-center p-2 mb-2"> {/* 增加下方邊距 */}
                <span className={commonStyle} onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? "隱藏分類" : "顯示分類"}
                </span>
            </div>

            {showFilter && (
                <>
                    <div className="grid grid-cols-2 gap-2 text-center p-1"> {/* 增加間距 */}
                        <span className={commonStyle} onClick={() => clickAll()}>全選</span>
                        <span className={commonStyle} onClick={() => clickNothing()}>全不選</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-2 text-center">
                        {props.tags.map(tag => {
                            let tailwindStyle = [
                                "border-2",
                                "rounded-lg",
                                "bg-gray-300",
                                "dark:bg-gray-800",
                                "dark:text-white",
                                "hover:scale-105", // 使用較小的縮放
                                "transition-transform",
                                "duration-200",
                                "ease-in-out",
                            ];

                            tailwindStyle = openArray.includes(tag.name)
                                ? ["invert", "hover:invert-0", "hover:z-10", ...tailwindStyle]
                                : ["hover:invert", ...tailwindStyle];

                            return (
                                <span
                                    className={tailwindStyle.join(' ')}
                                    key={tag.id}
                                    onClick={() => { checkExist(tag.name) }}
                                >
                                    {tag.name}
                                </span>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
}
