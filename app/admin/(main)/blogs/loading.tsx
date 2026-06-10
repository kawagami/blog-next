function SkeletonRow() {
    return (
        <li className="flex items-center justify-between p-4">
            <div className="h-4 w-64 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
            <div className="flex space-x-2">
                <div className="h-9 w-16 bg-stone-200 dark:bg-stone-700 rounded-lg animate-pulse" />
                <div className="h-9 w-16 bg-stone-200 dark:bg-stone-700 rounded-lg animate-pulse" />
            </div>
        </li>
    );
}

export default function Loading() {
    return (
        <div className="w-full p-6 bg-stone-100 dark:bg-stone-900">
            <div className="mb-8 flex justify-center">
                <div className="h-10 w-32 bg-stone-200 dark:bg-stone-700 rounded-lg animate-pulse" />
            </div>
            <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-6">
                <ul className="divide-y divide-stone-200 dark:divide-stone-700">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonRow key={i} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
