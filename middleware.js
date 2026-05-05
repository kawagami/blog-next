import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
    matcher: ['/admin/((?!login).*)', '/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};

export default async function middleware(req) {
    const cookieStore = await cookies();
    const path = req.nextUrl.pathname;

    if (path.startsWith('/admin')) {
        const value = cookieStore.get("session")?.value;

        const originalUrl = req.nextUrl.pathname + req.nextUrl.search;
        const loginUrl = new URL("/admin/login", req.nextUrl);
        loginUrl.searchParams.set("redirect", originalUrl);

        if (!value) {
            return NextResponse.redirect(loginUrl);
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(value, secret);
        } catch {
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    // member routes
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
