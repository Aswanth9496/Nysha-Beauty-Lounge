import { apiClient } from "../apiClient";

export async function getServices() {
    return apiClient.get("/api/admin/services");
}
