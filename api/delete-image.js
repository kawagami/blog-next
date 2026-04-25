"use server";

import apiRequest from "@/libs/apiRequest";

async function deleteFirebaseImage(input) {
    if (!input || !input.file_name) {
        throw new Error("Invalid input: file_name is required");
    }

    const data = await apiRequest({
        url: `${process.env.API_URL}/firebase`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_name: input.file_name }),
    });

    return data;
}

export default deleteFirebaseImage;
