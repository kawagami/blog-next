import Image from "next/image";
import GithubMark from "@/assets/github-mark.svg";
import GithubMarkWhite from "@/assets/github-mark-white.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="min-h-[50px] flex justify-center gap-4 text-center">
            <Link className="hover:scale-90" target="_blank" href="https://github.com/kawagami">
                <Image src={GithubMark} width={30} height={30} alt="my github" className="dark:hidden" />
                <Image src={GithubMarkWhite} width={30} height={30} alt="my github" className="hidden dark:block" />
            </Link>
        </footer>
    );
}
