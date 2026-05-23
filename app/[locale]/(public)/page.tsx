import BlogList from '@/components/blogs/blog-list';

interface Props {
    searchParams: Promise<{ tag?: string; page?: string }>
}

export default async function Home({ searchParams }: Props) {
    const { tag, page } = await searchParams;
    return <BlogList selectedTag={tag ?? null} page={page ? Number(page) : 1} />;
}
