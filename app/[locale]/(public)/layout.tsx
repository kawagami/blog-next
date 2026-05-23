import Footer from "@/components/footer";
import Header from "@/components/header";
import StockToast from "@/components/stocks/stock-toast";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

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

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const member = await getMember(cookieStore.get('access_token')?.value);

    return (
        <>
            <Header member={member} />
            <main className="min-h-[calc(100svh-50px-50px)] overflow-hidden flex flex-col items-center justify-start pt-4">
                {children}
            </main>
            <Footer />
            <StockToast />
        </>
    );
}
