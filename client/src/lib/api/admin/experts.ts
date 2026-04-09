import { apiFetch } from "../apiClient";

export async function getExperts() {
    return apiFetch("/api/admin/experts");
}
