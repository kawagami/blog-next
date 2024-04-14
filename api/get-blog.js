import { hget } from "@/lib/redis";

export default async function getBlog(id) {
    const result = await hget("blogs", id);
    if (result) {
        return JSON.parse(result);
    } else {
        const res = await fetch(`${process.env.API_URL}/blogs/${id}`);
        return res.json();
    }
}