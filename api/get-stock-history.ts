"use server";

import memberRequest from "@/libs/memberRequest";
import type { HistoryRecord } from "@/types";

export async function getPortfolioHistory(portfolioId: string): Promise<HistoryRecord[]> {
    return memberRequest<HistoryRecord[]>({
        url: `${process.env.API_URL}/member/portfolio/${portfolioId}/history`,
    });
}
