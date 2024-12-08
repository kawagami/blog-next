"use server";

import apiRequest from "@/libs/apiRequest";

async function getFirebaseImages() {
    const data = await apiRequest({
        url: `${process.env.API_URL}/firebase`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return data;
}

export default getFirebaseImages;
