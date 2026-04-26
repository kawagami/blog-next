import type { HackmdTag } from "@/types";

async function getHackMDNoteTags(): Promise<HackmdTag[]> {
    const res = await fetch(`${process.env.API_URL}/notes/tags`, { cache: 'no-store' });
    return res.json();
}

export default getHackMDNoteTags;
