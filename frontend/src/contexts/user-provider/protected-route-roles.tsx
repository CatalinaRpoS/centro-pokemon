import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import paths from '@config/paths';
import { ProtectedRouteRolesProps } from './types';
import UserContext from './user-provider';

const ProtectedRouteRoles: React.FC<ProtectedRouteRolesProps> = (
  { allowedRole, children }: ProtectedRouteRolesProps
) => {
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkRoles = () => {
      const userRole = localStorage.getItem('role');
      const allowed = userRole === allowedRole;
      setIsAllowed(allowed);
      setUserName(localStorage.getItem('name')); // Obtener el nombre del usuario
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

  return (
    <UserContext.Provider value={{ name: userName }}>
      {children}
    </UserContext.Provider>
  );
};

export default ProtectedRouteRoles;