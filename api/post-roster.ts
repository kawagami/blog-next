"use server";

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
    const res = await fetch(`${process.env.API_URL}/roster`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            names: params.names,
            days: parseInt(String(params.days)),
            rule: params.rule,
        }),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Roster request failed: ${res.status}`);
    return res.json();
}

export default postRoster;
