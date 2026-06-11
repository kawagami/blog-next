import "./globals.css";
import { WsProvider } from "@/libs/ws-context";
import ThemeBackground from "@/components/ThemeBackground";
import { SITE_THEMES, type SiteTheme } from "@/libs/site-theme";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Kawa's Blog",
    description: "kawa blog ongoing",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme')?.value;       // dark / light
    const isDark = themeCookie === 'dark';
    const siteThemeCookie = cookieStore.get('site-theme')?.value;  // forest / ocean
    const siteTheme: SiteTheme = SITE_THEMES.includes(siteThemeCookie as SiteTheme)
        ? (siteThemeCookie as SiteTheme)
        : 'forest';
    const jwt = cookieStore.get('session')?.value ?? null;

    return (
        <html lang="zh-TW" className={isDark ? 'dark' : ''} data-theme={siteTheme} suppressHydrationWarning>
            <head>
                {!themeCookie && (
                    <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
                )}
            </head>
            <body className="bg-gradient-to-b from-primary-50 to-neutral-100 text-neutral-800 dark:from-primary-950 dark:to-neutral-900 dark:text-neutral-100">
                <WsProvider jwt={jwt}>
                    <ThemeBackground theme={siteTheme} />
                    {children}
                </WsProvider>
            </body>
        </html>
    );
}
