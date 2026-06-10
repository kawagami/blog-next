import "./globals.css";
import { WsProvider } from "@/libs/ws-context";
import BubbleBackground from "@/components/BubbleBackground";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Kawa's Blog",
    description: "kawa blog ongoing",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme')?.value;
    const isDark = themeCookie === 'dark';
    const jwt = cookieStore.get('session')?.value ?? null;

    return (
        <html lang="zh-TW" className={isDark ? 'dark' : ''} suppressHydrationWarning>
            <head>
                {!themeCookie && (
                    <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
                )}
            </head>
            <body className="bg-gradient-to-b from-primary-50 to-stone-100 text-stone-800 dark:from-primary-950 dark:to-stone-900 dark:text-stone-100">
                <WsProvider jwt={jwt}>
                    <BubbleBackground />
                    {children}
                </WsProvider>
            </body>
        </html>
    );
}
