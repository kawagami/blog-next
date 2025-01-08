'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const iconSize = 50;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="min-h-[50px] flex items-center justify-between px-4">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link href="/" className="block px-2" aria-label="返回首頁">
                    <Image
                        src={loglImg}
                        width={iconSize}
                        height={iconSize}
                        alt="KAWAGAMI"
                    />
                </Link>
            </div>

            {/* Hamburger Menu Button */}
            <button
                className="sm:hidden block px-2"
                onClick={toggleMenu}
                aria-label="開啟導航菜單"
            >
                {/* Icon for the hamburger */}
                <div className="space-y-2">
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                </div>
            </button>

            {/* Navigation Links - Hidden on small screens */}
            <nav className={`sm:flex sm:items-center sm:gap-4 ${isOpen ? 'block' : 'hidden'}`}>
                <Link href="/ws" aria-label="前往 WS 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">WS</Link>
                <Link href="/hackmd-notes" aria-label="前往 HackMD Notes 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">Notes</Link>

                {/* Dropdown Menu */}
                <div className="relative group">
                    <button
                        className="block px-4 hover:scale-110 hover:text-blue-400"
                        aria-label="開啟 Resources 選單"
                    >
                        Resources
                    </button>
                    {/* 使下拉選單保持顯示，當滑鼠移到下拉選單範圍內 */}
                    <div className="absolute left-0 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block group-focus-within:block">
                        <Link href="/images" className="block px-4 py-2 hover:bg-gray-100">Images</Link>
                        <Link href="/resizer" className="block px-4 py-2 hover:bg-gray-100">Resizer</Link>
                        <Link href="/new-password" className="block px-4 py-2 hover:bg-gray-100">NewPassword</Link>
                        <Link href="/convert-text" className="block px-4 py-2 hover:bg-gray-100">ConvertText</Link>
                        <Link href="/timer" className="block px-4 py-2 hover:bg-gray-100">Timer</Link>
                    </div>
                </div>

                {/* <Link href="/images" aria-label="前往 Images 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">Images</Link> */}
                <Link href="/sites" aria-label="前往 Sites 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">Sites</Link>
                <Link href="/about" aria-label="前往 About 頁面" className="block px-4 hover:scale-110 hover:text-blue-400">About</Link>
                <ThemeButton />
            </nav>
        </header>
    );
}
