import { apiFetch } from "../apiClient";

export async function getServices() {
    return apiFetch("/api/admin/services");
}
