import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserRole } from 'types';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  allowedRole: UserRole[];
}

export const RequiredAuth = ({ allowedRole }: Props) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    allowedRole.some((role) => user?.role === role)
      ? <Outlet />
      : user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
};
