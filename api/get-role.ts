"use server";

import apiRequest from "@/libs/apiRequest";
import type { Role } from "@/types";

export default async function getRole(id: number): Promise<Role> {
    return apiRequest<Role>({ url: `${process.env.API_URL}/roles/${id}` });
}
