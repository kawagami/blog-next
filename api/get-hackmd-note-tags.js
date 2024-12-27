async function getHackMDNoteTags() {
    const res = await fetch(`${process.env.API_URL}/notes/tags`, { cache: 'no-store' });

    return res.json();
}

export default getHackMDNoteTags;