import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserRole } from 'types';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  allowedRole: UserRole;
}

export const RequiredAuth = ({ allowedRole }: Props) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
  // eslint-disable-next-line no-nested-ternary
    user?.userRole === allowedRole
      ? <Outlet />
      : user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
};
