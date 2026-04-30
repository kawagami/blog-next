"use server";

import type { HackmdNote } from "@/types";

async function getHackMDNotes(): Promise<HackmdNote[]> {
    const res = await fetch(`${process.env.API_URL}/notes/lists`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch hackmd notes: ${res.status}`);
    return res.json();
}

export default getHackMDNotes;
