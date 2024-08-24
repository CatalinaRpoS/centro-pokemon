import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import paths from '@config/paths';
import Home from '@pages/home';
import Trainer from '@pages/Trainer';
import Nurse from '@pages/Nurse';
import Register from '@pages/Register';
import { ProtectedRouteRoles } from '@contexts/user-provider';

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Home />,
  },
  {
    path: paths.trainer,
    element: (
      <ProtectedRouteRoles allowedRole='trainer'>
        <Trainer />
      </ProtectedRouteRoles>
    ),
  },
  {
    path: paths.nurse,
    element: (
      <ProtectedRouteRoles allowedRole='nurse'>
        <Nurse />
      </ProtectedRouteRoles>
    ),
  },
  {
    path: paths.register,
    element: <Register />,
  },
]);

const AppRouterProvider: React.FC<Record<string, never>> = () => (
  <RouterProvider router={router} />
);

export default AppRouterProvider;
