export default function Loading() {
    return (
        <div className="w-full p-6 bg-gray-100 dark:bg-gray-800">
            <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded shadow">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-2">
                        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                ))}
                <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
        </div>
    );
}
