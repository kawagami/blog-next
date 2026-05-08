import getCurrentMember from "@/api/get-current-member";
import Link from "next/link";
import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";

export const metadata: Metadata = {
    title: "個人資料",
};

const PROVIDER_LABELS: Record<string, string> = {
    google: "Google",
    github: "GitHub",
    line: "LINE",
};

export default async function ProfilePage() {
    const member = await getCurrentMember();

    return (
        <div className="w-full max-w-2xl px-4 py-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">個人資料</h1>
                <Link
                    href="/dashboard"
                    className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                    <LayoutDashboard size={16} />
                    儀表板
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    {member.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={member.avatar_url}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                            {member.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-semibold">{member.name}</span>
                        {member.email && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">{member.email}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span>加入時間：{new Date(member.created_at).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>

                {member.providers.length > 0 && (
                    <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">已連結帳號</span>
                        <div className="flex gap-2 flex-wrap">
                            {member.providers.map(p => (
                                <span
                                    key={p}
                                    className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                                >
                                    {PROVIDER_LABELS[p] ?? p}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
