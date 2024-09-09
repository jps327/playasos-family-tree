import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@mantine/core/styles.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';

const QUERY_CLIENT = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
);
