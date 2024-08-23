import React from 'react';
import { AppRouterProvider } from '@contexts/app-router-provider';

export const App: React.FC = () => {
  return (
    <AppRouterProvider/>
  );
};
