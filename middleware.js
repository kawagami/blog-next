import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
    matcher: ['/admin/:path*'],
};

export default async function middleware(req) {
    const cookieStore = await cookies();
    const value = cookieStore.get("session")?.value;

    if (!value) {
        // 記錄原始 URL
        const originalUrl = req.nextUrl.pathname + req.nextUrl.search;
        const loginUrl = new URL("/login", req.nextUrl);

        // 將原始 URL 作為參數附加到登錄頁面 URL
        loginUrl.searchParams.set("redirect", originalUrl);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
