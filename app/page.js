import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";

export default function Home() {
  return (
    <div className={`grid grid-cols-3 gap-3 bg-white dark:bg-black`}>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-red-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-orange-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-yellow-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-green-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-teal-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-blue-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-purple-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-pink-500"></div>
      <div className="min-h-[50px] rounded-lg shadow-lg dark:bg-gray-500 bg-slate-500"></div>
      <ThemeButton />
    </div>
  );
}
