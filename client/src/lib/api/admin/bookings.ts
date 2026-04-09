import { apiFetch } from "../apiClient";

export async function getBookings() {
    return apiFetch("/api/admin/bookings");
}
