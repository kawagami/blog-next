"use server";

import { callApi } from "@/actions/auth";
import type { MemberDetail } from "@/types";

export default async function getCurrentMember(): Promise<MemberDetail> {
    const res = await callApi("/members/me");
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
}
