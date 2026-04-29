"use server";

import apiRequest from "@/libs/apiRequest";
import type { Image } from "@/types";

async function uploadImages(files: File[]): Promise<Image[]> {
    return Promise.all(
        files.map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            return apiRequest<Image>({
                url: `${process.env.API_URL}/images/upload`,
                method: 'POST',
                body: formData,
            });
        })
    );
}

export default uploadImages;
