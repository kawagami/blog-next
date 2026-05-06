"use server";

import apiRequest from "@/libs/apiRequest";
import type { WsConnection } from "@/types";

async function getWsConnections(): Promise<WsConnection[]> {
    return apiRequest<WsConnection[]>({
        url: `${process.env.API_URL}/ws/get_online_connections`,
    });
}

export default getWsConnections;
