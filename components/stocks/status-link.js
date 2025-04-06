import Link from 'next/link';

export const StatusLink = ({ status, currentStatus, children }) => {
    const isActive = currentStatus === status || (!currentStatus && status === '');

    return (
        <Link
            href={{
                pathname: '/admin/stocks/list',
                query: status ? { status } : {},
            }}
            className={`px-4 py-2 rounded-lg border border-gray-300 transition
                ${isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-black'
                }`}
        >
            {children}
        </Link>
    );
};
