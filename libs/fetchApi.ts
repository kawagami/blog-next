export async function fetchApi<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
}
