'use client'

import { useState } from "react";
import sun from "@/assets/Sun.svg";
import moon from "@/assets/Moon.svg";
import Image from "next/image";

export default function ThemeButton() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    function changeTheme() {
        const htmlClass = document.documentElement.classList;
        if (isDarkMode) {
            htmlClass.remove('dark')
        } else {
            htmlClass.add('dark')
        }
        setIsDarkMode(preValue => !preValue)
    }

    return (
        <div className="w-full grid place-content-center hover:scale-150 transition-all">
            <div
                className="w-8 h-8 bg-gray-400 dark:bg-white rounded-full grid place-content-center"
                onClick={changeTheme}
            >
                {isDarkMode
                    ?
                    <Image src={sun} alt="sun" />
                    :
                    <Image src={moon} alt="moon" />
                }
            </div>
        </div>
    );
}
