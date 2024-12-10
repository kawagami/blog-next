'use client';

import { useState, useEffect } from "react";
import { useNoteContext } from "@/provider/note-provider";
import getHackMDNoteTags from "@/api/get-hackmd-note-tags";

export default function HackmdNoteTagButtons() {
    const [showFilter, setShowFilter] = useState(false);
    const [tags, setTags] = useState([]);
    const { openArray, setOpenArray } = useNoteContext();

    useEffect(() => {
        async function fetchTags() {
            const fetchedTags = await getHackMDNoteTags();
            setTags(fetchedTags);
            const defaultOpenArray = fetchedTags.map(tag => tag.name);
            setOpenArray(defaultOpenArray); // 預設全選
        }
        fetchTags();
    }, [setOpenArray]);

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
        const all = tags.map(tag => tag.name);
        setOpenArray(all);
    };

    const clickNothing = () => {
        setOpenArray([""]);
    };

    if (!tags.length) return <div>Loading...</div>;

    return (
        <>
            <div className="grid grid-cols-1 gap-1 text-center p-2 mb-2">
                <span className={commonStyle} onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? "隱藏分類" : "顯示分類"}
                </span>
            </div>

            {showFilter && (
                <div>
                    <div className="flex flex-wrap justify-center gap-2 p-2 mb-2">
                        <span className={commonStyle} onClick={clickAll}>全選</span>
                        <span className={commonStyle} onClick={clickNothing}>全不選</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map(tag => {
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
                </div>
            )}
        </>
    );
}
