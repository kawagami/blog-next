async function getHackMDNotes() {
    const res = await fetch(`${process.env.API_URL}/notes/lists`, { cache: 'no-store' });

    return res.json();
}

export default getHackMDNotes;