"use server";

import adminRequest from "@/libs/adminRequest";
import type { Image } from "@/types";

async function uploadImage(formData: FormData): Promise<Image> {
    return adminRequest({
        url: `${process.env.API_URL}/admin/images/upload`,
        method: 'POST',
        body: formData,
    });
}

export default uploadImage;
