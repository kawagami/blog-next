"use server";

import jwt from 'jsonwebtoken';

async function getEncodeJwt(): Promise<string> {
    const currentTime = Math.floor(Date.now() / 1000);

    const payload = {
        exp: currentTime + 10,
        iat: currentTime,
        email: process.env.JWT_EMAIL,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!);
}

export default getEncodeJwt;
