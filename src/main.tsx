import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@mantine/core/styles.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QUERY_CLIENT = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
