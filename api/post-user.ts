"use server";

import adminRequest from "@/libs/adminRequest";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

async function postUser(user: CreateUserInput): Promise<unknown> {
    return adminRequest({
        url: `${process.env.API_URL}/admin/users`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
    });
}

export default postUser;
