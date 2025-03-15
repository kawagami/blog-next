async function getUsers() {
    const res = await fetch(`${process.env.API_URL}/users`, { cache: 'no-store' });

    return res.json();
}

export default getUsers;