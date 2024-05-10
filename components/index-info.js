import Link from "next/link";

export default function IndexInfo(props) {
    return (
        <div className="p-4 border-4 rounded-2xl border-double border-gray-800 dark:border-gray-200">
            <div className="text-4xl p-4 hover:scale-150">
                <Link
                    href={props.href}
                    className="text-blue-400"
                >
                    {props.title}
                </Link>
                簡介
            </div>
            {
                props.contents.map((content, index) => <div key={`content_index_${index}`}>{content}</div>)
            }
        </div>
    );
}