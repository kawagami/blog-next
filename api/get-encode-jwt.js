"use server"

import jwt from 'jsonwebtoken';

async function getEncodeJwt() {
    const currentTime = Math.floor(Date.now() / 1000); // 生成當前時間的 Unix 時間戳（秒）

    const payload = {
        exp: currentTime + 10,   // 到期時間設為 10 秒後
        iat: currentTime,        // 發行時間為當前時間
        email: process.env.JWT_EMAIL
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

export default getEncodeJwt;