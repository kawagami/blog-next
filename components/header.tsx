"use client";

import { useState } from 'react';
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import { logout } from '@/actions/auth';
import { LayoutDashboard, User, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
    member: { id: string } | null
}

export default function Header({ member }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMemberOpen, setIsMemberOpen] = useState(false);
    const iconSize = 50;

    return (
        <header className="min-h-[50px] flex items-center justify-between px-4">
            <div className="flex items-center">
                <Link href="/" className="block px-2" aria-label="返回首頁">
                    <Image src={loglImg} width={iconSize} height={iconSize} alt="KAWAGAMI" />
                </Link>
            </div>
            <button className="sm:hidden block px-2" onClick={() => setIsOpen(!isOpen)} aria-label="開啟導航菜單">
                <div className="space-y-2">
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                </div>
            </button>
            <nav className={`sm:flex sm:items-center sm:gap-4 ${isOpen ? 'block' : 'hidden'}`}>
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
        </header>
    );
}
