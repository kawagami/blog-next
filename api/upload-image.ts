"use server";

import apiRequest from "@/libs/apiRequest";
import type { Image } from "@/types";

async function uploadImage(formData: FormData): Promise<Image> {
    return apiRequest({
        url: `${process.env.API_URL}/images/upload`,
        method: 'POST',
        body: formData,
    });
}

export default uploadImage;
