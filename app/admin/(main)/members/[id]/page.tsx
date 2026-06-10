import getMember from "@/api/get-member";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Member Detail",
    description: "Member detail",
};

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id);
    const member = await getMember(id);

    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                    {member.avatar_url ? (
                        <Image
                            src={member.avatar_url}
                            alt={member.name}
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-400 text-xl font-bold">
                            {member.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">{member.name}</h1>
                        <p className="text-stone-500 dark:text-stone-400 text-sm">ID: {member.id}</p>
                    </div>
                </div>

                <table className="w-full border-collapse border border-stone-200 dark:border-stone-700">
                    <tbody>
                        <tr>
                            <th className="border border-stone-300 dark:border-stone-700 px-4 py-2 text-left text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 w-1/3">Email</th>
                            <td className="border border-stone-300 dark:border-stone-700 px-4 py-2 text-stone-900 dark:text-stone-100">{member.email ?? '—'}</td>
                        </tr>
                        <tr>
                            <th className="border border-stone-300 dark:border-stone-700 px-4 py-2 text-left text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800">Created At</th>
                            <td className="border border-stone-300 dark:border-stone-700 px-4 py-2 text-stone-900 dark:text-stone-100">
                                {new Date(member.created_at).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-stone-300 dark:border-stone-700 px-4 py-2 text-left text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800">OAuth Providers</th>
                            <td className="border border-stone-300 dark:border-stone-700 px-4 py-2">
                                <div className="flex gap-2 flex-wrap">
                                    {member.providers.length > 0 ? member.providers.map(p => (
                                        <span key={p} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm font-medium">
                                            {p}
                                        </span>
                                    )) : <span className="text-stone-500 dark:text-stone-400">—</span>}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
