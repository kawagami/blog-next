"use server";

import memberRequest from "@/libs/memberRequest";

export default async function deletePortfolio(id: string): Promise<null> {
    return memberRequest<null>({
        url: `${process.env.API_URL}/member/portfolio/${id}`,
        method: 'DELETE',
    });
}
