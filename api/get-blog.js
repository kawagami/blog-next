'use server';

async function getBlog(id) {
    const res = await fetch(`${process.env.API_URL}/blogs/${id}`, { cache: 'no-store' });

    return res.json();
}

export default getBlog;