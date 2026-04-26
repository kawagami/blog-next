"use server";

import apiRequest from "@/libs/apiRequest";

interface RosterParams {
    names: string[];
    days: number | string;
    rule: string;
}

interface RosterResponse {
    status: string;
    data: unknown[];
}

async function postRoster(params: RosterParams): Promise<RosterResponse> {
    return apiRequest({
        url: `${process.env.API_URL}/roster`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            names: params.names,
            days: parseInt(String(params.days)),
            rule: params.rule,
        }),
    });
}

export default postRoster;
