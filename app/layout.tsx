import "./globals.css";
import { WsProvider } from "@/libs/ws-context";
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
            <body className="bg-gradient-to-br from-blue-100 via-green-100 to-red-100 dark:from-blue-900 dark:via-green-900 dark:to-red-900 dark:text-white">
                <WsProvider jwt={jwt}>
                    {children}
                </WsProvider>
            </body>
        </html>
    );
}
