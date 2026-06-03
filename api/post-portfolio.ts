"use server";

import memberRequest from "@/libs/memberRequest";
import type { PortfolioEntry, PortfolioEntryInput } from "@/types";

export default async function postPortfolio(input: PortfolioEntryInput): Promise<PortfolioEntry> {
    return memberRequest<PortfolioEntry>({
        url: `${process.env.API_URL}/member/portfolio`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });
}
