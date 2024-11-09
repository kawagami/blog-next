import Image from "next/image";
import Link from "next/link";
import getBase64 from "@/api/get-base64";

export default async function SiteComponent(props) {
    const myBlurDataUrl = await getBase64(props.src);
    return (
        <Link target="_blank" href={props.href} className="hover:scale-105 w-full max-w-xs">
            <div className="relative flex flex-col overflow-hidden rounded-lg bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs">
                <div className="relative m-0 overflow-hidden rounded-t-lg">
                    <Image
                        src={props.src}
                        width={500}
                        height={500}
                        alt={props.alt}
                        className="hover:scale-110"
                        placeholder="blur"
                        blurDataURL={myBlurDataUrl}
                    />
                </div>
                <div className="p-4">
                    <h4 className="text-xl font-bold text-blue-gray-900 mb-2">
                        {props.title}
                    </h4>
                    {props.contents && props.contents.map((content, index) => (
                        <p key={index} className="text-base text-gray-600">
                            {content}
                        </p>
                    ))}
                </div>
            </div>
        </Link>
    );
}
