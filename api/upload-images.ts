"use server";

import adminRequest from "@/libs/adminRequest";
import type { Image } from "@/types";

async function uploadImages(formData: FormData): Promise<Image[]> {
    return adminRequest<Image[]>({
        url: `${process.env.API_URL}/admin/images/upload_multiple`,
        method: 'POST',
        body: formData,
    });
}

export default uploadImages;
