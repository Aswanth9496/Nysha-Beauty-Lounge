
export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
