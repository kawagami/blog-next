export default function Loading() {
    return (
        <div className="w-full animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-10 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50" />
                ))}
            </div>
        </div>
    );
}
