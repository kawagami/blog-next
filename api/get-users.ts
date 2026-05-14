"use server";

import adminRequest from "@/libs/adminRequest";
import type { User } from "@/types";

async function getUsers(): Promise<User[]> {
    return adminRequest<User[]>({
        url: `${process.env.API_URL}/admin/users`,
    });
}

export default getUsers;
