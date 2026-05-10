export default function Loading() {
    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            {['ID', 'Name', 'Email', 'Roles', 'Actions'].map((h) => (
                                <th key={h} className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i}>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
