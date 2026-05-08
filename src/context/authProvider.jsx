import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { apiRequest } from "../services/api";

const STORAGE_KEY = "webmitra_google_user";
const LEGACY_TOKEN_KEY = "webmitra_auth_token";

const getStoredSession = () => {
  try {
    window.localStorage.removeItem(LEGACY_TOKEN_KEY);
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Unable to read saved user", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredSession());

  const loginWithGoogleCredential = useCallback(async (credential) => {
    const { user: nextUser } = await apiRequest("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });

    window.localStorage.removeItem(LEGACY_TOKEN_KEY);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    await apiRequest("/auth/logout", { method: "POST" }).catch(() => {});
    window.localStorage.removeItem(LEGACY_TOKEN_KEY);
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginWithGoogleCredential,
      logout,
    }),
    [loginWithGoogleCredential, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
