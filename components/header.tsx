"use client";

import { useState } from 'react';
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import { logout } from '@/actions/auth';
import { LayoutDashboard, User, Bell, ChevronDown, X, Menu } from 'lucide-react';

interface HeaderProps {
    member: { id: string } | null
}

export default function Header({ member }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMemberOpen, setIsMemberOpen] = useState(false);
    const iconSize = 50;

    const closeAll = () => {
        setIsOpen(false);
        setIsResourcesOpen(false);
        setIsMemberOpen(false);
    };

    return (
        <>
            <header className="min-h-[50px] flex items-center justify-between px-4 relative z-50">
                <div className="flex items-center">
                    <Link href="/" className="block px-2" aria-label="返回首頁" onClick={closeAll}>
                        <Image src={loglImg} width={iconSize} height={iconSize} alt="KAWAGAMI" />
                    </Link>
                </div>

                {/* Desktop nav */}
                <nav className="hidden sm:flex items-center gap-4">
                    <Link href="/hackmd-notes" aria-label="前往 HackMD Notes 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">Notes</Link>
                    <div className="relative">
                        <button
                            className="block px-4 hover:scale-110 hover:text-blue-400"
                            aria-label="開啟 Tools 選單"
                            aria-expanded={isResourcesOpen}
                            onClick={() => setIsResourcesOpen(o => !o)}
                        >Tools</button>
                        {isResourcesOpen && (
                            <div className="absolute left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10">
                                <Link href="/tools/new-password" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>New Password</Link>
                                <Link href="/tools/convert-text" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>Convert Text</Link>
                                <Link href="/tools/countdown" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>Countdown</Link>
                                <Link href="/tools/roster" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>Roster</Link>
                                <Link href="/tools/alarm" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>Alarm</Link>
                            </div>
                        )}
                    </div>
                    <Link href="/about" aria-label="前往 About 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">About</Link>
                    <ThemeButton />
                    {member ? (
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 px-4 hover:scale-110 hover:text-blue-400"
                                aria-label="開啟會員選單"
                                aria-expanded={isMemberOpen}
                                onClick={() => setIsMemberOpen(o => !o)}
                            >
                                <User size={16} />
                                <ChevronDown size={14} />
                            </button>
                            {isMemberOpen && (
                                <div className="absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10 min-w-[120px]">
                                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <LayoutDashboard size={14} />
                                        儀表板
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <User size={14} />
                                        個人資料
                                    </Link>
                                    <Link href="/dashboard/notifications" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <Bell size={14} />
                                        通知
                                    </Link>
                                    <form action={logout}>
                                        <button type="submit" className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-red-500 dark:text-red-400">
                                            登出
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="block px-4 hover:scale-110 hover:text-blue-400">登入</Link>
                    )}
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="sm:hidden p-2"
                    onClick={() => setIsOpen(o => !o)}
                    aria-label={isOpen ? '關閉導航菜單' : '開啟導航菜單'}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile nav overlay */}
            {isOpen && (
                <>
                    <div className="sm:hidden fixed inset-0 z-30 bg-black/40" onClick={closeAll} />
                    <nav className="sm:hidden fixed top-[50px] left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 flex flex-col p-4 gap-1">
                        <Link href="/hackmd-notes" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAll}>Notes</Link>

                        <button
                            className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
                            aria-expanded={isResourcesOpen}
                            onClick={() => setIsResourcesOpen(o => !o)}
                        >
                            Tools
                            <ChevronDown size={14} className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isResourcesOpen && (
                            <div className="ml-4 flex flex-col gap-1">
                                <Link href="/tools/new-password" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>New Password</Link>
                                <Link href="/tools/convert-text" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>Convert Text</Link>
                                <Link href="/tools/countdown" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>Countdown</Link>
                                <Link href="/tools/roster" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>Roster</Link>
                                <Link href="/tools/alarm" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>Alarm</Link>
                            </div>
                        )}

                        <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAll}>About</Link>
                        <div className="px-4 py-2">
                            <ThemeButton />
                        </div>

                        {member ? (
                            <>
                                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>
                                    <LayoutDashboard size={14} />
                                    儀表板
                                </Link>
                                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>
                                    <User size={14} />
                                    個人資料
                                </Link>
                                <Link href="/dashboard/notifications" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm" onClick={closeAll}>
                                    <Bell size={14} />
                                    通知
                                </Link>
                                <form action={logout}>
                                    <button type="submit" className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-red-500 dark:text-red-400">
                                        登出
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAll}>登入</Link>
                        )}
                    </nav>
                </>
            )}
        </>
    );
}
