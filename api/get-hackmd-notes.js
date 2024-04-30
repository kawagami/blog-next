async function getHackMDNotes() {
    const res = await fetch(`${process.env.API_URL}/note_lists`, { cache: 'no-store' });

    return res.json();
}

export default getHackMDNotes;