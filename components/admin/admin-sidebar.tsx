"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    FileText,
    Shield,
    Users,
    TrendingUp,
    LogOut,
} from "lucide-react";
import { logout } from "@/actions/auth";

const groups = [
    {
        label: "內容",
        icon: FileText,
        items: [
            { label: "文章", href: "/admin/blogs" },
            { label: "圖片", href: "/admin/images" },
        ],
    },
    {
        label: "系統",
        icon: Shield,
        items: [
            { label: "WS", href: "/admin/ws" },
            { label: "Roles", href: "/admin/roles" },
            { label: "Users", href: "/admin/users" },
        ],
    },
    {
        label: "股票",
        icon: TrendingUp,
        items: [
            { label: "列表", href: "/admin/stocks/list" },
            { label: "回購計畫", href: "/admin/stocks/get-buyback-plans" },
            { label: "未完成回購", href: "/admin/stocks/get-unfinished-buyback-price-gap" },
            { label: "收盤價查詢", href: "/admin/stocks/fetch-stock-closing-price-pair" },
            { label: "當日全部", href: "/admin/stocks/stock-day-all" },
        ],
    },
    {
        label: "會員",
        icon: Users,
        items: [
            { label: "列表", href: "/admin/members" },
        ],
    },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(groups.map(g => [g.label, true]))
    );

    const toggle = (label: string) =>
        setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4 space-y-1">
                {groups.map(group => {
                    const Icon = group.icon;
                    const isOpen = openGroups[group.label];
                    const hasActive = group.items.some(item => pathname.startsWith(item.href));

                    return (
                        <div key={group.label}>
                            <button
                                onClick={() => toggle(group.label)}
                                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-semibold rounded-lg transition-colors
                                    ${hasActive
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <Icon size={16} />
                                    {group.label}
                                </span>
                                {isOpen
                                    ? <ChevronDown size={14} />
                                    : <ChevronRight size={14} />
                                }
                            </button>
                            {isOpen && (
                                <div className="mt-1 ml-4 space-y-1">
                                    {group.items.map(item => {
                                        const isActive = pathname.startsWith(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={onNavigate}
                                                className={`block px-4 py-1.5 text-sm rounded-lg transition-colors
                                                    ${isActive
                                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 font-medium"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form action={logout}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut size={16} />
                        登出
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function AdminSidebar() {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden sm:flex flex-col w-52 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 h-[calc(100svh-120px)] sticky top-0">
                <SidebarContent pathname={pathname} />
            </aside>

            {/* Mobile: hamburger button */}
            <button
                className="sm:hidden fixed top-[58px] left-3 z-40 p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700"
                onClick={() => setDrawerOpen(true)}
                aria-label="開啟選單"
            >
                <Menu size={20} />
            </button>

            {/* Mobile: overlay */}
            {drawerOpen && (
                <div
                    className="sm:hidden fixed inset-0 z-40 bg-black/40"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Mobile: drawer */}
            <aside
                className={`sm:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-semibold text-gray-800 dark:text-white">Admin</span>
                    <button onClick={() => setDrawerOpen(false)} aria-label="關閉選單">
                        <X size={20} />
                    </button>
                </div>
                <SidebarContent pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
            </aside>
        </>
    );
}
