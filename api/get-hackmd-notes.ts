"use server";

import type { HackmdNote } from "@/types";

async function getHackMDNotes(): Promise<HackmdNote[]> {
    const res = await fetch(`${process.env.API_URL}/notes/lists`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch hackmd notes: ${res.status}`);
    return res.json();
}

export default getHackMDNotes;
