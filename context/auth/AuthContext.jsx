'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initializeAuth = () => {
      const token = authService.getCurrentToken();
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser && storedUser !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse user data', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
    router.push('/login');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};