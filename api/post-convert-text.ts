"use server";

async function postConvertText(text: string, direction: "t2s" | "s2t"): Promise<{ original_text: string; converted_text: string }> {
    const url = `${process.env.API_URL}/tools/convert_text`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, direction }),
    });

    if (!response.ok) {
        throw new Error(`API ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export default postConvertText;
