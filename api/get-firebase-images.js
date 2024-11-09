"use server";

import getEncodeJwt from "@/api/get-encode-jwt";

async function getFirebaseImages() {
    const token = await getEncodeJwt();

    const response = await fetch(`${process.env.API_URL}/firebase`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });

    // 檢查是否成功取得資料
    if (!response.ok) {
        console.log(typeof response);

        // let temp = await response.json();
        throw response;
    }

    // 解析回傳的 JSON 資料
    const data = await response.json();

    return data;
}

export default getFirebaseImages;
