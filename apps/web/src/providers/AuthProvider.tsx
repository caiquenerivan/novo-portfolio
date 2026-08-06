// src/providers/AuthProvider.tsx
import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, AuthContextType } from '../context/authTypes';
import { authService } from '../services/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // O JWT vive num cookie httpOnly — invisível ao JS — então a única forma
    // de saber se a sessão é válida é perguntar ao servidor. Enquanto isso
    // não resolve, `loading` fica true — sem isso, ProtectedRoute chutaria
    // o usuário pra /login a cada F5, mesmo com um cookie de sessão válido.
    authService.getCurrentUser()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (userData: User) => {
    // O cookie httpOnly já foi setado pelo servidor na chamada de authService.login()
    // Quem decide para onde navegar é quem chama login() (a página de Login)
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    authService.logout().catch(() => {});
    navigate('/login');
  };

  const value: AuthContextType = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};