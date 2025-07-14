import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from "notistack";
import { CartProvider } from './context/cartContext.tsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);