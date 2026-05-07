import NotificationFeed from "@/components/ws/notification-feed";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "WS Notifications",
    description: "Real-time WebSocket notifications",
};

export default function WsPage() {
    return <NotificationFeed />;
}
