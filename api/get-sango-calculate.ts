"use server";

async function getSangoCalculate(now: number, remaining_troops?: number, full?: number): Promise<unknown> {
    let url = `${process.env.API_URL}/tools/caculate_complete_time?now=${now}`;

    if (remaining_troops !== undefined) url += `&remaining_troops=${remaining_troops}`;
    if (full !== undefined) url += `&full=${full}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    return res.json();
}

export default getSangoCalculate;
