export async function getBookings() {
    const res = await fetch("/api/admin/bookings");
    if (!res.ok) {
        throw new Error("Failed to fetch bookings");
    }
    return res.json();
}
