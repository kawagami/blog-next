"use server";

async function postConvertText(text: string): Promise<unknown> {
    const url = `${process.env.FASTAPI_HOST}/convert-text`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export default postConvertText;
