"use server";

async function getNewPassword(count = 1, length = 8): Promise<string[]> {
    const res = await fetch(
        `${process.env.API_URL}/tools/new_password?count=${count}&length=${length}`,
        { cache: 'no-store' }
    );
    return res.json();
}

export default getNewPassword;
