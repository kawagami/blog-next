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
        <div className="w-full grid place-content-center hover:scale-150">
            <div className="w-8 h-8 bg-gray-400 dark:bg-white rounded-full grid place-content-center" onClick={changeTheme}>
                <Image src={sun} alt="sun" className="hidden dark:block" />
                <Image src={moon} alt="moon" className="block dark:hidden" />
            </div>
        </div>
    );
}
