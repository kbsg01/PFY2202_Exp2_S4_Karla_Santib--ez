import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// El backend de esta actividad es un mock: MSW intercepta las peticiones a /api/*.
// Se puede desactivar con VITE_USAR_MOCK=false cuando exista un backend real.
async function habilitarMock() {
  if (import.meta.env.VITE_USAR_MOCK === 'false') return;
  // Import dinámico: el código del mock no entra en el bundle si está desactivado.
  const { worker } = await import('./mocks/browser.js');
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass',
    quiet: true,
  });
}

function renderizar() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// La app se monta cuando el Service Worker está listo; así ninguna petición se escapa al mock.
// Si el mock no puede iniciar, la app se monta igual y las pantallas muestran el error de la petición.
habilitarMock()
  .catch((error) => console.error('[mock] No se pudo iniciar el Service Worker:', error))
  .finally(renderizar);
