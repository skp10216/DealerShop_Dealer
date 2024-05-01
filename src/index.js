import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import App from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </StrictMode>
);
