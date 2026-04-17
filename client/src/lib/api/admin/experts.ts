import { apiClient } from "../apiClient";

export async function getExperts() {
    return apiClient.get("/api/admin/experts");
}
