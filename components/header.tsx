"use client";

import { useState } from 'react';
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
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
                        aria-label="開啟 Resources 選單"
                        aria-expanded={isResourcesOpen}
                        onClick={() => setIsResourcesOpen(o => !o)}
                    >Resources</button>
                    {isResourcesOpen && (
                        <div className="absolute left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10">
                            <Link href="/new-password" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>NewPassword</Link>
                            <Link href="/convert-text" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>ConvertText</Link>
                            <Link href="/countdown" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsResourcesOpen(false)}>Countdown</Link>
                        </div>
                    )}
                </div>
                <Link href="/roster" aria-label="前往 Roster 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">Roster</Link>
                <Link href="/about" aria-label="前往 About 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">About</Link>
                <ThemeButton />
            </nav>
        </header>
    );
}
