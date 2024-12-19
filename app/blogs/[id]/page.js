'use server';

import getBlog from "@/api/get-blog";

export default async function BlogPage({ params }) {
    const id = (await params).id
    const blog = await getBlog(id);

    return <div dangerouslySetInnerHTML={{ __html: blog.html }} />
}
