// components/OnlineUsers.js
export default function OnlineUsers({ users }) {
    return (
        <div className="w-1/4 bg-blue-100 dark:bg-gray-600 rounded-lg p-4 h-full overflow-y-auto">
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">目前在線使用者</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index} className="text-sm text-gray-800 dark:text-gray-300">{user}</li>
                ))}
            </ul>
        </div>
    );
}
