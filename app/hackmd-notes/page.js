import getHackMDNotes from "@/api/get-hackmd-notes";
import Link from "next/link";

export const metadata = {
    title: "HackMD Notes",
    description: "HackMD Notes",
};

export default async function HackMDNotes() {
    const notes = await getHackMDNotes();
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
                {

                    notes
                        .filter(note => note.read_permission === 'guest')  // 過濾訪客不能看的
                        .filter(note => !note.categories.includes('工作'))  // 過濾工作分類的
                        // .sort(function (a, b) {
                        //     // 依照 last_changed_at 倒序排列
                        //     return b.last_changed_at - a.last_changed_at;
                        // })
                        .map(note => {
                            let date = new Date(note.last_changed_at);

                            let dateString = date.toLocaleDateString(); // 获取日期字符串
                            let timeString = date.toLocaleTimeString(); // 获取时间字符串

                            // 将日期和时间字符串组合成一个完整的日期时间字符串
                            let datetimeString = dateString + ' ' + timeString;

                            return (
                                <Link
                                    className="border-4 rounded-xl border-cyan-400 p-2 hover:scale-110 hover:font-bold hover:text-lg hover:text-blue-400"
                                    target="_blank"
                                    href={note.publish_link}
                                >
                                    {/* <div>{note.id}</div> */}
                                    <div>{note.title}</div>
                                    {/* <div>{note.last_changed_at}</div> */}
                                    <div>{datetimeString}</div>
                                </Link>
                            )
                        })
                }
            </div>
        </>
    )
}