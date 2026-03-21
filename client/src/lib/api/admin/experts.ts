export async function getExperts() {
    const res = await fetch("/api/admin/experts");
    if (!res.ok) {
        throw new Error("Failed to fetch experts");
    }
    return res.json();
}
