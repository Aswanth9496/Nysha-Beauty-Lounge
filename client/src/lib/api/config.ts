// Centralized API base URL — ensuring production ALWAYS uses the correct backend domain
export const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://api.tranzendsystems.com" 
  : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
