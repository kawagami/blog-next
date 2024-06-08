import Link from 'next/link';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";

export default function Header() {
    const iconSize = 50;
    return (
        <header className="min-h-[50px] overflow-hidden hidden sm:grid sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-2">
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src={loglImg}
                        width={iconSize}
                        height={iconSize}
                        alt="KAWAGAMI"
                    />
                </Link>
            </div>
            <div className="grid grid-cols-5 place-content-center">
                <Link href="/blogs" className="grid place-content-center hover:scale-150 hover:text-blue-400">Blogs</Link>
                <Link href="/hackmd-notes" className="grid place-content-center hover:scale-150 hover:text-blue-400">HackMD Notes</Link>
                <Link href="/link3" className="grid place-content-center hover:scale-150 hover:text-blue-400">link 3</Link>
                <Link href="/link4" className="grid place-content-center hover:scale-150 hover:text-blue-400">link 4</Link>
                <ThemeButton />
            </div>
        </header>
    );
}