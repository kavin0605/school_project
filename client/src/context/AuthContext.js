import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const result = await authService.getProfile();
          if (result.success) {
            setUser(result.user);
            setIsAuthenticated(true);
          } else {
            // Invalid token, clear storage
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (identifier, password, role) => {
    try {
      const result = await authService.login(identifier, password, role);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true, user: result.user };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    isAdmin: () => authService.isAdmin(),
    isStudent: () => authService.isStudent(),
    isParent: () => authService.isParent(),
    isTeacher: () => authService.isTeacher(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};