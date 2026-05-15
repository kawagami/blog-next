"use server";

import adminRequest from "@/libs/adminRequest";

async function deleteImage(id: string): Promise<void> {
    await adminRequest({
        url: `${process.env.API_URL}/admin/images/${id}`,
        method: 'DELETE',
    });
}

export default deleteImage;
