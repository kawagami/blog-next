export default function Loading() {
    return (
        <div className="w-full animate-pulse space-y-4">
            <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded w-40" />
            <div className="h-10 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="bg-white dark:bg-stone-900 shadow-lg rounded-lg overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-10 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50" />
                ))}
            </div>
        </div>
    );
}
