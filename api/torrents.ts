"use server";

import { unstable_rethrow } from "next/navigation";
import adminRequest from "@/libs/adminRequest";
import type { TorrentPaginatedResponse, TorrentDownloadLink } from "@/types";

// 後端錯誤帶 status（409 / 422 / 507 等），mutation 統一回 result object 讓 client 顯示訊息
// （server action throw 在 production 會被 Next.js 遮蔽，拿不到 status）
export interface TorrentActionResult {
    ok: boolean;
    status?: number;
    message?: string;
}

export interface TorrentLinksResult extends TorrentActionResult {
    links?: TorrentDownloadLink[];
}

function toErrorResult(e: unknown): TorrentActionResult & { ok: false } {
    // adminRequest 在 401/403 會 redirect()，丟的是 Next.js 內部 error — 必須重丟，吞掉會讓 redirect 失效
    unstable_rethrow(e);
    const err = e as Error & { status?: number; errorData?: { message?: string } };
    return {
        ok: false,
        status: err.status ?? 0,
        message: err.errorData?.message ?? err.message ?? "未知錯誤",
    };
}

export async function getTorrents(
    status: string | null = null,
    page = 1,
    perPage = 50,
): Promise<TorrentPaginatedResponse> {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    params.append("page", String(page));
    params.append("per_page", String(perPage));

    return adminRequest<TorrentPaginatedResponse>({
        url: `${process.env.API_URL}/admin/torrents?${params}`,
    });
}

export async function postTorrent(magnetUri: string): Promise<TorrentActionResult> {
    try {
        await adminRequest({
            url: `${process.env.API_URL}/admin/torrents`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ magnet_uri: magnetUri }),
        });
        return { ok: true };
    } catch (e) {
        return toErrorResult(e);
    }
}

export async function createTorrentDownloadLinks(id: number): Promise<TorrentLinksResult> {
    try {
        const links = await adminRequest<TorrentDownloadLink[]>({
            url: `${process.env.API_URL}/admin/torrents/${id}/download_links`,
            method: "POST",
        });
        // 後端回相對路徑，server-side 補上 API base 給瀏覽器直接下載
        return {
            ok: true,
            links: links.map((l) => ({ ...l, url: `${process.env.API_URL}${l.url}` })),
        };
    } catch (e) {
        return toErrorResult(e);
    }
}

export async function retryTorrent(id: number): Promise<TorrentActionResult> {
    try {
        await adminRequest({
            url: `${process.env.API_URL}/admin/torrents/${id}/pending`,
            method: "PATCH",
        });
        return { ok: true };
    } catch (e) {
        return toErrorResult(e);
    }
}

export async function deleteTorrent(id: number): Promise<TorrentActionResult> {
    try {
        await adminRequest({
            url: `${process.env.API_URL}/admin/torrents/${id}`,
            method: "DELETE",
        });
        return { ok: true };
    } catch (e) {
        return toErrorResult(e);
    }
}
