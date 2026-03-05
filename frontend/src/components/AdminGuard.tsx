import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';

export const AdminGuard = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/admin/auth" replace />;
  }

  if (user.role !== 'admin') {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
};
