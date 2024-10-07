import Link from "next/link";

export default function BlogCard(props) {
    return (
        <Link
            href={props.href}
            className="border-4 rounded-xl border-cyan-400 p-4 m-2 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-cyan-50"
        >
            <div className="text-xl font-semibold mb-2">{props.title}</div>
            <div className="text-gray-700 mb-4">{props.short_content}</div>
        </Link>
    );
}
