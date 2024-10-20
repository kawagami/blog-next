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
        <header className="min-h-[50px] overflow-hidden flex items-center justify-between px-4">
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
                {/* <Link href="/blogs" aria-label="前往 Blogs 頁面" className="block px-4 hover:scale-110 hover:text-blue-400 transition-transform duration-300">Blogs</Link> */}
                <Link href="/hackmd-notes" aria-label="前往 HackMD Notes 頁面" className="block px-4 hover:scale-110 hover:text-blue-400 transition-transform duration-300">Notes</Link>
                {/* <Link href="/images" aria-label="前往 Images 頁面" className="block px-4 hover:scale-110 hover:text-blue-400 transition-transform duration-300">Images</Link> */}
                <Link href="/sites" aria-label="前往 Sites 頁面" className="block px-4 hover:scale-110 hover:text-blue-400 transition-transform duration-300">Sites</Link>
                <Link href="/ws" aria-label="前往 WS 頁面" className="block px-4 hover:scale-110 hover:text-blue-400 transition-transform duration-300">WS</Link>
                <ThemeButton />
            </nav>
        </header>
    );
}
