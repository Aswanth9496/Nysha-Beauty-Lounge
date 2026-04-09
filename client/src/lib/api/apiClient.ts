const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.tranzendsystems.com";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
