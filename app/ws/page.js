import getWsMessages from "@/api/get-ws-messages"
import ChatMessages from "@/components/chat-messages";

export const metadata = {
    title: "Websocket chat",
    description: "Websocket chat",
};

export default async function Ws() {
    const messages = await getWsMessages();

    return (
        <ChatMessages messages={messages} />
    )
}
