export default function Loading() {
    return (
        <div className="w-full p-6 bg-stone-100 dark:bg-stone-800">
            <div className="space-y-4 bg-white dark:bg-stone-900 p-4 rounded shadow">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-2">
                        <div className="h-4 w-48 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                        <div className="h-10 w-full bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
                    </div>
                ))}
                <div className="h-10 w-20 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
            </div>
        </div>
    );
}
