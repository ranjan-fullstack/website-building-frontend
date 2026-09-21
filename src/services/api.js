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

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers,
    });
  } catch {
    const networkError = new Error(
      "We could not reach the server. Please check your internet connection and try again."
    );
    networkError.status = 0;
    throw networkError;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Show backend messages for expected 4xx problems; never leak server internals for 5xx.
    const message =
      response.status >= 500
        ? "Something went wrong on our side. Please try again in a moment."
        : data.message || "We could not complete that request.";
    const requestError = new Error(message);
    requestError.status = response.status;
    throw requestError;
  }

  return data;
};
