"use server";

import getEncodeJwt from "@/api/get-encode-jwt";

async function deleteFirebaseImage(input) {
    if (!input || !input.file_name) {
        throw new Error("Invalid input: file_name is required");
    }

    const token = await getEncodeJwt();

    const response = await fetch(`${process.env.API_URL}/firebase`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file_name: input.file_name }),
        cache: 'no-store'
    });

    // 檢查是否成功取得資料
    if (!response.ok) {
        const errorData = await response.json(); // 解析錯誤的回應
        console.error("Error deleting image:", errorData);
        throw new Error(`Failed to delete image: ${response.status} ${response.statusText}`);
    }

    // 解析回傳的 JSON 資料
    const data = await response.json();
    return data;
}

export default deleteFirebaseImage;
