const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

const AUTH_TOKEN_KEY = "webmitra_auth_token";

export const setAuthToken = (token) => {
  if (!token) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = () => {
  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};
