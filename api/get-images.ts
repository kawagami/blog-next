"use server";

import apiRequest from "@/libs/apiRequest";
import type { Image } from "@/types";

async function getImages(): Promise<Image[]> {
    return apiRequest({
        url: `${process.env.API_URL}/images`,
        method: 'GET',
    });
}

export default getImages;
