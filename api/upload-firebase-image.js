"use server";

import apiRequest from "@/libs/apiRequest";

async function uploadFirebaseImage(formData) {
    const data = await apiRequest({
        url: `${process.env.API_URL}/firebase`,
        method: 'POST',
        body: formData,
    });

    return data;
}

export default uploadFirebaseImage;
