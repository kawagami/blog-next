"use client";

import sun from "@/assets/Sun.svg";
import moon from "@/assets/Moon.svg";
import Image from "next/image";
import { useAppContext } from "@/provider/app-provider";

export default function ThemeButton() {
    const { isDark, setIsDark } = useAppContext();

    function changeTheme() {
        const next = !isDark;
        document.documentElement.classList.toggle('dark', next);
        document.cookie = `theme=${next ? 'dark' : 'light'}; path=/; max-age=31536000`;
        setIsDark(next);
    }

    return (
        <div className="w-full grid place-content-center hover:scale-150">
            <div className="w-8 h-8 bg-gray-400 dark:bg-white rounded-full grid place-content-center" onClick={changeTheme}>
                {isDark ? <Image src={sun} alt="sun" /> : <Image src={moon} alt="moon" />}
            </div>
        </div>
    );
}
