"use server";

import apiRequest from "@/libs/apiRequest";
import type { MemberDetail } from "@/types";

export default async function getCurrentMember(): Promise<MemberDetail> {
    return apiRequest<MemberDetail>({ url: `${process.env.API_URL}/members/me` });
}
