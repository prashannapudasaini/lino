import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, getMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('eel_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('eel_admin_token');
      if (storedToken) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (err) {
          console.error("Auth session check failed:", err);
          localStorage.removeItem('eel_admin_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await loginAdmin(email, password);
    if (data.access_token) {
      localStorage.setItem('eel_admin_token', data.access_token);
      setToken(data.access_token);
      const profile = await getMe();
      setUser(profile);
      return profile;
    }
    throw new Error("No access token returned");
  };

  const logout = () => {
    localStorage.removeItem('eel_admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
