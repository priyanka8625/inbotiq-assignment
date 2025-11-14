'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authService } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      if (storedToken && storedUser) {
        try {
          const { user: fetchedUser } = await authService.getMe(storedToken);
          setUser(fetchedUser);
          setToken(storedToken);
        } catch (error) {
          authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { token: newToken, user: newUser } = await authService.login({
      email,
      password,
    });
    authService.setToken(newToken);
    authService.setUser(newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
  ) => {
    const { token: newToken, user: newUser } = await authService.signup({
      name,
      email,
      password,
      role,
    });
    authService.setToken(newToken);
    authService.setUser(newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
