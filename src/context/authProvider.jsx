import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { apiRequest, setAuthToken } from "../services/api";

const STORAGE_KEY = "webmitra_google_user";

const getStoredSession = () => {
  try {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Unable to read saved user", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredSession());

  const startSession = useCallback((token, nextUser) => {
    setAuthToken(token);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  const login = useCallback(
    async (email, password) => {
      const { token, user: nextUser } = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      return startSession(token, nextUser);
    },
    [startSession]
  );

  const register = useCallback(
    async (name, email, password) => {
      const { token, user: nextUser } = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      return startSession(token, nextUser);
    },
    [startSession]
  );

  const logout = useCallback(async () => {
    await apiRequest("/auth/logout", { method: "POST" }).catch(() => {});
    setAuthToken(null);
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [login, register, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
