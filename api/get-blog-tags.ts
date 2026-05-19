"use server"

export async function getBlogTags(): Promise<string[]> {
  const res = await fetch(`${process.env.API_URL}/blogs/tags`)
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
  return res.json()
}
