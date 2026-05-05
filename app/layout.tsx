import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import StockToast from "@/components/stocks/stock-toast";
import { WsProvider } from "@/libs/ws-context";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const metadata: Metadata = {
    title: "Kawa's Blog",
    description: "kawa blog ongoing",
};

async function getMember(token: string | undefined): Promise<{ id: string } | null> {
    if (!token) return null
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)
        if (payload.role !== 'member') return null
        return { id: payload.sub as string }
    } catch {
        return null
    }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme')?.value;
    const isDark = themeCookie === 'dark';
    const jwt = cookieStore.get('session')?.value ?? null;
    const member = await getMember(cookieStore.get('access_token')?.value);

    return (
        <html lang="zh-TW" className={isDark ? 'dark' : ''} suppressHydrationWarning>
            <head>
                {!themeCookie && (
                    <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
                )}
            </head>
            <body className="bg-gradient-to-br from-blue-100 via-green-100 to-red-100 dark:from-blue-900 dark:via-green-900 dark:to-red-900 dark:text-white">
                <WsProvider jwt={jwt}>
                    <Header member={member} />
                    <main className="min-h-[calc(100svh-50px-50px)] overflow-hidden flex flex-col items-center justify-start pt-4">
                        {children}
                    </main>
                    <Footer />
                    <StockToast />
                </WsProvider>
            </body>
        </html>
    );
}
