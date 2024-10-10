import getWsMessages from "@/api/get-ws-messages"
import ChatMessages from "@/components/chat-messages";

export const metadata = {
    title: "simple ws chat",
    description: "simple ws chat",
};

export default async function Ws() {
    const messages = await getWsMessages();

    return (
        <ChatMessages messages={messages} />
    )
}
