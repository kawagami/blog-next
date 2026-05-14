"use server";

import adminRequest from "@/libs/adminRequest";
import type { Role } from "@/types";

export default async function getRoles(): Promise<Role[]> {
    return adminRequest<Role[]>({ url: `${process.env.API_URL}/admin/roles` });
}
