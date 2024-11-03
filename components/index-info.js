import Link from "next/link";

export default function IndexInfo(props) {
    return (
        <div className={`p-6 border-4 rounded-2xl border-double border-gray-800 dark:border-gray-200 ${props.href === '/' ? 'col-span-2' : ''} bg-white dark:bg-gray-900 shadow-md`}>
            <div className="text-4xl font-bold text-blue-500 hover:scale-105 transition-transform">
                <Link href={props.href} className="hover:text-blue-400">
                    {props.title}
                </Link>
                <span className="text-lg text-gray-500 ml-2">簡介</span>
            </div>
            <div className="mt-4 text-gray-700 dark:text-gray-300">
                {
                    props.contents.map((content, index) => (
                        <div key={`content_index_${index}`} className="mb-2 border-b pb-2 last:border-none">
                            {content}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
