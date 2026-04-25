"use server";

import apiRequest from "@/libs/apiRequest";

async function getFirebaseImages() {
    const data = await apiRequest({
        url: `${process.env.API_URL}/images`,
        method: 'GET',
    });

    return data;
}

export default getFirebaseImages;
