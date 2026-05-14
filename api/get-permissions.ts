"use server";

import apiRequest from "@/libs/apiRequest";
import type { Permission } from "@/types";

export default async function getPermissions(): Promise<Permission[]> {
    return apiRequest<Permission[]>({ url: `${process.env.API_URL}/admin/permissions` });
}
