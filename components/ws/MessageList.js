function MessagesList({ messages, username, messageBoxRef }) {
    return (
        <div className="w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 ml-4 h-full overflow-y-auto" ref={messageBoxRef}>
            <ul className="space-y-2">
                {messages.map((msg, index) => {
                    let content;

                    switch (msg.message_type) {
                        case "Message":
                            content = (
                                <li
                                    key={index}
                                    className={`p-3 shadow-sm rounded-lg max-w-xl ${msg.from === username
                                        ? "bg-green-100 dark:bg-green-600 text-right ml-auto"
                                        : "bg-white dark:bg-gray-700 text-left"
                                        }`}
                                >
                                    <div className={msg.from === username ? "text-right" : "text-left"}>
                                        <span className="block font-bold text-gray-900 dark:text-white mb-1">
                                            {msg.from}:
                                        </span>
                                        <p className="text-gray-800 dark:text-gray-300 mb-1">
                                            {msg.content}
                                        </p>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {msg.created_at}
                                        </span>
                                    </div>
                                </li>
                            );
                            break;

                        case "Join":
                            content = (
                                <li key={index} className="p-2 shadow-sm rounded-lg bg-blue-100 dark:bg-gray-600 text-center">
                                    <div className="text-gray-800 dark:text-gray-300">{`${msg.from} has joined the chat.`}</div>
                                </li>
                            );
                            break;

                        case "Leave":
                            content = (
                                <li key={index} className="p-2 shadow-sm rounded-lg bg-red-100 dark:bg-gray-600 text-center">
                                    <div className="text-gray-800 dark:text-gray-300">{`${msg.from} has left the chat.`}</div>
                                </li>
                            );
                            break;

                        default:
                            content = null;
                    }

                    return content;
                })}
            </ul>
        </div>
    );
}

export default MessagesList;
