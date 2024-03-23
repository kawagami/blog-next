'use client'

import { useState } from "react";

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
        // <button className="rounded-lg bg-blue-300 dark:bg-yellow-300 hover:scale-125 hover:bg-red-800 hover:ring" onClick={changeTheme}>切換背景色</button>

        // <label className={classes.switch}>
        //     <input type="checkbox" onChange={showStatus} />
        //     <span className={`${classes.slider} ${classes.round}`}></span>
        // </label>

        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isDarkMode} className="sr-only peer" onChange={changeTheme} />
            <div className={styles}></div>
            {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
        </label>

    );
}
