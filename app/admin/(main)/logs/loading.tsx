export default function Loading() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {['ID', 'Level', 'Message', 'Target', 'File', 'Time'].map((h) => (
                                    <th key={h} className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="px-4 py-2"><div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>
                                    <td className="px-4 py-2"><div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" style={{ width: `${60 + (i % 3) * 15}%` }} /></td>
                                    <td className="px-4 py-2 hidden lg:table-cell"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>
                                    <td className="px-4 py-2 hidden xl:table-cell"><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>
                                    <td className="px-4 py-2"><div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
