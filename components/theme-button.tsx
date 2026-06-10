"use client";

import sun from "@/assets/Sun.svg";
import moon from "@/assets/Moon.svg";
import Image from "next/image";

export default function ThemeButton() {
    function changeTheme() {
        const next = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', next);
        document.cookie = `theme=${next ? 'dark' : 'light'}; path=/; max-age=31536000`;
    }

    return (
        <div className="flex items-center">
            <button
                    className="w-8 h-8 bg-stone-400 dark:bg-white rounded-full grid place-content-center focus:outline-none focus:ring-2 focus:ring-primary-400 hover:scale-110 transition-transform"
                    onClick={changeTheme}
                    aria-label="切換深色/淺色模式"
                >
                <Image src={sun} alt="" className="hidden dark:block" />
                <Image src={moon} alt="" className="block dark:hidden" />
            </button>
        </div>
    );
}
