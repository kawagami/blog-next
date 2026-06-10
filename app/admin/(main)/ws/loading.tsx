export default function Loading() {
    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <section>
                    <div className="h-7 w-52 bg-stone-200 dark:bg-stone-700 rounded animate-pulse mb-4" />
                    <div className="bg-white dark:bg-stone-900 shadow-lg rounded-lg overflow-hidden">
                        <table className="w-full border-collapse border border-stone-200 dark:border-stone-700">
                            <thead>
                                <tr className="bg-stone-100 dark:bg-stone-800">
                                    {['Addr', 'User Email'].map((h) => (
                                        <th key={h} className="border border-stone-300 dark:border-stone-700 px-4 py-2 text-left text-stone-700 dark:text-stone-300">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="border border-stone-300 dark:border-stone-700 px-4 py-2">
                                            <div className="h-4 w-32 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                                        </td>
                                        <td className="border border-stone-300 dark:border-stone-700 px-4 py-2">
                                            <div className="h-4 w-40 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <div className="h-7 w-52 bg-stone-200 dark:bg-stone-700 rounded animate-pulse mb-4" />
                    <div className="bg-white dark:bg-stone-900 shadow-lg rounded-lg p-6 flex flex-col gap-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="h-4 w-16 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                                <div className="h-10 w-full bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                            </div>
                        ))}
                        <div className="h-10 w-20 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                    </div>
                </section>
            </div>
        </div>
    );
}
