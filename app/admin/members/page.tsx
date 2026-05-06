import getMembers from "@/api/get-members";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Members",
    description: "Members list",
};

export default async function MembersPage() {
    const members = await getMembers();

    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">ID</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Email</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 text-xs">
                                    <Link href={`/admin/members/${member.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {member.id}
                                    </Link>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                                    <Link href={`/admin/members/${member.id}`} className="hover:underline">
                                        {member.name}
                                    </Link>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{member.email ?? '—'}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 text-sm">
                                    {new Date(member.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
