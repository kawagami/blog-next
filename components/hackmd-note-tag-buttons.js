'use client';

import { useNoteContext } from "@/provider/note-provider";

export default async function HackmdNoteTagButtons(props) {
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
        "hover:scale-110",
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
            <div className="grid grid-cols-2 gap-1 text-center p-1">
                <span className={commonStyle} onClick={() => clickAll()}>全選</span>
                <span className={commonStyle} onClick={() => clickNothing()}>全不選</span>
            </div>
            <div className="grid grid-cols-12 gap-1 text-center">
                {props.tags.map(tag => {
                    let tailwindStyle = ["border-2", "rounded-lg", "bg-gray-300", "dark:bg-gray-800", "dark:text-white", "hover:scale-110", "hover:invert"];
                    tailwindStyle = openArray.includes(tag.name) ? ["invert", ...tailwindStyle] : [...tailwindStyle];

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
    );
}