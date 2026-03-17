import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** Redirige a /login si no hay sesión activa */
export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

/** Solo deja pasar si role === 'admin' */
export const RequireAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

/** Solo deja pasar si role === 'owner' o 'admin' */
export const RequireOwner = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return user?.role === 'owner'
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;
};