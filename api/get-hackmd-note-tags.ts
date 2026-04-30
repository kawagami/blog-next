"use server";

import type { HackmdTag } from "@/types";

async function getHackMDNoteTags(): Promise<HackmdTag[]> {
    const res = await fetch(`${process.env.API_URL}/notes/tags`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch hackmd tags: ${res.status}`);
    return res.json();
}

export default getHackMDNoteTags;
