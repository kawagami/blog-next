import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";

export default function Home() {
  return (
    <>
      <header className="min-h-[50px] bg-red-300 dark:bg-purple-300 overflow-hidden grid grid-cols-2">
        <div className="bg-white dark:bg-black">1231</div>
        <div className="bg-white dark:bg-black ml-auto">
          <ThemeButton />
        </div>
      </header>

      <main className="min-h-[calc(100svh-50px-50px)] bg-orange-300 dark:bg-pink-300 overflow-hidden"></main>

      <footer className="min-h-[50px] bg-yellow-300 dark:bg-teal-300 overflow-hidden"></footer>
    </>
  );
}
