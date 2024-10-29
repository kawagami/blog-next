'use client';

import { useNoteContext } from "@/provider/note-provider";
import { useState } from "react";
import { motion } from "framer-motion"; // 使用 framer-motion 來添加動畫效果

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
        "hover:scale-105",
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
            <div className="grid grid-cols-1 gap-1 text-center p-2 mb-2">
                <span className={commonStyle} onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? "隱藏分類" : "顯示分類"}
                </span>
            </div>

            {showFilter && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-wrap justify-center gap-2 p-2 mb-2">
                        <span className={commonStyle} onClick={clickAll}>全選</span>
                        <span className={commonStyle} onClick={clickNothing}>全不選</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {props.tags.map(tag => {
                            const tailwindStyle = openArray.includes(tag.name)
                                ? "invert bg-blue-500 hover:bg-blue-400"
                                : "hover:bg-blue-100 bg-gray-300";
                            return (
                                <span
                                    className={`${commonStyle} ${tailwindStyle}`}
                                    key={tag.id}
                                    onClick={() => checkExist(tag.name)}
                                >
                                    {tag.name}
                                </span>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </>
    );
}
