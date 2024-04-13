import Image from "next/image";

export const metadata = {
    title: "Blogs",
    description: "Blogs",
};

export default async function Page({ params }) {
    const res = await getBlog(params.slug);

    return (
        <div className="grid gap-2">
            <div>{res.name}</div>
            <div>{res.short_content}</div>
            {res.components.map((component, index) => (
                component.url
                    ?
                    <div key={index} className="rounded-lg">
                        {component.content ? <div key={index} className="rounded-lg">{component.content}</div> : null}
                        <Image
                            key={index}
                            src={component.url}
                            width={300}
                            height={300}
                            className="rounded-lg"
                            alt="image"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrwcAAaMBEBqiKX0AAAAASUVORK5CYII="
                        />
                    </div>
                    :
                    <div key={index} className="rounded-lg">{component.content}</div>
            ))}
        </div>
    )
}

async function getBlog(id) {
    const res = await fetch(`${process.env.API_URL}/blogs/${id}`);

    return res.json();
}