"use server";

import { fetchApi } from "@/libs/fetchApi";
import type { HackmdTag } from "@/types";

async function getHackMDNoteTags(): Promise<HackmdTag[]> {
    return fetchApi(`${process.env.API_URL}/notes/tags`, { next: { revalidate: 60 } });
}

export default getHackMDNoteTags;
