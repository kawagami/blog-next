"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { callApi } from "@/actions/auth";
import type { MemberDetail } from "@/types";

export default async function getCurrentMember(): Promise<MemberDetail> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) throw new Error("Not authenticated");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const res = await callApi(`/members/${payload.sub}`);
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
}
