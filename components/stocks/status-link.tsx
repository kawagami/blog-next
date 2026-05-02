import Link from 'next/link';

interface Props {
    status: string;
    currentStatus: string;
    children: React.ReactNode;
}

export const StatusLink = ({ status, currentStatus, children }: Props) => {
    const isActive = currentStatus === status || (!currentStatus && status === '');

    return (
        <Link
            href={{ pathname: '/admin/stocks/list', query: status ? { status } : {} }}
            className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition ${isActive ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'}`}
        >
            {children}
        </Link>
    );
};
