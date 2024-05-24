import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import { HelmetProvider  } from 'react-helmet-async';
import App from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <HelmetProvider>
    <StrictMode>
      <SnackbarProvider>
      <App />
      </SnackbarProvider>
    </StrictMode>
  </HelmetProvider>
);
