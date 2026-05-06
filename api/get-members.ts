"use server";

import apiRequest from "@/libs/apiRequest";
import type { Member } from "@/types";

async function getMembers(): Promise<Member[]> {
    return apiRequest<Member[]>({
        url: `${process.env.API_URL}/members`,
    });
}

export default getMembers;
