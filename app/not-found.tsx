import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100svh-120px)] gap-4 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
            <p className="text-gray-500 dark:text-gray-400">找不到這個頁面。</p>
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                回首頁
            </Link>
        </div>
    );
}
