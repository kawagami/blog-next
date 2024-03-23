import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";

export default function Home() {
  return (
    <>
      <header className="min-h-[50px] bg-red-300 dark:bg-purple-300 overflow-hidden hidden sm:grid sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-2">
        <div className="bg-white dark:bg-black">CICD 測試</div>
        <div className="bg-white dark:bg-black grid grid-cols-5 place-content-center">
          <Link href="/" className="grid place-content-center">link 1</Link>
          <Link href="/" className="grid place-content-center">link 2</Link>
          <Link href="/" className="grid place-content-center">link 3</Link>
          <Link href="/" className={`${process.env.NEXT_TEST_TAILWINDCSS}`}>link 4</Link>
          <ThemeButton />
        </div>
      </header>

      <main className="min-h-[calc(100svh-50px-50px)] bg-orange-300 dark:bg-pink-300 overflow-hidden">
        CICD 測試
      </main>

      <footer className="min-h-[50px] bg-yellow-300 dark:bg-teal-300 overflow-hidden"></footer>
    </>
  );
}
