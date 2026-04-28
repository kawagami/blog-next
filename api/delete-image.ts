"use server";

import apiRequest from "@/libs/apiRequest";

async function deleteImage(id: string): Promise<void> {
    await apiRequest({
        url: `${process.env.API_URL}/images/${id}`,
        method: 'DELETE',
    });
}

export default deleteImage;
