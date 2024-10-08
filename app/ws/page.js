import getWsMessages from "@/api/get-ws-messages"
import ChatMessages from "@/components/chat-messages";

export const metadata = {
    title: "this is ws page",
    description: "this is ws page",
};

export default async function Ws() {
    const messages = await getWsMessages();

    return (
        <ChatMessages messages={messages} />
    )
}
