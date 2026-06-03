"use server";

import memberRequest from "@/libs/memberRequest";
import type { PortfolioEntry } from "@/types";

export default async function getPortfolio(): Promise<PortfolioEntry[]> {
    return memberRequest<PortfolioEntry[]>({
        url: `${process.env.API_URL}/member/portfolio`,
    });
}
