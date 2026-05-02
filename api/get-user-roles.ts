"use server";

import apiRequest from "@/libs/apiRequest";
import type { Role } from "@/types";

export default async function getUserRoles(userId: string): Promise<Role[]> {
    return apiRequest<Role[]>({ url: `${process.env.API_URL}/users/${userId}/roles` });
}
