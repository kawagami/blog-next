"use server";

async function getNewPassword(count = 1, length = 8) {
    // 將默認值應用於 count 和 length，如果未提供參數，則使用默認值
    const res = await fetch(
        `${process.env.API_URL}/tools/new_password?count=${count}&length=${length}`,
        { cache: 'no-store' }
    );

    return res.json();
}

export default getNewPassword;
