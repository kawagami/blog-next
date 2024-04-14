import { set, get } from "@/lib/redis";

export default async function getBlogs() {
    const res = await fetch(`${process.env.API_URL}/blogs`);
    
    return res.json();
}