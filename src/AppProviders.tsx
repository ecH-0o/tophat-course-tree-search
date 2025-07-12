import React from 'react';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const AppProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);