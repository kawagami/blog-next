export default function Loading() {
    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <section>
                    <div className="h-7 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    {['Addr', 'User Email'].map((h) => (
                                        <th key={h} className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <div className="h-7 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 flex flex-col gap-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                        ))}
                        <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                </section>
            </div>
        </div>
    );
}
