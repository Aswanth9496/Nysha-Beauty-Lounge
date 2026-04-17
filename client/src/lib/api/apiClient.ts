import { config } from "./config";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  method?: RequestMethod;
  _retry?: boolean;
}

/**
 * Centralized API Client with transparent refresh handling
 */
class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private failedQueue: any[] = [];

  constructor() {
    this.baseUrl = config.API_BASE_URL.replace(/\/$/, ""); // Remove trailing slash if any
  }

  private async processQueue(error: Error | null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    this.failedQueue = [];
  }

  /**
   * Main request method
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = endpoint.startsWith("http") 
      ? endpoint 
      : `${this.baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    // Define default headers
    const headers: Record<string, string> = {};

    // Only set application/json if not sending FormData and no custom Content-Type provided
    const isFormData = options.body instanceof FormData;
    if (!isFormData && !Object.keys(options.headers || {}).some(h => h.toLowerCase() === 'content-type')) {
      headers["Content-Type"] = "application/json";
    }

    const mergedOptions: RequestInit = {
      credentials: "include",
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, mergedOptions);

      // Handle 401 Unauthorized - Attempt Refresh
      // Only attempt refresh if not already a login/refresh request and NOT a retry
      if (response.status === 401 && 
          !url.includes("/api/auth/login") && 
          !url.includes("/api/auth/refresh") && 
          !options._retry) {
        
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(() => this.request<T>(endpoint, { ...options, _retry: true }));
        }

        this.isRefreshing = true;

        try {
          // Attempt to refresh the token
          const refreshRes = await fetch(`${this.baseUrl}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshRes.ok) {
            this.isRefreshing = false;
            this.processQueue(null);
            // Retry the original request exactly once
            return this.request<T>(endpoint, { ...options, _retry: true });
          } else {
            // Refresh failed - Redirect to login
            throw new Error("Session expired");
          }
        } catch (refreshErr) {
          this.isRefreshing = false;
          this.processQueue(refreshErr as Error);
          if (typeof window !== "undefined") {
            window.location.href = "/admin/login";
          }
          throw refreshErr;
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorData.message || "An unexpected error occurred",
          ...errorData,
        };
      }

      // Return JSON if content-type is application/json
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error: any) {
      // Suppress console.error for expected authentication failures (401) on login/refresh
      const isExpectedAuthError = 
        error?.status === 401 && 
        (endpoint.includes("/api/auth/login") || endpoint.includes("/api/auth/refresh"));

      if (!isExpectedAuthError) {
        console.error(`API Request Error [${mergedOptions.method || "GET"} ${endpoint}]:`, error);
      }
      throw error;
    }
  }

  // Helper methods
  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
