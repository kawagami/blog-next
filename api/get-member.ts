"use server";

import apiRequest from "@/libs/apiRequest";
import type { MemberDetail } from "@/types";

async function getMember(id: number): Promise<MemberDetail> {
    return apiRequest<MemberDetail>({
        url: `${process.env.API_URL}/members/${id}`,
    });
}

export default getMember;
