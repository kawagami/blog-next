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
        "hover:scale-150",
        "hover:invert"
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
            <div className="grid grid-cols-1 gap-1 text-center p-1">
                {
                    showFilter
                        ?
                        <span className={commonStyle} onClick={() => setShowFilter(!showFilter)}>隱藏分類</span>
                        :
                        <span className={commonStyle} onClick={() => setShowFilter(!showFilter)}>顯示分類</span>
                }
            </div>

            {
                showFilter
                    ?
                    <>
                        <div className="grid grid-cols-2 gap-1 text-center p-1">
                            <span className={commonStyle} onClick={() => clickAll()}>全選</span>
                            <span className={commonStyle} onClick={() => clickNothing()}>全不選</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-1 text-center">
                            {props.tags.map(tag => {
                                let tailwindStyle = ["border-2", "rounded-lg", "bg-gray-300", "dark:bg-gray-800", "dark:text-white", "hover:scale-150"];
                                tailwindStyle = openArray.includes(tag.name) ? ["invert", "hover:invert-0", "hover:z-10", ...tailwindStyle] : ["hover:invert", ...tailwindStyle];

                                tailwindStyle = tailwindStyle.join(' ');
                                return (
                                    <span
                                        className={tailwindStyle}
                                        key={tag.id}
                                        onClick={() => { checkExist(tag.name) }}
                                    >
                                        {tag.name}
                                    </span>
                                );
                            })}
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    );
}