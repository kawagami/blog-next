"use server";

import apiRequest from "@/libs/apiRequest";
import type { User } from "@/types";

async function getUsers(): Promise<User[]> {
    return apiRequest<User[]>({
        url: `${process.env.API_URL}/users`,
    });
}

export default getUsers;
