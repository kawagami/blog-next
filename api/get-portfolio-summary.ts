"use server";

import memberRequest from "@/libs/memberRequest";
import type { PortfolioSummaryEntry } from "@/types";

export default async function getPortfolioSummary(): Promise<PortfolioSummaryEntry[]> {
    return memberRequest<PortfolioSummaryEntry[]>({
        url: `${process.env.API_URL}/member/portfolio/summary`,
    });
}
