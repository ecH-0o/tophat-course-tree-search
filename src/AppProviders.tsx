import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const AppProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </QueryClientProvider>
  </BrowserRouter>
);