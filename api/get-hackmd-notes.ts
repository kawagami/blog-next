import type { HackmdNote } from "@/types";

async function getHackMDNotes(): Promise<HackmdNote[]> {
    const res = await fetch(`${process.env.API_URL}/notes/lists`, { cache: 'no-store' });
    return res.json();
}

export default getHackMDNotes;
