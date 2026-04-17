import { apiClient } from "../apiClient";

export async function getBookings() {
    return apiClient.get("/api/admin/bookings");
}
