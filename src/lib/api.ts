const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // This ensures HttpOnly cookies are sent with the request
  });

  if (typeof window !== "undefined") {
    const responseToken = response.headers.get("X-Auth-Token");
    if (responseToken) {
      localStorage.setItem("auth_token", responseToken);
    }
  }

  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined" && endpoint !== "/api/auth/login" && window.location.pathname !== "/admin/login") {
      localStorage.removeItem("auth_token");
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  if (typeof window !== "undefined" && endpoint === "/api/auth/logout") {
    localStorage.removeItem("auth_token");
  }

  return response;
}
