"use server";

import { revalidatePath } from "next/cache";
import adminRequest from "@/libs/adminRequest";
import type { Setting, SettingsResponse } from "@/types";

export async function getSettings(): Promise<SettingsResponse> {
    return adminRequest<SettingsResponse>({ url: `${process.env.API_URL}/admin/settings` });
}

export async function updateSetting(key: string, value: string): Promise<Setting> {
    const response = await adminRequest<Setting>({
        url: `${process.env.API_URL}/admin/settings/${key}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
    });
    revalidatePath("/admin/settings");
    return response;
}
