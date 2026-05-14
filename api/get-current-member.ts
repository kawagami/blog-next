"use server";

import memberRequest from "@/libs/memberRequest";
import type { MemberDetail } from "@/types";

export default async function getCurrentMember(): Promise<MemberDetail> {
    return memberRequest<MemberDetail>({ url: `${process.env.API_URL}/members/me` });
}
