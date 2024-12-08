import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
    matcher: ['/admin/:path*'],
}

export default async function middleware(req) {

    const cookieStore = await cookies()
    const value = cookieStore.get("session")?.value;

    if (!value) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}
