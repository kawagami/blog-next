"use server";

async function postConvertText(text) {
    const url = `${process.env.FASTAPI_HOST}/convert-text`;

    try {
        // 發送請求
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text }) // 將輸入文本包裝到請求體中
        });

        // 如果響應非 200，拋出錯誤
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 返回解析後的 JSON 數據
        return await response.json();
    } catch (error) {
        console.error("Error posting to /convert-text:", error);
        throw error;
    }
}

export default postConvertText;
