import Link from "next/link";

export default function BlogCard(props) {
    return (
        <Link
            href={props.href}
            className="border-4 rounded-xl border-cyan-400 p-2 hover:scale-110 hover:font-bold hover:text-lg hover:text-blue-400"
        >
            <div>{props.title}</div>
            <div>{props.short_content}</div>
            {/* <div>{props.blog.components.length}</div> */}
        </Link>
    );
}