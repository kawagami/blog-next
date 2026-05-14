"use server";

import adminRequest from "@/libs/adminRequest";
import type { MemberDetail } from "@/types";

async function getMember(id: number): Promise<MemberDetail> {
    return adminRequest<MemberDetail>({
        url: `${process.env.API_URL}/members/${id}`,
    });
}

export default getMember;
