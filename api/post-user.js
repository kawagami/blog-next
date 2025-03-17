"use server";

import apiRequest from "@/libs/apiRequest";

async function postUser(user) {
    const data = await apiRequest({
        url: `${process.env.API_URL}/users`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
    });

    return data;
}

export default postUser;
