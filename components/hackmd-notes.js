'use client';

import Link from "next/link";
import { useNoteContext } from "@/provider/note-provider";

let defaultCount = 0;

export default function HackMDNotesComponent(props) {
    const { openArray, setOpenArray } = useNoteContext();

    // 預設筆記全選
    const checkDefault = () => {
        if (openArray.length === 0 && defaultCount === 0) {
            defaultCount++;
            setOpenArray(props.defaultOpenArray);

        }
    };

    checkDefault();

    // 過濾
    const filterData = props.notes
        .filter(note => note.read_permission === 'guest')  // 過濾訪客不能看的
        .filter(note => openArray.some(open => note.categories.includes(open)))  // 在 openArray 中存在的分類才會顯示
        .filter(note => !note.categories.includes('工作'));  // 過濾工作分類的

    return (
        <>
            <div>
                總共 {filterData.length} 個筆記
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
                {
                    filterData.map(note => {

                        const date = new Date(note.last_changed_at);
                        const middleData = date.toISOString().split('T');
                        const formattedDate = middleData[0].replace(/-/g, '/');
                        const formattedTime = middleData[1];

                        return (
                            <Link
                                className="border-4 rounded-xl border-cyan-400 p-2 hover:scale-110 hover:font-bold hover:text-lg hover:text-blue-400 text-center"
                                target="_blank"
                                href={note.publish_link}
                                key={note.id}
                            >
                                <div className="text-2xl">{note.title}</div>
                                <div>{formattedDate}</div>
                                <div>{formattedTime}</div>
                                <div className="flex gap-4 justify-center">
                                    {note.categories.map(category => <span key={category} className="bg-gray-200 dark:bg-gray-800 text-sm p-2 rounded-full">{category}</span>)}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
}