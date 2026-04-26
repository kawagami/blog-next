import getWsMessages from "@/api/get-ws-messages";
import ChatMessages from "@/components/chat/chat-messages";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Websocket chat",
    description: "Websocket chat",
};

export default async function Ws() {
    const messages = await getWsMessages();
    return <ChatMessages messages={messages} />;
}
