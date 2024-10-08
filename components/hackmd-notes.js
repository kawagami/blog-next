'use client';

import Link from "next/link";
import { useEffect } from "react"; // 引入 useEffect
import { useNoteContext } from "@/provider/note-provider";

let defaultCount = 0;

export default function HackMDNotesComponent(props) {
    const { openArray, setOpenArray } = useNoteContext();

    // 使用 useEffect 來處理狀態更新
    useEffect(() => {
        if (openArray.length === 0 && defaultCount === 0) {
            defaultCount++;
            setOpenArray(props.defaultOpenArray);
        }
    }, [openArray, props.defaultOpenArray, setOpenArray]); // 依賴項

    // 過濾
    const filterData = props.notes
        .filter(note => note.read_permission === 'guest')  // 過濾訪客不能看的
        .filter(note => openArray.some(open => note.categories.includes(open)))  // 在 openArray 中存在的分類才會顯示
        .filter(note => !note.categories.includes('工作'));  // 過濾工作分類的

    return (
        <>
            <div className="text-lg font-semibold mb-4">
                總共 {filterData.length} 個筆記
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4">
                {
                    filterData.map(note => {
                        const date = new Date(note.last_changed_at);
                        const middleData = date.toISOString().split('T');
                        const formattedDate = middleData[0].replace(/-/g, '/');
                        const formattedTime = middleData[1].split('.')[0];

                        return (
                            <Link
                                className="border-4 rounded-xl border-cyan-400 p-4 hover:scale-105 hover:shadow-lg transition-all bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                                target="_blank"
                                href={note.publish_link}
                                key={note.id}
                            >
                                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{note.title}</div>
                                <div className="text-gray-600 dark:text-gray-300">{formattedDate}</div>
                                <div className="text-gray-600 dark:text-gray-300 mb-4">{formattedTime}</div>
                                <div className="flex gap-2 flex-wrap justify-center">
                                    {note.categories.map(category => (
                                        <span
                                            key={category}
                                            className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
}
