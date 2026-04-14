// Ensure production always uses the correct backend domain
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://api.tranzendsystems.com" 
  : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
