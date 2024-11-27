function MessageInput({ inputMessage, setInputMessage, sendMessage, isConnected, handleKeyDown }) {
    return (
        <div className="mt-4 w-full max-w-4xl flex items-center space-x-4">
            <input
                type="text"
                className="flex-1 bg-white dark:bg-gray-700 shadow-sm rounded-lg p-2 border border-gray-300 dark:border-gray-600 focus:outline-none"
                placeholder="輸入訊息..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!isConnected} // 當 WebSocket 斷線時禁用輸入框
            />
            <button
                onClick={sendMessage}
                disabled={!isConnected} // 當 WebSocket 斷線時禁用按鈕
                className={`${isConnected
                    ? 'bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800'
                    : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
                {isConnected ? '發送訊息' : '正在連線...'}
            </button>
        </div>
    );
}

export default MessageInput;
