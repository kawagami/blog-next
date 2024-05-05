async function getHackMDNoteTags() {
    const res = await fetch(`${process.env.API_URL}/note_list_tags`, { cache: 'no-store' });

    return res.json();
}

export default getHackMDNoteTags;