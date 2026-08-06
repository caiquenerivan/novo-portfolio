// ProtectedRoute.tsx
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Ainda checando a sessão com o servidor — não decide nada até saber
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full pl-16 items-center justify-center max-w-screen-3xl 3xl:pl-96 z-10">
        <p className="text-teal-400 text-sm animate-pulse">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};