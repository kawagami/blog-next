import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
    matcher: ['/admin/:path*'],
};

export default async function middleware(req) {
    const cookieStore = await cookies();
    const value = cookieStore.get("session")?.value;

    const originalUrl = req.nextUrl.pathname + req.nextUrl.search;
    const loginUrl = new URL("/login", req.nextUrl);
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
