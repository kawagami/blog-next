import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import Link from 'next/link';

export default function Home() {
  // const className = `hover:text-8xl`;

  return (
    <div className={`grid grid-cols-3 gap-3 bg-white dark:bg-black`}>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-red-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-orange-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-yellow-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-green-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-teal-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-blue-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-purple-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-pink-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg bg-slate-500"></div>
      {/* <button className="rounded-full bg-blue-300 py-8" onClick={handleClick}>Change Theme</button> */}
    </div>
  );
}

// function darkTheme() {
//   'use client'
//   document.documentElement.classList.add('dark')
// }

// export function whiteTheme() {
//   document.documentElement.classList.remove('dark')
// }
