import React from 'react';
import { createRoot } from 'react-dom/client';  // Importa createRoot
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // Crea la raíz con createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
