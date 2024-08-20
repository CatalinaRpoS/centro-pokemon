import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import paths from '@config/paths';
import { ProtectedRouteRolesProps } from './types';

const ProtectedRouteRoles: React.FC<ProtectedRouteRolesProps> = ({
  children, allowedRole,
}) => {
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRoles = () => {
        const userRole = localStorage.getItem('role');
        const allowed = userRole === allowedRole;
        setIsAllowed(allowed);
      };

    checkRoles();
  }, [allowedRole]);

  if (isAllowed === false) {
    if (localStorage.getItem('role') === 'trainer') {
        return <Navigate to={paths.trainer} state={{ from: location }} />;
    } else if (localStorage.getItem('role') === 'nurse') {
        return <Navigate to={paths.nurse} state={{ from: location }} />;
    }
    return <Navigate to={paths.root} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRouteRoles;