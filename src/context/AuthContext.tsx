import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axiosClient from '../api/axiosClient';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Devuelve la ruta de inicio según el rol del usuario */
export const getHomeByRole = (role: User['role']): string => {
  switch (role) {
    case 'admin': return '/admin';
    case 'user':  return '/dashboard';
    default:      return '/dashboard';
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]   = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Restaurar usuario desde localStorage al montar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Avisa al backend para revocar el JWT (jti) antes de limpiar
  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch {
      // Si el token ya expiró o el backend falla, igual limpiamos el cliente
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};