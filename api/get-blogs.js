'use server';

async function getBlogs() {
    const res = await fetch(`${process.env.API_URL}/blogs`, { cache: 'no-store' });

    return res.json();
}

export default getBlogs;