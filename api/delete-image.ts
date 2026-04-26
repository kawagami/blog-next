"use server";

import apiRequest from "@/libs/apiRequest";

interface DeleteImageInput {
    file_name: string;
}

async function deleteFirebaseImage(input: DeleteImageInput): Promise<void> {
    if (!input?.file_name) {
        throw new Error("Invalid input: file_name is required");
    }

    await apiRequest({
        url: `${process.env.API_URL}/firebase`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_name: input.file_name }),
    });
}

export default deleteFirebaseImage;
