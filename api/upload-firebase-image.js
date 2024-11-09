"use server";

import getEncodeJwt from "@/api/get-encode-jwt";

async function uploadFirebaseImage(formData) {
    const token = await getEncodeJwt();

    const response = await fetch(`${process.env.API_URL}/firebase`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: formData
    });

    // 檢查是否成功取得資料
    if (!response.ok) {
        let temp = await response.json();
        throw new Error(temp.error);
    }

    // 解析回傳的 JSON 資料
    const data = await response.json();

    return data;
}

export default uploadFirebaseImage;
