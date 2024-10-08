async function getImageUrl() {
    const res = await fetch(`${process.env.API_URL}`);

    return res.text();
}

export default getImageUrl;