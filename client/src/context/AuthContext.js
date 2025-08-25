// client/src/context/AuthContext.js

"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

// Helper function to decode the JWT payload
function parseJwt(token) {
  try {
    // Decode the base64url part of the token
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

// Create the context
const AuthContext = createContext();

// Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
        console.error("Failed to access localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedToken = parseJwt(newToken);

    // This is the crucial logic for redirection
    if (decodedToken && decodedToken.role === 'admin') {
      router.push('/admin'); // Redirect admins to the admin dashboard
    } else {
      router.push('/home'); // Redirect regular users to the new homepage
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/'); // Redirect to login page after logout
  };

  const authContextValue = {
    token,
    isLoggedIn: !!token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context easily
export function useAuth() {
  return useContext(AuthContext);
}
