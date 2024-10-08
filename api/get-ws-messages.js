async function getWsMessages() {
    const res = await fetch(`${process.env.API_URL}/ws/messages`, { cache: 'no-store' });

    return res.json();
}

export default getWsMessages;