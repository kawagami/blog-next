"use server";

import adminRequest from "@/libs/adminRequest";
import type { Permission } from "@/types";

export default async function getPermissions(): Promise<Permission[]> {
    return adminRequest<Permission[]>({ url: `${process.env.API_URL}/admin/permissions` });
}
