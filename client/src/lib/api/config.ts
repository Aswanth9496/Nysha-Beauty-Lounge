// Centralized API base URL — strictly from .env

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

export const config = {
  API_BASE_URL,
};
