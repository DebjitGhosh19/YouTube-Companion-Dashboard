import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // user info
  const [tokens, setTokens] = useState(null); // OAuth tokens
  const [loading, setLoading] = useState(true);

  // Load tokens from localStorage on refresh
  useEffect(() => {
    const savedTokens = localStorage.getItem("yt_tokens");
    if (savedTokens) {
      setTokens(JSON.parse(savedTokens));
    }
    setLoading(false);
  }, []);

  const login = (tokens) => {
    setTokens(tokens);
    localStorage.setItem("yt_tokens", JSON.stringify(tokens));
  };

  const logout = () => {
    setTokens(null);
    localStorage.removeItem("yt_tokens");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, tokens, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);
