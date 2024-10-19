'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useNoteContext } from "@/provider/note-provider";
import { motion } from "framer-motion";

let defaultCount = 0;

export default function HackMDNotesComponent(props) {
    const { openArray, setOpenArray } = useNoteContext();

    useEffect(() => {
        if (openArray.length === 0 && defaultCount === 0) {
            defaultCount++;
            setOpenArray(props.defaultOpenArray);
        }
    }, [openArray, props.defaultOpenArray, setOpenArray]);

    // 過濾筆記資料
    const filterData = props.notes
        .filter(note => note.read_permission === 'guest')
        .filter(note => openArray.some(open => note.categories.includes(open)))
        .filter(note => !note.categories.includes('工作'));

    return (
        <>
            <div className="text-lg font-semibold mb-4">
                總共 {filterData.length} 個筆記
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4">
                {filterData.map(note => {
                    const date = new Date(note.last_changed_at);
                    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                    return (
                        <motion.div
                            key={note.id}
                            whileHover={{ scale: 1.03 }} // 使用較輕微的縮放效果
                            whileTap={{ scale: 0.97 }}
                            className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800" // 調整邊框和陰影
                        >
                            <Link
                                className="block p-4 text-center"
                                target="_blank"
                                href={note.publish_link}
                            >
                                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                                    {note.title}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">
                                    {formattedDate}
                                </div>
                                <div className="flex gap-2 flex-wrap justify-center mt-2">
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
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
}
