"use server";

import { fetchApi } from "@/libs/fetchApi";
import type { HackmdNote } from "@/types";

async function getHackMDNotes(): Promise<HackmdNote[]> {
    return fetchApi(`${process.env.API_URL}/notes/lists`, { next: { revalidate: 60 } });
}

export default getHackMDNotes;
