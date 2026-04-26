import Link from "next/link";

interface Props {
    href: string;
    title: string;
    contents: React.ReactNode[];
}

export default function IndexInfo({ href, title, contents }: Props) {
    return (
        <div className={`p-8 border-4 rounded-3xl border-double border-gray-800 dark:border-gray-200 ${href === '/' ? 'col-span-2' : ''} bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
            <div className="text-4xl font-semibold text-blue-600 hover:text-blue-400 transition-transform transform hover:scale-105">
                <Link href={href} className="hover:text-blue-500">{title}</Link>
                <span className="text-lg text-gray-500 ml-3">簡介</span>
            </div>
            <div className="mt-6 text-gray-800 dark:text-gray-300 space-y-4 leading-relaxed">
                {contents.map((content, index) => (
                    <div key={`content_index_${index}`} className="border-b border-gray-300 dark:border-gray-700 pb-3 last:border-none">
                        {content}
                    </div>
                ))}
            </div>
        </div>
    );
}
