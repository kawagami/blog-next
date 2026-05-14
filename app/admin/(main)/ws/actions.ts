"use server";

import adminRequest from "@/libs/adminRequest";

export interface SaySomethingResult {
    ok: boolean;
    message?: string;
}

export async function saySomethingToSomeone(
    _prevState: SaySomethingResult,
    formData: FormData,
): Promise<SaySomethingResult> {
    const addr = formData.get("addr") as string;
    const message = formData.get("message") as string;

    if (!addr || !message) {
        return { ok: false, message: "addr and message are required" };
    }

    const params = new URLSearchParams({ addr, message });

    try {
        await adminRequest({
            url: `${process.env.API_URL}/ws/say_something_to_someone?${params}`,
        });
        return { ok: true, message: "Sent" };
    } catch (err) {
        const e = err as Error & { status?: number };
        return { ok: false, message: e.message };
    }
}
