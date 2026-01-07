import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  organization: string;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'cascadeDafoAuth';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (username: string): Promise<void> => {
    const mockUser: User = {
      name: username || 'James Smith',
      organization: 'Hanger Clinic'
    };
    setUser(mockUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  };

  const logout = (): void => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
