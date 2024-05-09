'use client';

import Image from "next/image";
import GithubMark from "@/assets/github-mark.svg"
import GithubMarkWhite from "@/assets/github-mark-white.svg"
import { useDarkContext } from "@/provider/dark-provider";
import Link from "next/link";

export default function Footer() {
    const { isDark, setIsDark } = useDarkContext();
    return (
        <footer className="min-h-[50px] overflow-hidden grid grid-cols-5 gap-4 text-center">
            <div className="col-start-2 flex justify-center items-center">
                {/* block 1 */}
            </div>

            <div className="flex justify-center items-center">
                <Link target="_blank" href="https://github.com/kawagami">
                    {
                        isDark
                            ?
                            <Image src={GithubMarkWhite} width={30} height={30} alt="my github" />
                            :
                            <Image src={GithubMark} width={30} height={30} alt="my github" />
                    }
                </Link>
            </div>
            <div className="">
                {/* block 3 */}
            </div>
        </footer>
    );
}