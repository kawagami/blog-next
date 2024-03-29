import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kawa's Blog",
  description: "kawa blog ongoing",
};

export default function RootLayout({ children }) {
  const iconSize = 50;
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="min-h-[50px] bg-red-300 dark:bg-purple-300 dark:text-white overflow-hidden hidden sm:grid sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-2">
          <div className="bg-white dark:bg-gray-600">
            <Link href="/">
              <Image
                src={loglImg}
                width={iconSize}
                height={iconSize}
                alt="KAWAGAMI"
              />
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-600 grid grid-cols-5 place-content-center">
            <Link href="/link1" className="grid place-content-center">link 1</Link>
            <Link href="/link2" className="grid place-content-center">link 2</Link>
            <Link href="/link3" className="grid place-content-center">link 3</Link>
            <Link href="/link4" className="grid place-content-center">link 4</Link>
            <ThemeButton />
          </div>
        </header>

        <main className="min-h-[calc(100svh-50px-50px)] bg-orange-300 dark:bg-pink-300 dark:text-white overflow-hidden">
          {children}
        </main>

        <footer className="min-h-[50px] bg-yellow-300 dark:bg-teal-300 dark:text-white overflow-hidden">
          footer 文字測試
        </footer>
      </body>
    </html>
  );
}
