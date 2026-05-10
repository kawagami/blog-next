export default function Loading() {
    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                </div>
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <tbody>
                        {['Email', 'Created At', 'OAuth Providers'].map((label) => (
                            <tr key={label}>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 w-1/3">
                                    {label}
                                </th>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
