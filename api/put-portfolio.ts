"use server";

import memberRequest from "@/libs/memberRequest";
import type { PortfolioEntry, PortfolioEntryInput } from "@/types";

export default async function putPortfolio(id: string, input: PortfolioEntryInput): Promise<PortfolioEntry> {
    return memberRequest<PortfolioEntry>({
        url: `${process.env.API_URL}/member/portfolio/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });
}
