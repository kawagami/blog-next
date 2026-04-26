"use server";

import apiRequest from "@/libs/apiRequest";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

async function postUser(user: CreateUserInput): Promise<unknown> {
    return apiRequest({
        url: `${process.env.API_URL}/users`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
    });
}

export default postUser;
