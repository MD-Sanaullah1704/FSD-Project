/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("job_portal_token") || null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("job_portal_token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    localStorage.setItem("job_portal_token", res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const register = async (formData) => {
    const res = await registerUser(formData);
    localStorage.setItem("job_portal_token", res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};