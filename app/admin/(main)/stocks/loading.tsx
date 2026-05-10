export default function Loading() {
    return (
        <div className="w-4/5 max-h-[calc(100svh-180px)] overflow-auto p-6 bg-gray-100 dark:bg-gray-800">
            <div className="w-full flex flex-wrap justify-center gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 w-56 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
            </div>
        </div>
    );
}
