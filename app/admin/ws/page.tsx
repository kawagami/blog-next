import getWsConnections from "@/api/get-ws-connections";
import SaySomethingForm from "./say-something-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "WS Management",
    description: "WebSocket connections management",
};

export default async function WsAdminPage() {
    const connections = await getWsConnections();

    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Online Connections ({connections.length})
                    </h2>
                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Addr</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">User Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {connections.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="border border-gray-300 dark:border-gray-700 px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                            No active connections
                                        </td>
                                    </tr>
                                ) : (
                                    connections.map((conn) => (
                                        <tr key={conn.addr} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 font-mono text-sm">
                                                {conn.addr}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 text-sm">
                                                {conn.user_email ?? <span className="text-gray-400">anonymous</span>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Say Something to Someone
                    </h2>
                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                        <SaySomethingForm />
                    </div>
                </section>
            </div>
        </div>
    );
}
