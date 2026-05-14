"use server";

import adminRequest from "@/libs/adminRequest";
import type { Member } from "@/types";

async function getMembers(): Promise<Member[]> {
    return adminRequest<Member[]>({
        url: `${process.env.API_URL}/members`,
    });
}

export default getMembers;
