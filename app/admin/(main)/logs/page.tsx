import getLogs from "@/api/get-logs";
import LogsClient from "./logs-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Logs",
    description: "System logs viewer",
};

export default async function LogsPage() {
    const result = await getLogs({ limit: 100, offset: 0 });

    if (!result.ok) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center max-w-sm">
                    <p className="text-red-700 dark:text-red-400 font-semibold text-lg">無 log:read 權限</p>
                    <p className="text-red-600 dark:text-red-500 text-sm mt-2">請聯繫管理員取得授權</p>
                </div>
            </div>
        );
    }

    return <LogsClient initialLogs={result.data} />;
}
