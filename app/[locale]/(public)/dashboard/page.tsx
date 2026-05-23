import getCurrentMember from "@/api/get-current-member";
import Link from "next/link";
import type { Metadata } from "next";
import { Bell, User, BookOpen, FileText, Wrench } from "lucide-react";

export const metadata: Metadata = {
    title: "儀表板",
};

const QUICK_LINKS = [
    { href: "/dashboard/notifications", label: "通知", icon: Bell, desc: "即時 WebSocket 通知" },
    { href: "/profile", label: "個人資料", icon: User, desc: "查看與管理帳號" },
    { href: "/", label: "部落格", icon: BookOpen, desc: "所有文章" },
    { href: "/hackmd-notes", label: "筆記", icon: FileText, desc: "HackMD 同步筆記" },
    { href: "/tools/new-password", label: "工具", icon: Wrench, desc: "密碼、計時、排班" },
];

export default async function DashboardPage() {
    const member = await getCurrentMember();

    return (
        <div className="w-full max-w-3xl px-4 py-8 flex flex-col gap-8">
            <div className="flex items-center gap-4">
                {member.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-300">
                        {member.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">歡迎回來</p>
                    <h1 className="text-2xl font-bold">{member.name}</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUICK_LINKS.map(({ href, label, icon: Icon, desc }) => (
                    <Link
                        key={href}
                        href={href}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-md transition-shadow flex flex-col gap-2 group"
                    >
                        <Icon size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-sm">{label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{desc}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
