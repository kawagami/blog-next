"use server";

import adminRequest from "@/libs/adminRequest";
import type { Image } from "@/types";

async function getImages(): Promise<Image[]> {
    return adminRequest({
        url: `${process.env.API_URL}/images`,
        method: 'GET',
    });
}

export default getImages;
