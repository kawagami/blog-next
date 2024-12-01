'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useNoteContext } from "@/provider/note-provider";
import { motion } from "framer-motion";

export default function HackMDNotesComponent(props) {
    const { openArray, setOpenArray } = useNoteContext();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // 確保只在客戶端處理渲染
    }, []);

    useEffect(() => {
        if (openArray.length === 0) {
            setOpenArray(props.defaultOpenArray);
        }
    }, [openArray, props.defaultOpenArray, setOpenArray]);

    return (
        <>
            <div className="text-lg font-semibold mb-4">
                總共 {props.notes.length} 個筆記
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4">
                {props.notes.map(note => {
                    const formattedDate = isClient
                        ? new Intl.DateTimeFormat('zh-TW', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).format(new Date(note.last_changed_at))
                        : '...'; // 在伺服器渲染階段顯示占位符

                    return (
                        <motion.div
                            key={note.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800"
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
                                    {note.tags.map(category => (
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
