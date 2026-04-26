import { useState, useEffect } from "react";
import getWsMessages from "@/api/get-ws-messages";
import type { ChatMessage } from "@/types";

interface Props {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    username: string;
    messageBoxRef: React.RefObject<HTMLDivElement | null>;
}

function MessagesList({ messages, setMessages, username, messageBoxRef }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const lastMessageId = messages[0]?.id ?? null;

    const handleScroll = async () => {
        if (!messageBoxRef.current || isLoading || !hasMore) return;
        if (messageBoxRef.current.scrollTop === 0) {
            setIsLoading(true);
            try {
                const limit = 20;
                const fetchedMessages = await getWsMessages({ limit, before_id: lastMessageId ?? undefined });
                if (fetchedMessages.length > 0) {
                    setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Failed to load more messages:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const ref = messageBoxRef.current;
        if (ref) ref.addEventListener("scroll", handleScroll);
        return () => { if (ref) ref.removeEventListener("scroll", handleScroll); };
    }, [isLoading, hasMore, lastMessageId]);

    return (
        <div className="w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 ml-4 h-full overflow-y-auto" ref={messageBoxRef}>
            {isLoading && <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>}
            <ul className="space-y-2">
                {messages.map((msg, index) => {
                    switch (msg.message_type) {
                        case "Message":
                            return (
                                <li key={index} className={`p-3 shadow-sm rounded-lg max-w-xl ${msg.from === username ? "bg-green-100 dark:bg-green-600 text-right ml-auto" : "bg-white dark:bg-gray-700 text-left"}`}>
                                    <div className={msg.from === username ? "text-right" : "text-left"}>
                                        <span className="block font-bold text-gray-900 dark:text-white mb-1">{msg.from}:</span>
                                        <p className="text-gray-800 dark:text-gray-300 mb-1">{msg.content}</p>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">{msg.created_at}</span>
                                    </div>
                                </li>
                            );
                        case "Join":
                            return (
                                <li key={index} className="p-2 shadow-sm rounded-lg bg-blue-100 dark:bg-gray-600 text-center">
                                    <div className="text-gray-800 dark:text-gray-300">{`${msg.from} has joined the chat.`}</div>
                                </li>
                            );
                        case "Leave":
                            return (
                                <li key={index} className="p-2 shadow-sm rounded-lg bg-red-100 dark:bg-gray-600 text-center">
                                    <div className="text-gray-800 dark:text-gray-300">{`${msg.from} has left the chat.`}</div>
                                </li>
                            );
                        default:
                            return null;
                    }
                })}
            </ul>
        </div>
    );
}

export default MessagesList;
