'use client'

import { useState } from "react";
import sun from "@/assets/Sun.svg";
import moon from "@/assets/Moon.svg";
import Image from "next/image";

export default function ThemeButton() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    function showStatus(event) {
        setIsDarkMode(preValue => !preValue)
        // setIsDarkMode(preValue => !preValue)
        // setIsDarkMode(!isDarkMode)
        // setIsDarkMode(!isDarkMode)
        // console.log(isDarkMode);
        // console.log(event.target.checked);
    }

    function changeTheme() {
        const htmlClass = document.documentElement.classList;
        // if (htmlClass.contains('dark')) {
        if (isDarkMode) {
            htmlClass.remove('dark')
        } else {
            htmlClass.add('dark')
        }
        setIsDarkMode(preValue => !preValue)
    }

    const styles = [
        "relative",
        "w-16",
        "h-8",
        "bg-gray-600",
        // "peer-focus:outline-none",
        // "peer-focus:ring-4",
        // "peer-focus:ring-blue-300",
        // "dark:peer-focus:ring-blue-800",
        "rounded-full",
        "peer",
        "dark:bg-gray-700",
        "peer-checked:after:translate-x-full",
        "rtl:peer-checked:after:-translate-x-full",
        "peer-checked:after:border-white",
        "after:content-['']",
        "after:absolute",
        "after:top-[2px]",
        "after:start-[2px]",
        "after:dark:bg-gray-600",
        "after:border-gray-300",
        "after:border",
        "after:rounded-full",
        "after:h-7",
        "after:w-7",
        "after:transition-all",
        "dark:border-gray-600",
        "after:bg-[var(--darkmode-switch-shine-color)]",
        "peer-checked:bg-gray-200",
        // "grid",
        // "place-content-center",
    ].join(' ');

    return (
        <div className="w-8 h-8 bg-gray-400 dark:bg-white rounded-full flex justify-center items-center" onClick={changeTheme}>
            {isDarkMode
                ? <Image src={sun} />
                : <Image src={moon} />
            }
        </div>
    );
}
