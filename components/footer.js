"use client";

import Image from "next/image";
import GithubMark from "@/assets/github-mark.svg"
import GithubMarkWhite from "@/assets/github-mark-white.svg"
import { useAppContext } from "@/provider/app-provider";
import Link from "next/link";

export default function Footer() {
    const { isDark } = useAppContext();
    return (
        <footer className="min-h-[50px] flex justify-center gap-4 text-center">

            <Link className="hover:scale-90" target="_blank" href="https://github.com/kawagami">
                {
                    isDark
                        ?
                        <Image src={GithubMarkWhite} width={30} height={30} alt="my github" />
                        :
                        <Image src={GithubMark} width={30} height={30} alt="my github" />
                }
            </Link>

        </footer>
    );
}