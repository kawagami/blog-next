// api/post-roster.js

"use server";

import apiRequest from "@/libs/apiRequest";

/**
 * 請求排班計算
 * @param {Object} params - 包含 names (array), days (number), rule (string)
 */
async function postRoster(params) {
    const data = await apiRequest({
        // 確保這與你的 Rust Axum 路由一致：/roster
        url: `${process.env.API_URL}/roster`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            names: params.names,
            days: parseInt(params.days),
            rule: params.rule
        }),
    });

    // 注意：根據先前討論，Rust 會回傳 { status: "success", data: [...] }
    return data;
}

export default postRoster;